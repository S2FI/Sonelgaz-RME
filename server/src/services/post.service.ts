import { userEntity } from './../database/entities/user.entity';
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Service } from "typedi";
import { createConnection, getCustomRepository } from "typeorm";
import { SECRET } from "../constants";
import { userRepository } from '../repository/user.repository';
import { check } from 'express-validator';

@Service()
export class PostService {
  constructor() {}

  public login = async (req, res) => {
    let user = req.body;
  
    let payload = {
      id: user.id,
      username: user.username,
    };
  
    try {
      const token = await sign(payload, SECRET);

      const loginFieldsCheck = check('username').custom(async (value, { req }) => {
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
      
  
      return res.status(200).cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "Logged in succefully",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };

  public logout = async (req, res) => {
    try {
      return res.status(200).clearCookie("token", { httpOnly: true }).json({
        success: true,
        message: "Logged out succefully",
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  public users = async (req, res) => {
    
    const customRepo: any = getCustomRepository(userRepository)  
      const user = await customRepo.find({ select: ["id" ,"username","password", "role"] })
      console.log("User from DB: ", user); 
      return user
  };

  public register = async (req, res) => { 
      const { username, password, role } = req.body;
      try {
        
        const hashedPassword = await hash(password, 10);
        const customRepo: any = getCustomRepository(userRepository)  
           await customRepo.insert(
            { username: username,
               password: hashedPassword,
                role: role }
          )
        
        return res.status(201).json({
          success: true,
          message: "The registraion was succefull",
        });
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: error.message,
        });
      }
    };

  public update = async (req, res) => {
    console.log("my update id:",req.params.id)
    const urlId = req.params.id
    const { username, password, role } = req.body;
    try {
      const hashedPassword = await hash(password, 10);
      const customRepo: any = getCustomRepository(userRepository)  
    await customRepo.update(urlId, {username: username, password:hashedPassword, role: role})
    return res.status(203).json({
      success: true,
      message: "succefully updated" + urlId,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
      
    }
    
  };

  public delete = async (req, res) => {
    console.log("my delete id:",req.params.id)
    const urlId = req.params.id
    try {
      const customRepo: any = getCustomRepository(userRepository)  
    await customRepo.delete({id: urlId})
    return res.status(202).json({
      success: true,
      message: "succefully deleted " + urlId,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
      
    }
    
  };
}
