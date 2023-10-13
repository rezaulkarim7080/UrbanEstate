
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";


// register user

export const registerUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, userImage } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        userImage,
    });

    sendToken(user, 201, res);

});

// login user

export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 401));

    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid password", 401));
    }

    sendToken(user, 200, res);

});

/// logout

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        status: "success",
        message: "User logged out successfully"
    });
});


// Forgot Password


export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });


    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetPasswordToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}localhost/api/v1/password/reset/${resetPasswordToken}`;

    console.log(resetPasswordUrl);

    const message = `your password reset token is : \n\n\n ${resetPasswordToken} \n\n if you are not requested this email please ignore it`;



    try {
        await sendEmail({
            email: user.email,
            subject: "ecommerce Password Reset or recovery",
            message,
        })

        res.status(200).json({
            status: "success",
            message: `Password reset link sent to your email ${user.email}`
        });


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));

    }


})

// Reset Password

export const resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has expired", 400));
    }


    if (req.body.password !== req.body.comparePassword) {
        return next(new ErrorHandler("Passwords do not match", 400));

    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)


});

/// // get user details

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        status: true,
        data: user
    });
});



