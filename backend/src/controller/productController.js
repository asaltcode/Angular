import ProductModel from "../model/productModel.js"


const addProduct = async (req, res, next) =>{
    try {
        const {name, price} = req.body
        const product = await ProductModel.create({name, price})
        
        res.status(201).send({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const getProduct = async (req, res, next) =>{
    try {
        const product = await ProductModel.find()
        res.status(201).send({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const deleteProduct = async (req, res, next) =>{
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id)
        if(!product){
            return  res.status(404).send({
                success: false,
                message: "Not found"
            })
          } 
          res.status(204).send({
            success: true,
            message: "Product Deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const getProductById = async (req, res, next) =>{
    try {
       const product = await ProductModel.findById(req.params.id)
       if (!product) {
        return  res.status(404).send({
              success: false,
              message: "Not found"
          })
        } 
    res.status(200).send({
        success: true, 
        product
    })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}
const editProduct = async (req, res, next) =>{
    try {
        console.log(req.file)
        const product = await ProductModel.findById( req.params.id, req.body, { new: true } )
        if (!product) {
          return  res.status(404).send({
                success: false,
                message: "Not found"
            })
          } 
          res.status(201).send({
            success: true,
            message: "Product edited",
            product
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export default {addProduct, getProduct, deleteProduct, getProductById, editProduct}