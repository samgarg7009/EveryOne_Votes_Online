const mongoose = require('mongoose');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' });
};

const loginUser = async (req, res) => {
    const { aadharNumber } = req.body;

    try {
        const payload = await User.login(aadharNumber);
        res.status(200).json({ payload });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error logging in user' });
    }
};

const registerUser = async (req, res) => {
    const { aadharNumber, email, constituency } = req.body;

    try {
        await User.register(aadharNumber, email, constituency);
        res.status(200).json({ message: `Success! ${aadharNumber} registered successfully!` });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error creating user' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Error fetching user' });
    }
};

const verifyUser = async (req, res) => {
    const { aadharNumber, otp } = req.body;

    try {
        const user = await User.findOne({aadharNumber});
        console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.verifyLoginOtp(otp);

        const token = createToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid token or OTP' });
    }
};

module.exports = {
    loginUser,
    verifyUser,
    registerUser,
    getAllUsers,
};
