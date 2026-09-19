const asyncHandler = require('express-async-handler')
const Subscriber = require('../models/subscriberModel')
const { createThrottle } = require('../utils/throttle')

const isOverLimit = createThrottle({ max: 8 })

const ALREADY_ON_LIST = 'You are already on the list.'

// @desc     Add an email address to the newsletter list
// @route    POST /api/subscribe
// @access   PUBLIC
const subscribeToNewsletter = asyncHandler(async (req, res) => {
    const email = String(req.body.email || '').trim().toLowerCase()

    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        res.status(400)
        throw new Error('Please enter a valid email address.')
    }

    // Checked after validation, so a typo never costs someone their allowance.
    if (isOverLimit(req)) {
        res.status(429)
        throw new Error('Too many sign-ups from here. Please try again in a few minutes.')
    }

    const existing = await Subscriber.findOne({ email })

    if (existing) {
        res.status(200).json({ message: ALREADY_ON_LIST, alreadySubscribed: true })
        return
    }

    try {
        await Subscriber.create({ email, source: 'footer' })
    } catch (error) {
        // Two people can sign up in the same instant and the unique index decides.
        if (error.code !== 11000) throw error
        res.status(200).json({ message: ALREADY_ON_LIST, alreadySubscribed: true })
        return
    }

    res.status(201).json({ message: 'You are on the list.' })
})

module.exports = { subscribeToNewsletter }
