const isUserConnected = (req, res, next) => {
    if(!req.user) {
        res.status(404).json({ error: "unauthorized" })
    } else {
        next()
    }
}

module.exports = isUserConnected