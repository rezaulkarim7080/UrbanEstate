import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter the user Name"],
        // maxLength: [30, "Name connot exced 30 chracter"],
        // minLength: [3, "Name connot exced 3 chracter"]
    },
    email: {
        type: String,
        required: [true, "please Enter the user email"],
        // unique: true,
        // validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please Enter the user password"],

        minLength: [6, "Password connot exced 6 chracter"],
        // select: false
    },
    userImage: {
        type: String,
        required: [true, "please Enter the user Image url"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

/// jwt Token

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

}


// compare password

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// generatting user password reset Token

userSchema.methods.getResetPasswordToken = function () {

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetPasswordToken)
        .digest("hex");

    this.resetPasswordExpires = Date.now() + 3600000;

    return resetPasswordToken;
};


const User = mongoose.model('User', userSchema);

export default User;