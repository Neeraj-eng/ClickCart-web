const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../Models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const UserExist = await User.findOne({ email });
        if (UserExist) {
            return res.status(409).json({
                message: "user allredy exist",
            })
        }
        let hashpassword;

        try {
            hashpassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                message: "we cant able to bcrypting this password"
            })
        }

        let user = await User.create({
            name, email, password: hashpassword, role
        })



        user = user.toObject();
        user.password = undefined



        return res.status(200).json({
            message: "user registred successfully",
            user
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message

        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "enter correct detials"
            })
        }

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "incoorect password"
            })
        }

        const payload = {
            role: user.role,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: false,
            age: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })

        res.status(200).json({
            message: "user logedin succesfully",
            user: {
                name: user.name
            }
        })

    } catch (err) {
        console.log("login error")
        res.status(400).json({
            message: err.message
        })
    }
}

exports.logout = async (req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            console.log("token is missing", req.cookies)
            return res.status(400).json({
                message: "token missing"
            })
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (err) {
        console.log("logout err")
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}