import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'


//@desc fetch all products
//@route GET/api/products
//@access public

const getProducts = ('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))


//@desc fetch single product
//@route GET/api/product
//@access public


const getProductById = ('/:id', asyncHandler(async (req, res) => {
    const product = Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404).json({ message: 'Product not found' })

    }
}))

//@dec DELETE PRODUCTS
//@route DELETE/api/product/:id
//@access private

const productDelete = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await Product.removed()
        res.json({ Message: 'Product Removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

//@dec CREATE A  PRODUCT
//@route POST/api/productS/:id
//@access private/admin

const createProduct = asyncHanler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        image: '/images/Sample.jgp',
        price: 0,
        user: req.user._id,
        brand: 'Sample brand',
        category: 'Sample category',
        description: 'Sample description',
        countInStock: 0,
        numReviews: 0,
    })
    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

//@desc update PRODUCT 
//@route PUT/api/products/:id
//@access private/admin

const updateProduct = asyncHandler(async (req, res) => {
    const { name, image, price, description, brand, countInStock, numReviews } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name
        product.image = image
        product.price = price
        product.description = description
        product.brand = brand
        product.countInStock = countInStock
        product.numReviews = numReviews

        const updateProduct = await product.save()
        json(updateProduct)

    } else {
        res.status(404)
        throw new Error('Product not Found')
    }
})

//@desc Get new reviews
//@route POST/api/products/:id/reviews
//@eacces private

const createProductReviews = asyncHanler(async (req, res) => {
    const { rating, comments } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        const productReadyReviews = product.reviews.find(r => r.user.toString() === r.user._id.toString())
        if (productReadyReviews) {
            res.status(404)
            throw new Error('Product Already reviews')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comments,
            user: user._id
        }

        Product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => (item.rating + acc, 0)) /
            product.reviews.length
        await product.save()
        res.status(200).json({ message: 'added reviews' })

    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
export default {
    getProductById,
    getProducts,
    productDelete,
    createProduct,
    updateProduct,
    createProductReviews

}
