import {EntityRepository, Repository} from "typeorm";
import { userEntity } from "../database/entities/user.entity";
import { entretienEntity } from "../database/formEntities/entretien.entity";
import { maintenanceEntity } from "../database/formEntities/maintenance.entitiy";
import { visiteEntity } from "../database/formEntities/visite.entity";


@EntityRepository(visiteEntity)
export class visiteRepository extends Repository<visiteEntity>{
    
}

@EntityRepository(maintenanceEntity)
export class maintenanceRepository extends Repository<maintenanceEntity>{
    
}

@EntityRepository(entretienEntity)
export class entretienRepository extends Repository<entretienEntity>{
    
}

