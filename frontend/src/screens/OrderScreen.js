import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, ListGroup, Button, Col, Image, Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderAction'

const OrderScreen = ({ match }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, error, order } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const dispatch = useDispatch()

    if (!loading) {
        const addDecimal = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        cart.itemPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {
        const addPayScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
                //software development kit
            }
            document.appendChild(script)
        }
        if (!order || successPay) {
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!windows.paypal) {
                addPayScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(paymentResult, orderId))

    }
    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            :
            <>
                <h1>Order {order_id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h1>Shipping</h1>
                                <p>
                                    <strong>Name:</strong> {order.user.name}

                                </p>
                                <p>
                                    <strong>Email:</strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>


                                <p>
                                    {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},
                        {order.shippingAddress.country}
                                </p>
                                {order.DeliveredAt ? (<Message variant='success'>Delivered on {order.DeliveredAt}</Message>
                                ) : (
                                    <Message variant='danger'> Not Delievered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment</h2>
                                <p>
                                    <strong>PaymentMethod:</strong>
                                ${order.paymentMethod}
                                </p>
                                {order.isPaid ? (<Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {order.orderitems.length === 0 ? <Message>Your Cart Empty:</Message> : (
                                    <ListGroup variant='flush'>
                                        <Row>
                                            <Col md={4}>
                                                {order.orderitems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} />
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${product}`}>
                                                                {item.product}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            ${item.qty} x {item.price} = ${item.item * item.price}
                                                        </Col>

                                                    </ListGroup.Item>
                                                ))}
                                            </Col>
                                            <Col md={4}>
                                                <Card>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Items</Col>
                                                            <Col>{order.ItemPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Shipping</Col>
                                                            <Col>{order.shippingPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>taxPrice</Col>
                                                            <Col>{order.taxPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>totalPrice</Col>
                                                            <Col>{order.totalPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    {!order.isPaid && (
                                                        <ListGroup.Item>
                                                            {loadingPay && <Loader />}
                                                            {!sdkReady ? <Loader /> : (
                                                                <PayPalButton
                                                                    amount={totalPrice}
                                                                    onSuccess={successPaymentHandler}
                                                                />
                                                            )}
                                                        </ListGroup.Item>
                                                    )}
                                                </Card>
                                            </Col>
                                        </Row>
                                    </ListGroup>
                                )}
                            </ListGroup.Item>


                        </ListGroup>
                    </Col>
                </Row>

            </>

    )
}

export default OrderScreen