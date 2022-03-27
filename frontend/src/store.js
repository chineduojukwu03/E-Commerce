import { createstore, combineReducer, applymiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer
}
    from './reducers/productreducers'
import { cartReducer } from './reducers/cartReducers'
import { orderDetailsReducer, orderPayReducer, orderListMyReducer }
    from './reducers/orderReducers'
import {
    userListReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userDeleteReducer,
    updateUserReducer
} from './reducers/userReducer'


const reducer = combineReducer({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    orderDetails: orderDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userDetails: userDetailsReducer,
    userRegister: userRegisterReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: updateUserReducer

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippngAdddressFromStorage = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {}
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
    login: { userInfo: userLoginFromStorage },
    shiping: { shippingAddress: shippngAdddressFromStorage },
    payment: { paymentMethod: paymentMethodFromStorage }

}
const middleware = [thunk]

const store = createstore(
    reducer,
    initialState,

    composeWithDevTools(applyMiddleware([...middleware]))
)

export default store