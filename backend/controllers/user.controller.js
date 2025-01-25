
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "../utils/generateToken.js";
import { sendDeleteEmail, sendForgotPasswordEmail, sendResetEmailConfirmation, sendVerificationEmail, sendWelcomeEmail } from "../utils/email.js";


export const signup = async (req, res) => {
    try {
        // take request from body
        const { name, email, password, confirmpassword } = req.body;

        // compare the user password and confirm password
        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: "Password not match" })
        }

        // check user is already exist or not from an our database
        const userExist = await userModel.findOne({ email })

        if (userExist) {
            // If the user exists and is verified, return an error
            if (userExist.isVerified) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            // If the user exists but is not verified, resend OTP
            const newVerificationToken = generateVerificationCode();
            userExist.verificationToken = newVerificationToken;
            userExist.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

            // Save the updated user information
            await userExist.save();

            // jwt token function created and calling 
            const token = generateToken(res, userExist._id)

            // Send the new OTP on existing user email
            await sendVerificationEmail(userExist.email,userExist.name, newVerificationToken);

            return res.status(200).json({
                success: true,
                message: "A new OTP has been sent to your email.",
                name: userExist.name,
                email: userExist.email,
                token
            });
        }

        // hash the password
        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round);

        // generate a function for otp-generate 
        const verificationToken = generateVerificationCode();

        // all the information should be store in our database 
        const user = new userModel({
            name,
            email,
            password: hash_password,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000  // 24 hr time for otp-verification
        })
        console.log(user)
        // save the data in our database 
        await user.save();

        // jwt token function created and calling 
        generateToken(res, user._id)

        // to user email
        await sendVerificationEmail(user.email, user.name, verificationToken)
        const token = generateToken(res, user._id)
        return res
            .status(201)
            .json({
                success: true,
                message: "User created successfully",
                name: user.name,
                email: user.email,
                token
            })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error from controllers" })
    }
}

export const verifyEmail = async (req, res) => {
    // - - - - - -
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ success: false, message: "Enter your otp" })
        }
        const userExist = await userModel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if (!userExist) {
            return res.status(400).json({ success: false, message: "Invalid credentials or verification code expired" })
        }
        userExist.isVerified = true;
        userExist.verificationToken = undefined;
        userExist.verificationTokenExpiresAt = undefined;
        await userExist.save()

        await sendWelcomeEmail(userExist.email, userExist.name);

        return res.status(200).json({ success: true, message: "Email verified successfull" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        // take all the data from request from body
        const { email, password } = req.body;

        // check user is already available in our database or not
        const userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not exist" })
        }

        // if user exist 
        if (userExist) {
            // if user exist than check in our database isVerified is false if it is false than return rerror
            if (!userExist.isVerified) {
                return res.status(400).json({ success: false, message: "Invalid credentials please verified your account" })
            }
        }

        // check if user exist and isVerified is true than password match 
        const isEqualPassword = await bcrypt.compare(password, userExist.password);
        if (!isEqualPassword) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }

        // generate cookies for our session or authorization
        const token = generateToken(res, userExist._id);

        // modified the last login
        userExist.lastLogin = new Date();

        // save the data or preserve the data in our database 
        await userExist.save();
        return res
            .status(200)
            .json({
                success: true,
                message: "Logged in successfully",
                name: userExist.name,
                email: userExist.email,
                token
            })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    return res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const forgotPassword = async (req, res) => {

    // all the request are taken from body
    const { email } = req.body;
    try {
        // check user is already exist or not
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not exist" })
        }

        if (!userExist.isVerified) {
            return res.status(400).json({ success: false, message: "User not verified for forgot password please Signup" })
        }
        // generate a new verification code
        const token = generateVerificationCode()

        // save that code in our database
        userExist.resetPasswordToken = token;

        // save the reset time 24 hr expiry
        userExist.resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

        // save the data in our database 
        await userExist.save();

        // send forgot email verification to user email
        await sendForgotPasswordEmail(userExist.email, token)

        return res.status(200).json({ success: true, message: "Reset token send successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const resetOldPassword = async (req, res) => {
    try {
        // take all the data from req.body
        const { code, password, confirmpassword } = req.body;

        if (password !== confirmpassword) {
            return res.status(400).json({ success: false, message: "Password not match" })
        }

        // check userExist code is available in our database 
        const userExist = await userModel.findOne({
            resetPasswordToken: code,
            resetPasswordExpiresAt: { $gt: Date.now() }
        })
        if (!userExist) {
            return res.status(400).json({ success: false, message: "Invalid credentials or verification code expired" })
        }

        const salt_round = 10;
        const hash_password = await bcrypt.hash(password, salt_round)
        userExist.password = hash_password;
        userExist.resetPasswordToken = undefined
        userExist.resetPasswordExpiresAt = undefined

        await userExist.save();

        await sendResetEmailConfirmation(userExist.email, userExist.name)

        return res.status(200).json({ success: true, message: "Password update successfull" })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const checkAuthWorking = async (req, res) => {
    try {

        const userInfo = await userModel.find({})
        return res.status(200).json({ success: true, message: "User fetch successfully", userInfo })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const deleteAccount = async (req, res) => {
    try {
        // taking request from body
        const { name, email, password } = req.body;

        // check user Exist or not
        const userExist = await userModel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ success: false, message: "User not exist" });
        }

        // compare the password if user is not exist
        const originalPasswordCheck = await bcrypt.compare(password, userExist.password);
        if (!originalPasswordCheck) {
            return res.status(400).json({ success: false, message: "Password not match" })
        }

        if (userExist.name !== name) {
            return res.status(400).json({ success: false, message: "Invalid name" })
        }

        if (userExist.email !== email) {
            return res.status(400).json({ success: false, message: "Email not valid" })
        }

        // send delete email to the users
        await sendDeleteEmail(userExist.email);

        // delete the user from database 
        const deleteUser = await userModel.findOneAndDelete({ email });

        // return the response after delete success fully
        return res.status(200).json({ success: true, message: "User delete successfull", deleteUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

export const adminLogin = async (req, res) => {
    try {
        const {  email, password } = req.body;

        if ( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ) {
            const token = jwt.sign(
                email+password,
                process.env.JWT_SECRET,
            )
            return res.status(200).json({ success: true, token })
        } else {
            return res.status(400).json({ success: false, message: "Invalid credintials" })
        }
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server error" })
    }
}