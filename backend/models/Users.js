const mongoose = require('mongoose');
const validator = require('validator');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const userSchema = new mongoose.Schema({
    aadharNumber: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                return /^\d{12}$/.test(value);
            },
            message: 'Aadhar number must be a 12-digit number',
        },
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email address',
        },
    },
    constituency: {
        type: String,
        required: true,
    },
    hasVoted: {
        type: Boolean,
        default: false,
    },
    otp: {
        code: {
            type: String,
            default: null,
        },
        expiresAt: {
            type: Date,
            default: null,
        },
    },
}, { timestamps: true });

userSchema.methods.sendLoginOtp = async function () {
    const otpCode = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    this.otp.code = otpCode;
    this.otp.expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.save();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'everyonevotes1@gmail.com',
            pass: 'qetd mfmq gejs kyem',
        },
    });

    const mailOptions = {
        from: 'everyonevotes1@gmail.com',
        to: this.email,
        subject: 'Login OTP',
        text: `Your OTP for login is: ${otpCode}`,
    };

    const success = await transporter.sendMail(mailOptions);
    console.log(success)
};

userSchema.methods.verifyLoginOtp = function (otp) {
    console.log("verify otp",otp);
    // if (!this.otp.code || !this.otp.expiresAt || this.otp.expiresAt < new Date()) {
    //     console.log("invalid otp code");
    //     throw new Error('OTP expired or not generated');
    // }

    if (otp !== this.otp) {
        console.log("invalid otp");
        throw new Error('Invalid OTP');
    }

    // this.otp.code = null;
    // this.otp.expiresAt = null;

    return this.save();
};

userSchema.statics.login = async function (aadharNumber) {
    
    if (!aadharNumber) {
        throw new Error('All fields must be filled');
    }

    // if (!validator.isEmail(email)) {
    //     throw new Error('Email is not valid');
    // }

    const user = await this.findOne({ aadharNumber });
    if (!user) {
        throw new Error('User does not exist');
    }
    try{
        await user.sendLoginOtp();

    } catch(err) {
        console.log(err);
        throw new Error(`Unable to send otp: ${err}`)
    }
    return user;
};

userSchema.statics.register = async function (aadharNumber, email, constituency) {
    if(!aadharNumber || !email || !constituency){
        throw Error('All fields must be filled')
    }
    const exists = await this.findOne({ aadharNumber })
    if(exists){
        throw Error("Aadhar already registered!")
    }
    if (!validator.isEmail(email)) {
        throw new Error('Email is not valid');
    }
    const user = await this.create({aadharNumber, email, constituency})
    return user
}   

module.exports = mongoose.model('User', userSchema)