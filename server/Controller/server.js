// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const sendGridMail = require('@sendgrid/mail');

const app = express();
app.use(bodyParser.json());

// Configure Twilio and SendGrid
const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
sendGridMail.setApiKey('SENDGRID_API_KEY');

// Placeholder for storing OTPs (in-memory)
const otpStorage = {};

// Endpoint to generate and send OTP
app.post('/send-otp', async (req, res) => {
    const { username } = req.body;

    // Lookup the user's phone and email from database (mocked here)
    const user = await getUserInfo(username); // Implement user data retrieval
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP in memory (should be saved in a secure database in production)
    otpStorage[username] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // 5 minutes expiry

    try {
        // Send OTP via SMS
        await twilioClient.messages.create({
            body: `Your OTP is: ${otp}`,
            from: 'TWILIO_PHONE_NUMBER',
            to: user.phone
        });

        // Send OTP via Email
        await sendGridMail.send({
            to: user.email,
            from: 'no-reply@yourdomain.com',
            subject: 'Your OTP Code',
            text: `Your OTP is: ${otp}`
        });

        res.json({ success: true, message: 'OTP sent' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
});

// Helper function to retrieve user info (mocked for demonstration)
async function getUserInfo(username) {
    // Simulate a user data retrieval from a database
    const users = {
        'user123': { phone: '+1234567890', email: 'user123@example.com' }
    };
    return users[username];
}

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
