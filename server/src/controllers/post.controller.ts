import { Router, Response, Request } from "express";
import { getCustomRepository } from "typeorm";
import { userEntity } from "../database/entities/user.entity";
import { PostService } from "../services/post.service";
import { userRepository } from "../repository/user.repository";
import {  validator } from "../validators/post.validation";
import { validationMiddleware } from "../middlewares/validation-middleware";

export class PostController {
  public router: Router;
  private postService: PostService;
  public validator : validator;// how to pass validations

  constructor() {
    this.router = Router();
    this.postService = new PostService();
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

  public async routes() {
    this.router.post("/login", this.login );
    this.router.get("/logout", this.logout);
    this.router.get("/users-get", this.userlist);
    this.router.post("/register", this.register );
    this.router.put("/update/:id", this.update);
    this.router.delete("/delete/:id", this.delete);
  }
}
