const {check} = require('express-validator')
const db = require('../db')
const { compare } = require('bcryptjs')

//password
const password = check('password').isLength({min:6, max:15}).withMessage(' password too short')

//username
const username= check('username').isLength( {min:3}).withMessage('username too short')

//check if username exists
const usernameExist = check('username').custom(async(value) => {
    const {rows} = await db.query('SELECT * from users WHERE username = $1', [
        value,
    ])
    if (rows.length) {
        throw new Error('username already exists')
    }
})


//login validation
const loginFieldsCheck = check('username').custom(async (value, { req }) => {
    const user = await db.query('SELECT * from users WHERE username = $1', [value])
  
    if (!user.rows.length) {
      throw new Error('username does not exists.')
    }
  
    const validPassword = await compare(req.body.password, user.rows[0].password)
  
    if (!validPassword) {
      throw new Error('Wrong password')
    }
  
    req.user = user.rows[0]
  })
  
  module.exports = {
    registerValidation: [username, password, usernameExist],
    loginValidation: [loginFieldsCheck],
  }