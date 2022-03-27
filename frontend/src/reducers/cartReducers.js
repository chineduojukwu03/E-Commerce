import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/productConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existingItem = state.cartItems.find((p) => p.product === item.product)
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((p) => p.product === existingItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((p) => p.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}



