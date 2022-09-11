import { userEntity } from './../database/entities/user.entity';
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Service } from "typedi";
import { createConnection, getCustomRepository } from "typeorm";
import { SECRET } from "../constants";
import { trackRepository, userRepository } from '../repository/user.repository';
import { check } from 'express-validator';
import { equipeRepository } from '../repository/planning.repository';

@Service()
export class PostService {
  constructor() {}

  public login = async (req, res) => {
    let userInfo = req.body;
    let payload = userInfo.username
    let chef_equipe =""
         
    try {
      const customRepo: any = getCustomRepository(userRepository)
      const equipeRepo: any = getCustomRepository(equipeRepository)
    const user = await customRepo.find({ username : userInfo.username })   
        if (!Object.keys(user).length) {
          throw new Error('username does not exists.')
        }
      
        const validPassword = await compare(userInfo.password, user[0].password)
      
        if (!validPassword) {
          throw new Error('Wrong password')
        }
        
      const token = await sign(payload, SECRET);
      const chef = await equipeRepo.find({select:["nom_equipe"], where: { chef_equipe : userInfo.username }}) 
      if (chef.length !=0) {
        chef_equipe=chef[0].nom_equipe
      }
      console.log(chef)
      return res.status(200).cookie("token", token, { httpOnly: true }).json({
        success: true,
        message: "Logged in succefully",
        user: userInfo.username,
        equipe: chef_equipe
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
      const user = await customRepo.find({  })
      return user
  };

  public register = async (req, res) => { 
      const { username, password, role, nom,prenom } = req.body;
      const reg = new RegExp('^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')
      try {

        if (reg.test(password)===false) {
          throw new Error(`mot de passe doit etre: 
          /  entre 4 et 20 
          /  accepte que _ et . 
            /_ et . ne peut pas etre proche `)
        }

        if (reg.test(username)===false) {
          throw new Error(`Nom utilisateur doit etre: 
          /  entre 4 et 20 
          /  accepte que _ et . 
            /_ et . ne peut pas etre proche `)
        }


      //check if username exists
      const customRepo: any = getCustomRepository(userRepository)
    const user = await customRepo.find({ username : username })   
        if (Object.keys(user).length) {
          throw new Error('Utilisateur deja exist')
        }

        //registration
        const hashedPassword = await hash(password, 10);
           await customRepo.insert(
            { username: username,
              password: hashedPassword,
              role: role,
              nom:nom,
              prenom:prenom, 
            }
          )
        
        return res.status(201).json({
          success: true,
          message: "Le compte d'utilisateur : "+username+" a ete cree avec succees",
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
    const { username, password, role,nom,prenom } = req.body;
    const reg = new RegExp('^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$')
   

    try {

      if (reg.test(password)===false) {
        throw new Error(`mot de passe doit etre: 
        /  entre 4 et 20 
        /  accepte que _ et . 
          /_ et . ne peut pas etre proche `)
      }
  
      if (reg.test(username)===false) {
        throw new Error(`Nom utilisateur doit etre: 
        /  entre 4 et 20 
        /  accepte que _ et . 
          /_ et . ne peut pas etre proche `)
      }


      const hashedPassword = await hash(password, 10);
      const customRepo: any = getCustomRepository(userRepository)  
    await customRepo.update(urlId, {username: username, password:hashedPassword, role: role, nom:nom,
      prenom:prenom, })
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

  public tracking = async (req, res) => {
    const { tracked_user, user_role, action_tracked } = req.body;
    try {
      const customRepo: any = getCustomRepository(trackRepository)  
    await customRepo.insert({
      tracked_user:tracked_user,
      user_role:user_role,
      action_tracked:action_tracked,
      ip_address:"::1"
    }) 
    return res.status(202).json({
      success: true,
      message: "succefully tracked"
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ 
      error: error.message,
    });
      
    }
  }
  public getTrack = async (req, res) => {
  
      const customRepo: any = getCustomRepository(trackRepository)  
   const data = await customRepo.find({}) 
   console.log("=>", data)
   return data
  }
}
