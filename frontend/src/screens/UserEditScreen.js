import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'



const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { loading, error, user } = userDetail

    const updateUser = useSelector(state => state.updateUser)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = updateUser


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }))
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
        </Link>
            <FormContainer>
                <h1>User edit</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} >

                            </Form.Control>
                        </Form.Group>

                        < Form.Group controlId='email'>
                            <Form.Label>Email Address:</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isadmin'>

                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checkbox={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checkbox)} >

                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' variant='primary'>
                            Edit
                        </Button>
                    </Form>

                )}
            </FormContainer>

        </>

    )
}


export default UserEditScreen
