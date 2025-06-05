const allowOwnProfileUpdate = async(req,res,next)=>{
    try {
        const requestedUserId = req.params.id || req.user._id

        // Check if the authenticated user is updading his own profile
        if(req.user._id.toString() !== requestedUserId.toString()){
            return res.status(403).json({error:"Forbidden: You can only update your own profile"})
        }
        next()

    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports = allowOwnProfileUpdate