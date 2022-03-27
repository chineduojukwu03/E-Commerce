import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FornContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userAction'


const LoginScreen = ({ locatwion, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin

    const redirect = location.search ? location.search.split(" = ")[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(login(email, password))
        }

    }, [userInfo, redirect, history, dispatch])

    return (
        <FornContainer>
            <h1>Sign In</h1>
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password Address</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={email}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirec ? `/register? redirect = ${redirect}` : 'register'}>
                        Register
                </Link>
                </Col>

            </Row>
        </FornContainer>

    )
}
export default LoginScreen