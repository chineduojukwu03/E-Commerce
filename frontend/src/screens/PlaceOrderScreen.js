import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ListGroup, Row, Card, Image } from 'react-bootstrap'
import Message from '../component/Message'
import CheckoutSteps from '../components/Checkoutsteps'
import { createOrder } from '../actions/orderAction'


const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector(state = state.cart)


    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimal(cart.itemPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemPrice).toFixed(2)))
    cart.totalPrice = Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)

    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)
    const { success, order, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order_id}`)
        }
    }, [history, success])


    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.orderItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemPrice: cart.itemPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))

    }



    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>My Order</h1>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h1>Shipping</h1>
                            {cart.shippingAddress.address},
                        {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode},
                        {cart.shippingAddress.country}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <strong>Payment Method</strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>cart Item</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart Empty</Message> : (
                                <ListGrou variant='flush'>
                                    <Row>
                                        <Col md={4}>

                                            {cart.cartItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col >
                                                            <Link to={`/product/${product}`}>
                                                                {item.product}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} = ${item.prcie * item.qty}
                                                        </Col>

                                                    </Row>
                                                </ListGroup.Item>

                                            ))}

                                        </Col>
                                        <Col md={4}>
                                            <Card>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item>
                                                        <h2>Order Summary</h2>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Items</Col>
                                                            <Col>${cart.itemPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Shipping</Col>
                                                            <Col>${cart.shippingPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>taxPrice</Col>
                                                            <Col>${cart.taxPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>totalPrice</Col>
                                                            <Col>${cart.totalPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        {error && <Message variant='danger'>{error}</Message>}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Button type='button' className='btn-block'
                                                            disabled={cart.cartItems === 0}
                                                            onClick={placeOrderHandler}>
                                                            Place Order
                                                        </Button>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </Col>
                                    </Row>
                                </ListGrou>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen
