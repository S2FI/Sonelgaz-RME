import { PPService } from './../services/pp.service';
import { Router, Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { PostService } from "../services/post.service";
import { userRepository } from "../repository/user.repository";
import {  validator } from "../validators/post.validation";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { accesssoireRepository, appareilcRepository, jeubarresRepository, liaisonRepository, postehtabtRepository, postesourceRepository } from "../repository/ouvrage.repository";
import { visiteRepository } from "../repository/forms.reposoitry";
import { planRepository } from "../repository/planning.repository";

export class PostController {
  public router: Router;
  private postService: PostService;
  private ppService : PPService;

  constructor() {
    this.router = Router();
    this.postService = new PostService();
    this.ppService = new PPService();
    this.routes();
  }
  public login = async (req: Request, res: Response) => {
    this.postService.login(req, res);
  };
  public logout = async (req: Request, res: Response) => {
    this.postService.logout(req, res);
  };
  public register = async (req: Request, res: Response) => {
    this.postService.register(req, res);
  };
  public userlist = async (req: Request, res: Response) => {

    const user = await this.postService.users(req, res)
    res.send(user)

  };
  public update = async (req: Request, res: Response) => {
    this.postService.update(req, res);
  };
  public delete = async (req: Request, res: Response) => {
    this.postService.delete(req, res);
  };
  public planningdata = async (req: Request, res: Response) => {
    const customRepo: any = getCustomRepository(planRepository)
    const mydata = await customRepo.find({select: ["id_planning" ,"Titre_planning","Type_planning", "date_planning"] }) 
    console.log(mydata)
    res.send(mydata)
  };

  public createPlanning = async (req: Request, res: Response) => { 
    this.ppService.createPlanning(req,res)
  }
  public delete_planning = async (req: Request, res: Response) => {
    this.ppService.deletePlanning(req, res);
  };
  // public createProgram = async (req: Request, res: Response) => { 
  //   this.ppService.createProgram(req,res)
  // }
 

  public async routes() {
    this.router.get("/logout", this.logout);
    this.router.get("/users-get", this.userlist);
    this.router.get("/data", this.planningdata );

    this.router.post("/login", this.login );
    this.router.post("/register", this.register );
    this.router.post("/plan", this.createPlanning );
  

    this.router.put("/update/:id", this.update);

    this.router.delete("/delete/:id", this.delete);
    this.router.delete("/delete_planning/:id", this.delete_planning);
  }
}
