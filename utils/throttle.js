// Public endpoints that cost something to serve (sending email, writing rows)
// get a light throttle. In memory is enough for a single small server: after a
// restart the worst case is one extra request slipping through.
const DEFAULT_WINDOW_MS = 10 * 60 * 1000

// Each endpoint gets its own counter, so traffic to one never eats the other's
// allowance. Returns true once the caller has used up its allowance.
const createThrottle = ({ max, windowMs = DEFAULT_WINDOW_MS }) => {
    const hitsByCaller = new Map()

    return (req) => {
        const caller = req.ip || req.headers['x-forwarded-for'] || 'unknown'
        const now = Date.now()
        const recent = (hitsByCaller.get(caller) || []).filter((time) => now - time < windowMs)

        if (recent.length >= max) {
            hitsByCaller.set(caller, recent)
            return true
        }

        recent.push(now)
        hitsByCaller.set(caller, recent)

        if (hitsByCaller.size > 500) {
            hitsByCaller.forEach((times, entry) => {
                if (!times.some((time) => now - time < windowMs)) hitsByCaller.delete(entry)
            })
        }

        return false
    }
}

module.exports = { createThrottle }
