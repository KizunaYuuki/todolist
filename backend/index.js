'use strict';

const app = require("./app");
const config = require("./app/config/config");
const MongoDB = require("./app/utils/mongodb.util");

// app.listen(config.app.port, () => {
//     console.log(`Server is runnig on port ${config.app.port}`);
// })

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri); // get uri
        console.log("Connected to the database!"); // notice connected

        const PORT = config.app.port; // get port to /app/config/index.js
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}
startServer();