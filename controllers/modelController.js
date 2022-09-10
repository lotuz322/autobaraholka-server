const {Model, ProductType} = require('../models/models')
const ApiError = require('../error/ApiError')
const {where} = require("sequelize");

class ModelController {
    async create(req, res) {
        const {name, brandId} = req.body
        const model = await Model.create({name, brandId})
        return res.json(model)
    }

    async getAll(req, res) {
        const models = await Model.findAll()
        return res.json(models)
    }

    async getAllByBrandId(req, res) {
        const {brandId} = req.params
        const models = await Model.findAll({where: {brandId}})
        return res.json(models)
    }

    async upsert(req, res) {
        const {id, newValue} = req.body
        const productType = await Model.upsert({id, name: newValue})
        return res.json(productType)
    }

    async delete(req, res) {
        const {id} = req.body

        const rowModel = await Model.destroy({
            where: {
                id: id
            }
        })

        return res.json(rowModel)
    }
}

module.exports = new ModelController()