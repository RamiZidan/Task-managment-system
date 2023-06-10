const notFoundMiddleware = (req, res )=>{ 
    return res.status(404).json("Page not Found" ) ;
}

module.exports = notFoundMiddleware;