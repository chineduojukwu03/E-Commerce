import React from 'react'
import { LinkContainer } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center-mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.LinK disabled>Sign In</Nav.LinK>)}
            </Nav.Item>
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping</Nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Shipping</Nav.Link>)}
            </Nav.Item>
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.LinK>Payment</Nav.LinK>
                    </LinkContainer>
                ) : (<Nav.LinK disabled>Payment</Nav.LinK>)}
            </Nav.Item>
            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <nav.Link>PlaceOrder</nav.Link>
                    </LinkContainer>
                ) : (<Nav.Link disabled>Placeorder</Nav.Link>)}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps