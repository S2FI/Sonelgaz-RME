import {EntityRepository, Repository} from "typeorm";
import { accesssoireEntity } from "../database/ouvrageEntities/accesssoire.entity";
import { appareilcEntity } from "../database/ouvrageEntities/appareilc.entity";
import { jeubarresEntity } from "../database/ouvrageEntities/jeubarres.entity";
import { liaisonEntity } from "../database/ouvrageEntities/liaison.entity";
import { postehtabtEntity } from "../database/ouvrageEntities/postehtabt.entity";
import { postesourceEntity } from "../database/ouvrageEntities/postesource.entity";


@EntityRepository(jeubarresEntity)
export class jeubarresRepository extends Repository<jeubarresEntity>{
    
}

@EntityRepository(liaisonEntity)
export class liaisonRepository extends Repository<liaisonEntity>{
    
}

@EntityRepository(accesssoireEntity)
export class accesssoireRepository extends Repository<accesssoireEntity>{
    
}

@EntityRepository(appareilcEntity)
export class appareilcRepository extends Repository<appareilcEntity>{
    
}

@EntityRepository(postehtabtEntity)
export class postehtabtRepository extends Repository<postehtabtEntity>{
    
}

@EntityRepository(postesourceEntity)
export class postesourceRepository extends Repository<postesourceEntity>{
    
}