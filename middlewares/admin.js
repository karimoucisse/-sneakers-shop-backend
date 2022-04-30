const isAdmin = (req, res, next) =>{
    if (req.user) {
        console.log(req.user.isAdmin);
        next()
    } else {
        res.status(404).json({error: "Unauthorized"})
    }
}

module.exports = {
    isAdmin
}