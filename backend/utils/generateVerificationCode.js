import otpGenerator from "otp-generator";

export const generateVerificationCode = () => {
    return otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        lowerCaseAlphabets: true,
        specialChars: false
    });
}