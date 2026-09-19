const asyncHandler = require('express-async-handler')
const { Resend } = require('resend')

const MIN_MESSAGE = 10
const MAX_MESSAGE = 2000
const MAX_ORDER_ID = 40

// The contact form is public and every accepted submission sends a real email,
// so a single caller gets only a handful per window. In memory is enough here:
// the worst case after a restart is one extra message.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const submissions = new Map()

const TOPICS = {
    orders: 'Orders & Tracking',
    shipping: 'Shipping & Delivery',
    returns: 'Returns & Refunds',
    payments: 'Payments & Pricing',
    sizing: 'Sizing & Fit',
    account: 'Account & Security',
    other: 'Something else',
}

const escapeHtml = (value) =>
    String(value).replace(
        /[&<>"']/g,
        (character) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[character]
    )

const isOverRateLimit = (ip) => {
    const now = Date.now()
    const recent = (submissions.get(ip) || []).filter((time) => now - time < WINDOW_MS)

    if (recent.length >= MAX_PER_WINDOW) {
        submissions.set(ip, recent)
        return true
    }

    recent.push(now)
    submissions.set(ip, recent)

    if (submissions.size > 500) {
        submissions.forEach((times, key) => {
            if (!times.some((time) => now - time < WINDOW_MS)) submissions.delete(key)
        })
    }

    return false
}

// @desc     Email a contact form submission to the store inbox
// @route    POST /api/contact
// @access   PUBLIC
const sendContactMessage = asyncHandler(async (req, res) => {
    const apiKey = process.env.RESEND_API_KEY
    const inbox = process.env.CONTACT_TO_EMAIL

    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim()
    const topic = String(req.body.topic || '').trim()
    const orderId = String(req.body.orderId || '').trim()
    const message = String(req.body.message || '').trim()

    if (name.length < 2 || name.length > 80) {
        res.status(400)
        throw new Error('Please enter your name (2 to 80 characters).')
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        res.status(400)
        throw new Error('Please enter a valid email address.')
    }

    if (!Object.prototype.hasOwnProperty.call(TOPICS, topic)) {
        res.status(400)
        throw new Error('Please choose what your message is about.')
    }

    if (orderId.length > MAX_ORDER_ID) {
        res.status(400)
        throw new Error('That order ID is too long.')
    }

    if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
        res.status(400)
        throw new Error(`Please write between ${MIN_MESSAGE} and ${MAX_MESSAGE} characters.`)
    }

    if (!apiKey || !inbox) {
        res.status(503)
        throw new Error('The contact form is not connected to an inbox yet. Please email us directly.')
    }

    if (isOverRateLimit(req.ip || req.headers['x-forwarded-for'] || 'unknown')) {
        res.status(429)
        throw new Error('Too many messages from here. Please try again in a few minutes.')
    }

    const topicLabel = TOPICS[topic]
    const rows = [
        ['Topic', topicLabel],
        ['Name', name],
        ['Email', email],
        ['Order ID', orderId || 'Not given'],
    ]
        .map(
            ([label, value]) =>
                `<tr><td style="padding:4px 16px 4px 0;color:#555;vertical-align:top">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(
                    value
                )}</strong></td></tr>`
        )
        .join('')

    const resend = new Resend(apiKey)

    let response
    try {
        response = await resend.emails.send({
            from: process.env.CONTACT_FROM_EMAIL || 'Winter Contact Form <onboarding@resend.dev>',
            to: [inbox],
            // So the store can simply hit reply instead of copying the address.
            replyTo: email,
            subject: `[Winter] ${topicLabel} - ${name}`,
            text: `Topic: ${topicLabel}\nName: ${name}\nEmail: ${email}\nOrder ID: ${
                orderId || 'Not given'
            }\n\n${message}`,
            html: `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#111">
                <h2 style="margin:0 0 12px">New contact message</h2>
                <table style="border-collapse:collapse;margin-bottom:16px">${rows}</table>
                <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(message)}</p>
            </div>`,
        })
    } catch (error) {
        console.error('Contact email failed:', error.message)
        res.status(502)
        throw new Error('We could not send your message right now. Please email us directly.')
    }

    if (response && response.error) {
        console.error('Contact email rejected:', response.error.message)
        res.status(502)
        throw new Error('We could not send your message right now. Please email us directly.')
    }

    res.status(200).json({ message: 'Thanks, your message is on its way.' })
})

module.exports = { sendContactMessage }
