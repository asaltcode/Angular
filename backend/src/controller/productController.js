import ProductModel from "../model/productModel.js"
import APIFeatures from "../utils/apiFeatures.js"


const addProduct = async (req, res, next) =>{
    try {
        if(req.file){
            req.body.image = `${req.protocol}://${req.rawHeaders[1]}/images/${req.file.filename}`
            req.body.thumbnail = `${req.protocol}://${req.rawHeaders[1]}/images/thumbnails/${req.file.filename}`
        }
        const product = await ProductModel.create(req.body)
        
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
        if(req.file){
            req.body.image = `${req.protocol}://${req.rawHeaders[1]}/images/${req.file.filename}`
            req.body.thumbnail = `${req.protocol}://${req.rawHeaders[1]}/images/thumbnails/${req.file.filename}`
        }
        // req.body.image = `${req.protocol}://${req.rawHeaders[1]}/images/${req.file.filename}`
        // req.body.thumbnail = `${req.protocol}://${req.rawHeaders[1]}/images/thumbnails/${req.file.filename}`
        const product = await ProductModel.findByIdAndUpdate( req.params.id, req.body, { new: true } )
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
const searchProduct = async (req, res, next) => {
    try {
    const ApiFeatre = new APIFeatures(ProductModel.find(), req.query).search()
    const prodcut = await ApiFeatre.query
    res.status(200).send({
      prodcut
    })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export default {addProduct, getProduct, deleteProduct, getProductById, editProduct, searchProduct}