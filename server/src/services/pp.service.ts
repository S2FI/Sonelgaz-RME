import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { liaisonRepository } from "../repository/ouvrage.repository";
import { equipeRepository, planRepository, programRepository } from "../repository/planning.repository";


@Service()
export class PPService {
  constructor() {}

  public createPlanning = async (req, res) =>  {
    const {Titre_planning , Type_planning,  user_created, program} = req.body
    try {
    const planRepo: any = getCustomRepository(planRepository)
    const plan =await planRepo.insert(
      { Titre_planning: Titre_planning,
        Type_planning: Type_planning,
        user_created: user_created,
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


public  updatePlanning = async (req, res) =>  { 

    // console.log("my update id:",req.params.id)
    const urlId = req.params.id
    const {Titre_planning , Type_planning,  user_created, program} = req.body
    const program_keys = {}
    try {
      const planRepo: any = getCustomRepository(planRepository)  
    await planRepo.update(urlId, { 
      Titre_planning: Titre_planning,
      Type_planning: Type_planning,
      user_created: user_created,
         })

         const programRepo: any = getCustomRepository(programRepository)
       const listIdProgram= await programRepo.find({
        select:["id_programme"],
        where: { id_planning: urlId },
        order: { id_programme : "ASC"}
       })

       
      
      //  console.log("my programs ids : ",listIdProgram[0].id_programme)
      Object.keys(listIdProgram).forEach(async (key, index) => {
        
       if( Object.keys(program[index]).length != 0) {
        // console.log(program[index])
        //  console.log(key)
        //  console.log(listIdProgram[key])
      await programRepo.update(listIdProgram[key].id_programme, {
      date_debut_programme :program[index].date_debut_programme ,
      date_fin_programme : program[index].date_fin_programme,
      district: program[index].district ,
      depart:program[index].depart ,
      code_ouvrage: program[index].code_ouvrage,
      nom_equipe_programme:program[index].nom_equipe_programme ,
    })
  }  
    })

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


