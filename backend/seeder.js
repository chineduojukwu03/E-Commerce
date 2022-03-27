import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products'
import User from './models/userModel'
import Product from './models/productModel'
import Order from './models/orderModel'
import connectDB from './config/db.js'


const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported!')
        process.exist()
    } catch (error) {
        console.error(`${error}`)
        process.exist(1)

    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log('Data Destroyed!')
        process.exist()

    } catch (error) {
        console.error(`${error}`)
        process.exist(1)

    }
}

if (process.argv[2] === '-d') {
    destroyData
} else {
    importData()
}