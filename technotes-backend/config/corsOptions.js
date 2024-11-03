const corsOptions = {
    origin: function(origin, callback) {
        const allowedOrigins = ['http://localhost:5173', 'https://www.amsoshi.com']
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

module.exports = corsOptions