import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productAction'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setcountInStock] = useState(0)
    const [category, setCategory] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetail = useSelector(state = state.productDetail)
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state = state.productUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
        product: productUpdate } = productUpdate



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setDescription(product.description)
                setcountInStock(product.countInStock)
                setCategory(product.category)
            }

        }

    }, [dispatch, history, productId, product])

    const uploadFileHandler = async (e) => {
        const file = e.target.file[0]
        const formData = new FormDate()
        FormData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)

        }
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            description,
            countInStock,
            category

        }))
    }


    return (
        <>
            <Link to='/admin/productlist' className='btn btn my-3'>
                Go BAck
        </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price:</Form.Label>
                            <Form.control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>

                            </Form.control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>image</Form.Label>
                            <Form.control
                                type='text'
                                placeholder='Enter image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>

                            </Form.control>
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>brand</Form.Label>
                            <Form.control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>

                            </Form.control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>description</Form.Label>
                            <Form.control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>

                            </Form.control>
                        </Form.Group>
                        <Form.Group controlId='countInStock'>
                            <Form.Label>countInStock</Form.Label>
                            <Form.control
                                type='text'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}>

                            </Form.control>
                            <Form.File
                                id='image-file'
                                label='choose'
                                custom
                                onChange={uploadFileHandler}>
                            </Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>category</Form.Label>
                            <Form.control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.control>
                        </Form.Group>

                        <Button type='submit' varinat='primary'>
                            Edit
                        </Button>
                    </Form>

                )}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen
