import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
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
    const {Titre_planning , Type_planning,  user_created,code_visite, program} = req.body
    let equipe_id;
    try {
      const planRepo: any = getCustomRepository(planRepository)  
    await planRepo.update(urlId, { 
      Titre_planning: Titre_planning,
      Type_planning: Type_planning,
      user_created: user_created,
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
      //  console.log(codeDepart)
      //  Object.keys(codeDepart).forEach(async (key, index) => {
      //   console.log(index +" : "+key)
      //  })
       return codeDepart
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




// public createProgram = async (req, res) =>  {
//     const planning = req.body
//     let fullPlanning =[]
//     Object.keys(planning).forEach(function(key, index) {

//       fullPlanning.push(planning[key])
//     });
// //     const equipeRepo: any = getCustomRepository(equipeRepository)
// //    const equipe_id= await equipeRepo.find({
// //     select : ["id_equipe"],
// //     where : {nom_equipe : nom_equipe_programme}
// // })
// //   const data = { 
  //       "0" :
  //   {
  //     "date_debut_programme" : "2022-08-01",
  //      "date_fin_programme" : "2022-08-31",
  //      "district": "district2",
  //      "depart": "depart1",
  //      "code_visite" : 1,
  //      "nom_equipe_programme": "A",
  //      "id_planning": 1,
  //       "id_equipe" : 1
  //  } ,
  //      "1" :
  //  {
  //      "date_debut_programme" : "2022-08-01",
  //      "date_fin_programme" : "2022-08-31",
  //      "district": "district1", 
  //      "nom_equipe_programme": "B",
  //      "code_ouvrage": 123,
  //      "code_programme": 1,
  //      "depart": "depart2",
  //      "id_planning": 1,
  //       "id_equipe" : 1
  //  }
// //        }     

// //        console.log(data[0])
//     try {
//     const customRepo: any = getCustomRepository(programRepository)
//      await customRepo.insert( fullPlanning)
//     return res.status(203).json({
//       success: true,
//       message: "succefully inserted into program",
//     });
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({
//       error: error.message,
//     });
//   }
//   }


