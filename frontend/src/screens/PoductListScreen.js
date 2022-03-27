import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, createProduct, productDelete } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const PoductListScreen = ({ match, history }) => {

    const dispatch = useDispatch()

    const productList = useSelector(state = state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state = state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,

    } = productDelete

    const productCreate = useSelector(state = state.productCreate)
    const {
        loading: loadingCreate,
        successCreate, error:
        errorCreate,
        product: createdProduct }
        = productCreate

    const userLogin = useSelector(state = state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        ({ type: PRODUCT_CREATE_RESET })
        if (!userInfo.admin) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/product${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successCreate, createdProduct])



    const deleteHandler = () => {
        if (windows.confirm('Are you sure'))
            dispatch(productDelete(id))
    }

    const createHandler = () => {
        dispatch(createProduct())
    }
    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col classNam e='text-right'>
                    <Button className='my-3' onClick={() => { createHandler }}>
                        <i className='fas fa-plus'></i>
                    CreateProduct
                </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table stripeed bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </Table>
            )}

        </>
    )
}

export default PoductListScreen
