import React, { useState, useEffect } from 'react'
import { Table, Form, Row, Button, Col } from 'react-bootstrap'
import LinkContainer from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { listOrders } from '../actions/userAction'


const ProfileScreen = ({ history }) => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = userSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrder, error: errorOrder, orders } = orderListMy

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)



    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Password not match')
        } else {
            dispatch(updateUserProfile({ _id: user._id, name, email, password }))

        }
    }
    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant="success">Profile Update </Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}>

                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder="Email"
                            value={name}
                            onChange={(e) => setEmail(e.target.value)}>

                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder="Password"
                            value={name}
                            onChange={(e) => setPassword(e.target.value)}>

                        </Form.Control>

                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='confirmPassword'
                            placeholder="ConfrimPassword"
                            value={name}
                            onChange={(e) => setConfirmPassword(e.target.value)}>

                        </Form.Control>

                    </Form.Group>
                    <Button type='register' variant='primary'>
                        Update Detail
                </Button>
                </Form>



            </Col>
            <Col md={9}>
                <h2>My Order</h2>
                {loadingOrder ? <Loader /> : errorOrder ? <Message variant='danger'>{errorOrder}</Message> : (
                    <Table striped boreded hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVER</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createAt.substring(0, 10)}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className='fas fa-times' style={{ color: 'red ' }}></i>
                                    )}</td>
                                    <td>
                                        {order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/order${order_id}`}>
                                            <Button variant='light'>Detail </Button>
                                        </LinkContainer>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </Table>
                )}
            </Col>

        </Row>
    )
}

export default ProfileScreen