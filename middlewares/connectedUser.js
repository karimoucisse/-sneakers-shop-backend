const isUserConnected = (req, res, next) => {
    if(!req.user) {
        res.status(404).json({ error: "unauthorized" })
    } else {
        console.log(req.user.isAdmin);
        next()

    }
}

module.exports = isUserConnected