'use strict';
const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        // Connection string
        uri: process.env.MONGODB_URI || "mongodb+srv://mongo:mongo@cluster0.5dw7dn2.mongodb.net/?retryWrites=true&w=majority"
    }
};
module.exports = config;