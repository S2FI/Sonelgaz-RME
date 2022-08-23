import { Service } from "typedi";
import { getCustomRepository } from "typeorm";
import { visiteRepository } from "../repository/forms.reposoitry";


@Service()
export class FormService {
  constructor() {}
  public createFormVisite = async (req, res) =>  {
    const {code_ouvrage, description} = req.body
    try {
    const visitRepo: any = getCustomRepository(visiteRepository)
    const visit = await visitRepo.insert(
      { 
        code_ouvrage:code_ouvrage,
        description: description,
        ligne_depart:"70H170H6"
    }
    )
    console.log(visit)
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
}