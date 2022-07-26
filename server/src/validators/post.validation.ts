import { check } from 'express-validator'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { userRepository } from '../repository/user.repository'

export class validator {
//password
// public password = check('password').isLength({min:6, max:15}).withMessage(' password too short')

// //username
// public username= check('username').isLength( {min:3}).withMessage('username too short')

// //check if username exists
// public usernameExist = check('username').custom(async(value) => {
//     // const {rows} = await db.query('SELECT * from users WHERE username = $1', [
//     //     value,
//     // ])
//     const customRepo: any = getCustomRepository(userRepository)  
//       const user = await customRepo.find({ username : value })
//     if (user.length) {
//         throw new Error('username already exists')
//     }
// })


//login validation
 public loginFieldsCheck = async () => {
  const failedEvent = check('username').custom(async (value, { req }) => {
    
    const customRepo: any = getCustomRepository(userRepository)  
      const user = await customRepo.find({ username : value })
  
    if (!user.rows.length) {
      throw new Error('username does not exists.')
    }
  
    const validPassword = await compare(req.body.password, user.rows[0].password)
  
    if (!validPassword) {
      throw new Error('Wrong password')
    }
  
    req.user = user.rows[0]
  })
}
 }
 

  
  // module.exports = {
  //   registerValidation: [username, password, usernameExist],
  //   loginValidation: [loginFieldsCheck],
  // }