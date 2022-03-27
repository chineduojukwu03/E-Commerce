import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userAction'

const RegisterScreen = ({ location, history }) => {

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo } = userRegister

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        const submitHandler = (e) => {
            e.preventDfeault()
            if (password !== confirmPassword) {
                setMessage('Password do not match')
            } else {
                dispatch(register(name, email, passored))

            }

        }


    }, [redirect, userInfo, history, dispatch])
    return (
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                    Register with us
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account?<Link to={redirect ? `/register?redirct =${redirect}` : 'register'}>
                        Login
                </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen