const authorize = (...allowedRoles)=>{
    return (req,res,next)=>{
        // Check if the user is authenticated
        if(!req.user){
            return res.status(401).json({error:"Unauthorized: No user found"})
        }

        // Check if the user has permission
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({error:"Forbidden:You don't have permission to access this resource"})
        }
        next()
    }
}

module.exports = authorize;