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

        const payload = {
            role: role,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d"
        })

        user = user.toObject();
        user.token = token;
        user.password = undefined

        res.cookie("token",token,{
            httpOnly:true,
            sameSite: 'none',
            secure:false,
            age : 7 * 24 * 60 * 60
        })
    
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
        if (isMatch) {
            res.status(200).json({
                message: "user logedin succesfully",
                user: {
                    name: user.name
                }
            })
        } else {
            return res.status(401).json({
                message: "incoorect password"
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}