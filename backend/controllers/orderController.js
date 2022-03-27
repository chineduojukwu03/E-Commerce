import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel'



//@desc Create new order
//@route POST/api/orders
//@access public

const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        itemPrice,
        taxPrice,
        totalPrice

    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(404)
        throw new Error('No Order Item')
    } else {
        const order = new Order({
            orderItems,
            shippingAddress,
            user: req.user_id,
            paymentMethod,
            shippingPrice,
            itemPrice,
            taxPrice,
            totalPrice

        })
        const createOrder = await order.save()
        res.status(201).json(createOrder)
    }
})


//@desc Get order by id
//@route Get/api/orders/id
//@access private

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Not Order Found')
    }
})
//@desc  Update order to paid
//@route Get/api/orders/:id/pay
//@access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not Found')

    }
})
//@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access private

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user_id })
    res.json(orders)
})

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})
export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders
}