import { FormService } from './../services/form.service';
import { PPService } from './../services/pp.service';
import { Router, Response, Request } from "express";
import { createQueryBuilder, getCustomRepository, getRepository } from "typeorm";
import { PostService } from "../services/post.service";
import { userRepository } from "../repository/user.repository";
import {  validator } from "../validators/post.validation";
import { validationMiddleware } from "../middlewares/validation-middleware";
import { accesssoireRepository, appareilcRepository, jeubarresRepository, liaisonRepository, postehtabtRepository, postesourceRepository } from "../repository/ouvrage.repository";
import { visiteRepository } from "../repository/forms.reposoitry";
import { planRepository, programRepository } from "../repository/planning.repository";

export class PostController {
  public router: Router;
  private postService: PostService;
  private ppService : PPService;
  private formService : FormService;

  constructor() {
    this.router = Router();
    this.postService = new PostService();
    this.ppService = new PPService();
    this.formService = new FormService();
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
    const mydata = await customRepo.find({select: ["id_planning" ,"Titre_planning","Type_planning", "date_planning"],
  order: {date_planning : "ASC"} }) 
    res.send(mydata)
  };

  public createPlanning = async (req: Request, res: Response) => { 
    this.ppService.createPlanning(req,res)
  }
  public delete_planning = async (req: Request, res: Response) => {
    this.ppService.deletePlanning(req, res);
  };

  public update_planning = async (req: Request, res: Response) => {
    this.ppService.updatePlanning(req, res); 
  }; 
 
  public getOuvrage = async (req: Request, res: Response) => { 
    const ouvrage = await this.ppService.getOuvrage(req,res)
    res.send(ouvrage)
  }
  public fullPlanning = async (req: Request, res: Response) => { 
    const plan = await this.ppService.getFullPlanning(req,res)
    res.send(plan) 
  }
  public delete_program = async (req: Request, res: Response) => {
    this.ppService.deleteProgram(req, res);
  };


  public createFormVisite = async (req: Request, res: Response) => { 
    this.formService.createFormVisite(req,res) 
  }
  public createFormMaintenance = async (req: Request, res: Response) => { 
    this.formService.createFormMaintenance(req,res) 
  }
  public createFormEntretien = async (req: Request, res: Response) => { 
    this.formService.createFormEntretien(req,res) 
  }
  public equipeData = async (req: Request, res: Response) => {
    const nom_equipe = req.params.equipe
    const programRepo: any = getCustomRepository(programRepository)
    const mydata = await programRepo.find({
      relations :["plan"],
       where: {nom_equipe_programme:nom_equipe},      
      
     }) 
    
    res.send(mydata)
  };
  
  public maintenanceForm = async (req: Request, res: Response) => { 
    const maintenanceData = await this.formService.maintenanceForm(req,res) 
    res.send(maintenanceData)
  }
  public entretienForm = async (req: Request, res: Response) => { 
    const entretienData = await this.formService.entretienForm(req,res) 
    res.send(entretienData)
  }
  public visiteForm = async (req: Request, res: Response) => { 
    const visiteData = await this.formService.visiteForm(req,res) 
    res.send(visiteData)
  }

  public delete_maintenance = async (req: Request, res: Response) => {
    this.formService.deleteMaintenance(req, res);
  };

  public delete_entretien = async (req: Request, res: Response) => {
    this.formService.deleteEntretien(req, res);
  };

  public delete_visite = async (req: Request, res: Response) => {
    this.formService.deleteVisite(req, res);
  };
  public update_maintenance = async (req: Request, res: Response) => {
    this.formService.updateMaintenance(req, res);
  };

  public update_entretien = async (req: Request, res: Response) => {
    this.formService.updateEntretien(req, res);
  };

  public update_visite = async (req: Request, res: Response) => {
    this.formService.updateVisite(req, res);
  };

  public maintenanceFormPlan = async (req: Request, res: Response) => { 
    const maintenanceData = await this.formService.maintenanceFormPlan(req,res) 
    res.send(maintenanceData)
  }
  public entretienFormPlan = async (req: Request, res: Response) => { 
    const entretienData = await this.formService.entretienFormPlan(req,res) 
    res.send(entretienData)
  }
  public visiteFormPlan = async (req: Request, res: Response) => { 
    const visiteData = await this.formService.visiteFormPlan(req,res) 
    res.send(visiteData)
  }
  public tracking = async (req: Request, res: Response) => {
    this.postService.tracking(req, res);
  };
  public getTrack = async (req: Request, res: Response) => { 
    const trackData = await this.postService.getTrack(req,res) 
    res.send(trackData)
  }
  public async routes() {
    this.router.get("/logout", this.logout);
    this.router.get("/users-get", this.userlist);

    this.router.get("/data", this.planningdata );
    this.router.get("/full-planning", this.fullPlanning)
    this.router.get("/liaison", this.getOuvrage );
    this.router.get("/get_track", this.getTrack );

    this.router.get("/equipe_planning/:equipe", this.equipeData );
    this.router.get("/maintenance_form/:user", this.maintenanceForm );
    this.router.get("/entretien_form/:user", this.entretienForm );
    this.router.get("/visite_form/:user", this.visiteForm );

    this.router.get("/maintenance_form_planning", this.maintenanceFormPlan );
    this.router.get("/entretien_form_planning", this.entretienFormPlan );
    this.router.get("/visite_form_planning", this.visiteFormPlan );

    this.router.post("/login", this.login );
    this.router.post("/register", this.register );
    this.router.post("/track", this.tracking );
    this.router.post("/plan", this.createPlanning );
   
    this.router.post("/form-visite", this.createFormVisite );
    this.router.post("/form-maintenance", this.createFormMaintenance );
    this.router.post("/form-entretien", this.createFormEntretien);
  

    this.router.put("/update/:id", this.update);
    this.router.put("/update_planning/:id", this.update_planning);

    this.router.put("/update_maintenance/:id", this.update_maintenance);
    this.router.put("/update_entretien/:id", this.update_entretien);
    this.router.put("/update_visite/:id", this.update_visite);


    this.router.delete("/delete/:id", this.delete);
    this.router.delete("/delete_planning/:id", this.delete_planning);
    this.router.delete("/delete_program/:id", this.delete_program);

    this.router.delete("/delete_maintenance/:id", this.delete_maintenance);
    this.router.delete("/delete_entretien/:id", this.delete_entretien);
    this.router.delete("/delete_visite/:id", this.delete_visite);
  }
}
