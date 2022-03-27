import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './components/Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.img src={product.image} variant='top' />
            </Link>
            <Card.body>
                <Link to={`/product/${product._id}`}>
                    <Card.title as="div">
                        <strong>{product.name}</strong>
                    </Card.title>
                </Link>

                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />

                </Card.Text>

                <Card.Text as="h3"> ${product.price}</Card.Text>
            </Card.body>

        </Card>
    )
}
export default Product