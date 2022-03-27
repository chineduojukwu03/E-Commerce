import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/Checkoutsteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { paymentMethod } = cart

    const dispatch = useDispatch()

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>paymentMethod</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.label as='legend'>Select Payment</Form.label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            check onChange={(e) => setPaymentMethod(e.target.value)}>

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>

    )
}

export default PaymentScreen