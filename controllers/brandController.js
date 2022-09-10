const {Brand, Model} = require('../models/models')
const ApiError = require('../error/ApiError')
class BrandController {
    async create(req, res, next) {
        const {name} = req.body
        try {
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            return next(ApiError.badRequest(e.detail))
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async upsert(req, res) {
        const {id, newValue} = req.body
        const [instance, created] = await Brand.upsert({id: id, name: newValue})
        return res.json(instance)
    }

    async delete(req, res) {
        const {id} = req.body

        const rowModel = await Model.destroy({
            where: {
                brandId: id
            }
        })

        const rowBrand = await Brand.destroy({
            where: {
                id
            }
        })

        return res.json(rowBrand + rowModel)
    }
}

module.exports = new BrandController()