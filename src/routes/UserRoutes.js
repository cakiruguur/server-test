const express = require('express')
const Router = express.Router()
const UserController = require('@Controllers/UserController')
const validate = require('../app/Middleware/validate')
const auth = require('@Middleware/auth')
const {createValidation, loginValidation, resetValidation} = require('@/validations/UserValidations')

Router.post('/login',validate(loginValidation),UserController.login)
Router.post('/register',validate(createValidation),UserController.create)
Router.get('/whoami',auth,UserController.whoAmI)

Router.get('/',UserController.index)
Router.get('/projects',auth,UserController.projectList)
Router.get('/:id',auth,UserController.find)
Router.delete('/:id',auth,UserController.delete)
Router.post('/reset-password',validate(resetValidation),UserController.resetPassword)

module.exports = Router