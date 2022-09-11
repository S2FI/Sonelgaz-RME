import {EntityRepository, Repository} from "typeorm";
import { trackEntity } from "../database/entities/track.entity";
import { userEntity } from "../database/entities/user.entity";


@EntityRepository(userEntity)
export class userRepository extends Repository<userEntity>{
    
}
@EntityRepository(trackEntity)
export class trackRepository extends Repository<trackEntity>{
    
}