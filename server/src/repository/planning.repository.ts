import {EntityRepository, Repository} from "typeorm";
import { equipeEntity } from "../database/entities/equipe.entity";
import { planningEntity } from "../database/planningEntities/planning.entity";
import { programmeEntity } from "../database/planningEntities/program.entity";



@EntityRepository(planningEntity)
export class planRepository extends Repository<planningEntity>{
    
}

@EntityRepository(programmeEntity)
export class programRepository extends Repository<programmeEntity>{
    
}
@EntityRepository(equipeEntity)
export class equipeRepository extends Repository<equipeEntity>{
    
}