import { Service } from "typedi";
import { Any, getCustomRepository } from "typeorm";
import { entretienRepository, maintenanceRepository, visiteRepository } from "../repository/forms.reposoitry";
import { liaisonRepository } from "../repository/ouvrage.repository";
import { equipeRepository, planRepository, programRepository } from "../repository/planning.repository";


@Service()
export class PPService {
  constructor() {}

  public createPlanning = async (req, res) =>  {
    const {Titre_planning , Type_planning,  user_created,code_visite, program} = req.body
    try {
    const planRepo: any = getCustomRepository(planRepository)
    const plan =await planRepo.insert(
      { Titre_planning: Titre_planning,
        Type_planning: Type_planning,
        user_created: user_created, 
        code_visite:code_visite,
           }
    )
    const id = plan.identifiers[0].id_planning
    // console.log(plan.identifiers[0].id_planning)
        // const equipeRepo: any = getCustomRepository(equipeRepository)
        // program[key].id_equipe = await equipeRepo.find({
        //   select: ["id_equipe"],
        //   where: { nom_equipe: program[key].nom_equipe_programme }
        // });

    let fullPlanning =[]
    Object.keys(program).forEach(async (key, index) => {
      program[key].id_planning = id;
      if(program[key].nom_equipe_programme == "A")
      {
        program[key].id_equipe =1
      }else if (program[key].nom_equipe_programme == "B")
      {
        program[key].id_equipe =2
      }
      else if (program[key].nom_equipe_programme == "C")
      {
        program[key].id_equipe =3
      }
      
      fullPlanning.push(program[key]);
    });
    
      const programRepo: any = getCustomRepository(programRepository)
       await programRepo.insert( fullPlanning)
    return res.status(203).json({
      success: true,
      message: "succefully created a planning",
      planning_id: id,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
  }
  }

  public  deletePlanning = async (req, res) =>  { 
    console.log("my delete id:",req.params.id)
  const urlId = req.params.id
  try {
    const customRepo: any = getCustomRepository(planRepository)  
  await customRepo.delete({id_planning: urlId})
  return res.status(202).json({
    success: true,
    message: "succefully deleted planning with id : " + urlId,
  });
} catch (error) {
  console.log(error.message);
  return res.status(500).json({
    error: error.message,
  });
    
  }
  
};


public  deleteProgram = async (req, res) =>  { 
  console.log("my delete id:",req.params.id)
const urlId = req.params.id
try {
  const customRepo: any = getCustomRepository(programRepository)  
await customRepo.delete({id_programme: urlId})
return res.status(202).json({
  success: true,
  message: "succefully deleted programme with id : " + urlId,
});
} catch (error) {
console.log(error.message);
return res.status(500).json({
  error: error.message,
});
  
}

};



public  updatePlanning = async (req, res) =>  { 

    // console.log("my update id:",req.params.id)
    const urlId = req.params.id
    const {Titre_planning , Type_planning,code_visite, program} = req.body
    let equipe_id;
    try {
      const planRepo: any = getCustomRepository(planRepository)  
    await planRepo.update(urlId, { 
      Titre_planning: Titre_planning,
      Type_planning: Type_planning,
      code_visite:code_visite,
         })

         const programRepo: any = getCustomRepository(programRepository)
       const listIdProgram= await programRepo.find({
        select:["id_programme"],
        where: { id_planning: urlId },
        order: { id_programme : "ASC"}
       })

       
      
      //  console.log("my programs ids : ",listIdProgram[0].id_programme)
      Object.keys(listIdProgram).forEach(async (key, index) => {
        // console.log(program[listIdProgram[key].id_programme])
        //  console.log(key)
        //  console.log(listIdProgram[key])
         let id = listIdProgram[key].id_programme
       if( Object.keys(program.update[id]).length != 0) {
        if(program.update[id].nom_equipe_programme == "A")
        {
          equipe_id=1
        }else if (program.update[id].nom_equipe_programme == "B")
        {
          equipe_id=2
        }
        else if (program.update[id].nom_equipe_programme == "C")
        {
          equipe_id =3
        }
        
      await programRepo.update(id, {
      date_debut_programme :program.update[id].date_debut_programme ,
      date_fin_programme : program.update[id].date_fin_programme,
      district: program.update[id].district ,
      depart:program.update[id].depart ,
      code_ouvrage: program.update[id].code_ouvrage,
      nom_equipe_programme:program.update[id].nom_equipe_programme ,
      id_equipe:equipe_id
    })
  }  
    })

    let insertProgram =[]
    Object.keys(program.insert).forEach(async (key, index) => {
      program.insert[key].id_planning = urlId;
      if(program.insert[key].nom_equipe_programme == "A")
      {
        program.insert[key].id_equipe =1
      }else if (program.insert[key].nom_equipe_programme == "B")
      {
        program.insert[key].id_equipe =2
      }
      else if (program.insert[key].nom_equipe_programme == "C")
      {
        program.insert[key].id_equipe =3
      }
      
      insertProgram.push(program.insert[key]);
    });
    await programRepo.insert( insertProgram)
    
    return res.status(203).json({
      success: true,
      message: "succefully updated planning"
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: error.message,
    });
      
    }
    
  };

  public  getFullPlanning = async (req, res) =>  { 
    const planRepo: any = getCustomRepository(planRepository)
       const fullPlanning= await planRepo.find({
        relations :["program"],
        // where: {id_planning:urlId },      
        
       })
       return fullPlanning
  } 

  public  getOuvrage = async (req, res) =>  { 
    const liaisonRepo: any = getCustomRepository(liaisonRepository)
       const ouvrage= await liaisonRepo.find({
        select:["code" , "numdepart"],
        where:  ` numdepart like '%70H1%' or numdepart like '%70H6%' ` ,
        order: { numdepart : "ASC"},
       })
       let codeDepart ={}
       let code =[]
    //    var array = Object.keys(ouvrage).map(function(key, index) {
        
        
    //     return (ouvrage[key]);
    // });
       Object.keys(ouvrage).forEach(async (key, index) => {
        if(index +1 != ouvrage.length)
        {
        if(ouvrage[index].numdepart == ouvrage[index +1].numdepart)
        {
          code.push(ouvrage[key].code)
        }else {
          code.push(ouvrage[key].code)
          codeDepart ={...codeDepart,[ouvrage[key].numdepart]:code}
          code=[]
        }
       }else {
        code.push(ouvrage[key].code)
          codeDepart ={...codeDepart,[ouvrage[key].numdepart]:code}
          code=[]
       }
      })
    
       return codeDepart
  }
  public WhichPlanning = async (req, res) =>  {
    let ouvrage=req.params.ouvrage;
  
    const programRepo: any = getCustomRepository(programRepository)
    //const mydata = await programRepo.query(`select * from programme where '${ouvrage}' = any(code_ouvrage)`);
      const mydata = await programRepo.find({
        
        relations :["plan"],
        where :`'${ouvrage}' = any(code_ouvrage)`
       }) 
       console.log(mydata)
       return mydata
   
  };
  public WhichForm = async (req, res) =>  {
    let ouvrage=req.params.ouvrage;
    let ouvrageF =[]
  
    const visitRepo: any = getCustomRepository(visiteRepository)
    const entRepo: any = getCustomRepository(entretienRepository)
    const mainRepo: any = getCustomRepository(maintenanceRepository)

    const visiteForm = await visitRepo.find({     
     where :{code_ouvrage : ouvrage},
     }) 
     const entretienForm = await entRepo.find({     
      where :{code_ouvrage : ouvrage},
       }) 
      const maintenanceForm = await mainRepo.find({     
        where :{code_ouvrage : ouvrage},
        }) 
        if (maintenanceForm.length !=0)
        {
        maintenanceForm.map((data)=>{
          
            ouvrageF.push(data)
           
          }       
          )}else if (entretienForm.length !=0)
            {
          entretienForm.map((data)=>{
            
              ouvrageF.push(data)
               
            })
          }else if (visiteForm.length !=0)
              {
            visiteForm.map((data)=>{
              
                ouvrageF.push(data)
                
              }       
              )}
      //  console.log(mydata)
      //  return mydata
      return ouvrageF
  };

  public mapColoring = async (req, res) =>  {
    // let ouvrage=req.params.ouvrage;
    let CompareE =[]
    let CompareM =[]
    let CompareV =[]
    let ouvrage =[]

    let ouvrageV =[]   
    let ouvrageEnVisite ={}
    let ouvrageE=[]
    let ouvrageEnEntretien ={}
    let ouvrageM=[]
    let ouvrageEnMaintenance ={}
    
    const planRepo: any = getCustomRepository(planRepository)
    const visitRepo: any = getCustomRepository(visiteRepository)
    const entRepo: any = getCustomRepository(entretienRepository)
    const mainRepo: any = getCustomRepository(maintenanceRepository)

    const ent = await entRepo.find({ select:['code_ouvrage']})
    const main = await mainRepo.find({ select:['code_ouvrage']})


    ent.map((data)=>{
      CompareE.push(data.code_ouvrage)
     })
     main.map((data)=>{
      CompareM.push(data.code_ouvrage)
     })
    
  //les ouvrages en entretien
    const aEntretenir = await visitRepo.find({ 
       select:['code_ouvrage'],
      where :{action : "Entretien"},
      order:{id_form_visite:"ASC"} }) 

      aEntretenir.map((visite)=>{
        if (!CompareE.includes(visite.code_ouvrage))
        {
          ouvrageE.push(visite.code_ouvrage)
        }
        
       })
       // les ouvrages en maintenance
       const aMaintenir = await visitRepo.find({ 
        select:['code_ouvrage'],
       where :{action : "Maintenance"},
       order:{id_form_visite:"ASC"} }) 
 
       aMaintenir.map((visite)=>{
        if (!CompareM.includes(visite.code_ouvrage))
        {
          ouvrageM.push(visite.code_ouvrage)
        }       
        })
 
        const com = [...ent,...main].map((data)=>{
          CompareV.push(data.code_ouvrage)
         })
         
    //les ouvrages de visite
      const aVisiter = await planRepo.find({  
        relations :["program"],
        where :{Type_planning: "Visite"}
       }) 

       aVisiter.map((data)=>{
        data.program.map((pro)=>{          
          ouvrage.push(...pro.code_ouvrage)
         
         })
       })
       ouvrage.map((code)=>{
        if (!CompareV.includes(code))
        {
          ouvrageV.push(code)
        }       
        })
      
       ouvrageEnVisite={"Visite": ouvrageV}
      ouvrageEnEntretien = { "Entretien": ouvrageE}
      ouvrageEnMaintenance ={"Maintenance": ouvrageM}
       
       return [ouvrageEnVisite ,ouvrageEnEntretien,ouvrageEnMaintenance] 
   //[ouvrageEnVisite ,ouvrageEnEntretien,ouvrageEnMaintenance]
  //select :['code_ouvrage','nom_equipe_programme',],
}
}
//postman use
// "program" : 
//      {"0" :
//     {
//       "date_debut_programme" : "2022-08-01",
//        "date_fin_programme" : "2022-08-31",
//        "district": "district2",
//        "depart": "depart1",
//        "code_visite" : 1,
//        "nom_equipe_programme": "A",
//        "id_planning": 1,
//         "id_equipe" : 1
//    } ,


