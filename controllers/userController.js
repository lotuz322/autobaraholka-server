const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({
      id: id,
      email: email,
      role: role
  }, process.env.SECRET_KEY, {
      expiresIn: '24h'
  })
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role, firstName, secondName} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некоректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 2)
        const user = await User.create({email, role, password: hashPassword, firstName, secondName})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, firstName: user.firstName, secondName: user.secondName})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token, firstName: user.firstName, secondName: user.secondName})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        const user = await User.findOne({where: {email: req.user.email}})
        return res.json({token, firstName: user.firstName, secondName: user.secondName})
    }
}

module.exports = new UserController()