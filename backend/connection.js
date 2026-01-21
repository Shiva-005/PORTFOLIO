const mongoose = require('mongoose');
const mongoDbUrl=process.env.mongoDbUrl;


const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoDbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err);
        throw err;
    }
};

module.exports = connectToDatabase;
