import express from 'express'
const router = express.Router()
import {
    authUser,
    registerUser,
    getUserProfile,
    updatedUserProfile,
    getUsers,
    deletedUser,
    updateUsersAdmin,
    getUserById
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
    .get(protect, getUsers)
router.route('/:id').delete(protect, admin, deletedUser)

router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updatedUserProfile)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUsersAdmin)

