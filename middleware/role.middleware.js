export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); //user is admin , allow access
    }else {
        res.status(403).json({message:"Access denied: Admin only"});
    }
};


export const isSeller = (req, res, next) => {
    if (req.user && req.user.role === 'seller') {
        next(); //user is seller , allow the access
    } else{
        res.status(403).json({message:'Access denied: Seller only'});
    }
};


export const isBuyer = (req, res, next) => {
  if (req.user && req.user.role === 'buyer') {
    next(); // User is buyer, allow access
  } else {
    res.status(403).json({ message: 'Access denied: Buyer only' });
  }
};