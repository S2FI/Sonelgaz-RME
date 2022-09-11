import { response } from "express";
import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { entretienRepository, maintenanceRepository, visiteRepository } from "../repository/forms.reposoitry";
import { planRepository } from "../repository/planning.repository";


@Service()
export class FormService {
  constructor() {}
  public createFormVisite = async (req, res) =>  {
    const {id_form_visite,titre_formulaire, code_ouvrage, description,action, user_created_form,signature } = req.body
    try {
    const visitRepo: any = getCustomRepository(visiteRepository)
     await visitRepo.insert(
      { 
        id_form_visite:id_form_visite,
        titre_formulaire:titre_formulaire,
        code_ouvrage:code_ouvrage,
        description: description,
        action:action,
        created_user_form:user_created_form,
        signature:signature,
    }
    )

  return res.status(203).json({
    success: true,
    message: "succefully created a form visit",
  });
} catch (error) {
  console.log(error.message);
  return res.status(500).json({
    error: error.message,
  });
}
}

public createFormEntretien = async (req, res) =>  {
  const {id_form_entretien,titre_formulaire, code_ouvrage, nbr_isolateur_casses,fil_fer_degager, 
    conducteur_ebreche,pont_detache,portee_dereglee,support_incline,elagage,armements,nid_oiseau,observation,
     heures_debut, heures_fin,ligne_depart, user_created_form,longueur_visiter,signature } = req.body
  try {
  const entretienRepo: any = getCustomRepository(entretienRepository)
  await entretienRepo.insert(
    { 
      id_form_entretien:id_form_entretien,
      titre_formulaire:titre_formulaire,
      code_ouvrage:code_ouvrage,
      nbr_isolateur_casse: nbr_isolateur_casses,
      fil_fer_degager:fil_fer_degager,
      conducteur_ebreche:conducteur_ebreche,
      pont_detache:pont_detache,
      portee_dereglee:portee_dereglee,
      support_incline:support_incline,
      elagage:elagage,
      armements:armements,
      nid_cigogne_oiseau:nid_oiseau,
      observation:observation,
      heures_debut:heures_debut,
      heures_fin:heures_fin,
      ligne_depart:ligne_depart,
      created_user_form:user_created_form,
      longueur_visiter:longueur_visiter,
      signature:signature,
  }
  )
  
return res.status(203).json({
  success: true,
  message: "succefully created a form entretien",
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
  error: error.message,
});
}
}
public createFormMaintenance = async (req, res) =>  {
  const {id_form_maintenance,titre_formulaire, code_ouvrage, description,raison_panne, user_created_form, signature } = req.body
  try {
  const maintenanceRepo: any = getCustomRepository(maintenanceRepository)
   await maintenanceRepo.insert(
    { 
      id_form_maintenance:id_form_maintenance,
      titre_formulaire:titre_formulaire,
      code_ouvrage:code_ouvrage,
      description: description,
      raison_de_panne:raison_panne,
      created_user_form:user_created_form,
      signature:signature
  }
  )

return res.status(203).json({
  success: true,
  message: "succefully created a form maintenance",
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
  error: error.message,
});
}
}

public maintenanceForm = async (req, res) =>  {
  const userName = req.params.user
  const mainRepo: any = getCustomRepository(maintenanceRepository)
  const mydata = await mainRepo.find({ created_user_form:userName}) 
 
  return mydata
};
public entretienForm = async (req, res) =>  {
  const userName = req.params.user
  const mainRepo: any = getCustomRepository(entretienRepository)
  const mydata = await mainRepo.find({ created_user_form:userName}) 
 
  return mydata
};

public visiteForm = async (req, res) =>  {
  const userName = req.params.user
  const mainRepo: any = getCustomRepository(visiteRepository)
  const mydata = await mainRepo.find({ created_user_form:userName}) 
 
  return mydata
};

public deleteVisite = async (req, res) =>  {  
  const urlId = req.params.id
  
  try {
    const mainRepo: any = getCustomRepository(visiteRepository)
   await mainRepo.delete({ id_form:urlId}) 
  return res.status(202).json({
    success: true,
    message: "succefully deleted " + urlId,
  });
} catch (error) {
  console.log(error.message);
  return res.status(500).json({ 
    error: error.message,
  });
    
  }}

public deleteEntretien = async (req, res) =>  {const urlId = req.params.id
  
  try {
    const mainRepo: any = getCustomRepository(entretienRepository)
  await mainRepo.delete({ id_form:urlId}) 
  return res.status(202).json({
    success: true,
    message: "succefully deleted " + urlId,
  });
} catch (error) {
  console.log(error.message);
  return res.status(500).json({ 
    error: error.message,
  });
    
  }}
public deleteMaintenance = async (req, res) =>  {
  const urlId = req.params.id
  try {
    const mainRepo: any = getCustomRepository(maintenanceRepository)
 await mainRepo.delete({ id_form:urlId}) 
  return res.status(202).json({
    success: true,
    message: "succefully deleted " + urlId,
  });
} catch (error) {
  console.log(error.message);
  return res.status(500).json({ 
    error: error.message,
  });
    
  }}

public updateVisite = async (req, res) =>  {
  const urlId = req.params.id
  const {titre_formulaire, code_ouvrage, description,action } = req.body
  try {
  const visitRepo: any = getCustomRepository(visiteRepository)
   await visitRepo.update(
    urlId,
    { 
      titre_formulaire:titre_formulaire,
      code_ouvrage:code_ouvrage,
      description: description,
      action:action,
  }
  )

return res.status(203).json({
  success: true,
  message: "succefully updated a form visit",
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
  error: error.message,
});
}
}

public updateEntretien = async (req, res) =>  {
  const urlId = req.params.id
const {titre_formulaire, code_ouvrage, nbr_isolateur_casses,fil_fer_degager, 
  conducteur_ebreche,pont_detache,portee_dereglee,support_incline,elagage,armements,nid_oiseau,observation,
   heures_debut, heures_fin, longueur_visiter } = req.body
try {
const entretienRepo: any = getCustomRepository(entretienRepository)
await entretienRepo.update(
  urlId,
  { 
    titre_formulaire:titre_formulaire,
    code_ouvrage:code_ouvrage,
    nbr_isolateur_casse: nbr_isolateur_casses,
    fil_fer_degager:fil_fer_degager,
    conducteur_ebreche:conducteur_ebreche,
    pont_detache:pont_detache,
    portee_dereglee:portee_dereglee,
    support_incline:support_incline,
    elagage:elagage,
    armements:armements,
    nid_cigogne_oiseau:nid_oiseau,
    observation:observation,
    heures_debut:heures_debut,
    heures_fin:heures_fin,  
    longueur_visiter:longueur_visiter,
    
}
)

return res.status(203).json({
success: true,
message: "succefully updated a form entretien",
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
error: error.message,
});
}
}
public updateMaintenance = async (req, res) =>  {
  const urlId = req.params.id
const {titre_formulaire, code_ouvrage, description,raison_panne } = req.body
try {
const maintenanceRepo: any = getCustomRepository(maintenanceRepository)
 await maintenanceRepo.update(
  urlId,
  {  
    titre_formulaire:titre_formulaire,
    code_ouvrage:code_ouvrage,
    description: description,
    raison_de_panne:raison_panne,
  }
)

return res.status(203).json({
success: true,
message: "succefully updated a form maintenance",
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
error: error.message,
});
}

}

public maintenanceFormPlan = async (req, res) =>  {
  let plan=[];
  const mainRepo: any = getCustomRepository(maintenanceRepository)
  const planRepo: any = getCustomRepository(planRepository)

  const mydata = await mainRepo.find({ order:{id_form_maintenance:"ASC"} }) 
     
  const full = await planRepo.find({ order:{id_planning:"ASC"}  })
     
  full.map( (data, index)=>{
        if(data.Type_planning== "Maintenance"){ 
          mydata.map( (code)=>{
            if(data.id_planning== code.id_form_maintenance){
              plan.push({...code, typeForm:data.Type_planning , titleplan:data.Titre_planning, key:data.id_planning, date:data.date_planning})
            }
          })
                
        }
  })
  
  return plan
};
public entretienFormPlan = async (req, res) =>  {
  let plan=[];
  const mainRepo: any = getCustomRepository(entretienRepository)
  const planRepo: any = getCustomRepository(planRepository)

  const mydata = await mainRepo.find({ order:{id_form_entretien:"ASC"} }) 

  const full = await planRepo.find({ order:{id_planning:"ASC"}  })
     
  full.map( (data, index)=>{
        if(data.Type_planning== "Entretien"){
          mydata.map( (code)=>{
            if(data.id_planning== code.id_form_entretien){
              plan.push({...code, typeForm:data.Type_planning , titleplan:data.Titre_planning, key:data.id_planning, date:data.date_planning})
            }
          })
                
        }
  })
  
  return plan
};

public visiteFormPlan = async (req, res) =>  {
  let plan=[];
  
  const mainRepo: any = getCustomRepository(visiteRepository)
  const planRepo: any = getCustomRepository(planRepository)

  const mydata = await mainRepo.find({ order:{id_form_visite:"ASC"} }) 

  const full = await planRepo.find({ order:{id_planning:"ASC"}  })
     
  full.map( (data, index)=>{
        if(data.Type_planning== "Visite"){
          mydata.map( (code)=>{
            if(data.id_planning== code.id_form_visite){
              plan.push({...code, typeForm:data.Type_planning , titleplan:data.Titre_planning, key:data.id_planning, date:data.date_planning})
            }
          })
                
        }
  })
  // const test = plan.map( (data)=>{
  //   Object.keys(data).forEach(async (key,index)=>{
  //    if(Object.keys(prevData).length!=0)
  //    {
  //     if(key == prevData){
  //       return {...data[prevData], [index]:data[key]}
  //     }
  //    }     
  //     prevData=key;
  //   })
  // })
  // console.log(test)
  return plan
};
}
// { 
//   "id_form_visite":"1",
//   "code_ouvrage":"70H1C1070H6C35",
//   "description": "sirrage",
//   "action":"Entretenir",
//   "heures_debut":"8:00",
//   "heures_fin":"12:00",
//   "ligne_depart":"70H1C10",
//   "created_user_form":"amine"
// }