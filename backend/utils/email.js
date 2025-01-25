import { mailtrapClient, sender } from "../services/mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, SEND_WELCOME_EMAIL, USER_DELETE_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"

export const sendVerificationEmail = async (email, name, verificationToken) => {
    const recipient = [{ email }]
    if (!recipient) {
        return res.status(400).json({ success: false, message: "Email not provide" })
    }
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE
                .replace("{name}", name)
                .replace("{verificationCode}", verificationToken),

            category: "Your Email Verification"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]
    if (!recipient) {
        return res.status(400).json({ success: false, message: "Email not provide" })
    }
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Welcome Email",
            html: SEND_WELCOME_EMAIL.replace("{name}", name),
            category: "Welcome email"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Welcome message error" })
    }
}

export const sendForgotPasswordEmail = async (email, verificationtoken) => {
    const recipient = [{ email }]
    if (!recipient) {
        return res.status(400).json({ success: false, message: "Email not provide" })
    }
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email for reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{verificationCode}", verificationtoken),
            category: "Forgot password"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Reset password email error" })
    }
}

export const sendResetEmailConfirmation = async (email, name) => {
    const recipient = [{ email }]
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfully",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Reset password successfull"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Welcome message error" })
    }
}

export const sendDeleteEmail = async (email) => {
    const recipient = [{ email }];
    if (!recipient) {
        return res.status(400).json({ success: false, message: "Email not provide" })
    }
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Account Remove Successfully",
            html: USER_DELETE_SUCCESS_TEMPLATE,
            category: "Email Delete Successfully"
        }).then(() => console.log("response send"))
    } catch (error) {
        return res.status(500).json({ success: false, message: "Delete user message error from email" })
    }
}