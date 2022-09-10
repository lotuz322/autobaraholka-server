const {ProductType, Model} = require('../models/models')
const ApiError = require('../error/ApiError')
const {log} = require("nodemon/lib/utils");
class ProductTypeControllerController {
    async create(req, res, next) {
        const {name} = req.body
        try {
            const productType = await ProductType.create({name})
            return res.json(productType)
        } catch (e) {
            return next(ApiError.badRequest(e.detail))
        }
    }

    async getAll(req, res) {
        const productTypes = await ProductType.findAll()
        return res.json(productTypes)
    }

    async upsert(req, res) {
        const {id, newValue} = req.body
        console.log(id)
        console.log(newValue)
        const productType = await ProductType.upsert({id, name: newValue})
        return res.json(productType)
    }

    async delete(req, res) {
        const {id} = req.body

        const rowModel = await ProductType.destroy({
            where: {
                id: id
            }
        })

        return res.json(rowModel)
    }
}

module.exports = new ProductTypeControllerController()