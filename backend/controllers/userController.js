import asyncHandler from 'express-async-handler'
import User from '../models/userModel'
import generateToken from '../utilis/generateToken'


// @desc Auth user & get token
//@route POST/api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc register new user
//@route POST/api/users
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { email, name, password } = req.body
    const userExist = await User.findById({ email })
    if (userExist) {
        res.status(401)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)

        })
    } else {
        res.status(404)
        throw new Error('Invalid user data')
    }

})


// @desc  GET user profile
//@route GET/api/users/profile
//@access private

const getUserProfile = (asyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id)
    if (user) {
        res.json({
            _id: user_.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error('User not found')
    }
}))


// @desc  Update user profile
//@route PUT/api/users/profile
//@access private

export const updatedUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user_id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password || user.password
        }
        const updatedUser = await User.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            password: updatedUser.password,
            iaAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)

        })
    } else {
        res.status(404)
        throw new Error('User Profile not found')
    }
})


// @desc Get all users
//@route POST/api/users/
//@access private/admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@desc DELETE users
//route DELETE/api/users/:id
//@access private/admin


const deletedUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ message: 'User Remove' })
    } else {
        res.status(401)
        throw new Error('User is Found')
    }

})

// @desc Get user By ID
//@route GET/api/users/:id
//@access private/admin

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User Not found')
    }
})

// @desc Update User
//@route POST/api/users/:id
//@access private/admin

const updateUsersAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin
    }

    const updateUsersAdmin = await User.save()
    res.json({
        _id: updateUsersAdmin._id,
        name: updateUsersAdmin.name,
        email: updateUsersAdmin.email,
        isAdmin: updateUsersAdmin.isAdmin
    })
})


export {
    authUser,
    getUserProfile,
    registerUser,
    updatedUserProfile,
    getUsers,
    deletedUser,
    getUserById,
    updateUsersAdmin
}