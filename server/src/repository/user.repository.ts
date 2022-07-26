import {EntityRepository, Repository} from "typeorm";
import { userEntity } from "../database/entities/user.entity";


@EntityRepository(userEntity)
export class userRepository extends Repository<userEntity>{
    
}