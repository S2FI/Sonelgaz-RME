import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
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
    console.log(plan.identifiers[0].id_planning)

    
    let fullPlanning =[]
    Object.keys(program).forEach(function(key, index) {
      program[key].id_planning = id;
      fullPlanning.push(program[key])
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


}












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
// //         "0" :
//   //   {
//   //     "date_debut_programme" : "2022-08-01",
//   //      "date_fin_programme" : "2022-08-31",
//   //      "district": "district2",
//   //      "depart": "depart1",
//   //      "code_visite" : 1,
//   //      "nom_equipe_programme": "A",
//   //      "id_planning": 1,
//   //       "id_equipe" : 1
//   //  } ,
//   //      "1" :
//   //  {
//   //      "date_debut_programme" : "2022-08-01",
//   //      "date_fin_programme" : "2022-08-31",
//   //      "district": "district1", 
//   //      "nom_equipe_programme": "B",
//   //      "code_ouvrage": 123,
//   //      "code_programme": 1,
//   //      "depart": "depart2",
//   //      "id_planning": 1,
//   //       "id_equipe" : 1
//   //  }
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


