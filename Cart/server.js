const express = require('express');
const cors = require('cors');
const app = express();


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 9003;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/cart", require("./routes/cartRouter"))

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

async function shutdown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(async () => {
        const mongoose = require('mongoose');
        try {
            await mongoose.connection.close(false);
            console.log('MongoDb connection closed.');
            process.exit(0);
        } catch (err) {
            console.error('Error closing MongoDb connection:', err);
            process.exit(1);
        }
    });
}
