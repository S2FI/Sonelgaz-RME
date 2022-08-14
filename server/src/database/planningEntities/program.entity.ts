import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { equipeEntity } from '../entities/equipe.entity';
import { liaisonEntity } from '../ouvrageEntities/liaison.entity';
import { planningEntity } from './planning.entity';
//   import { Role } from '../role/role.entity';
  @Entity('programme')
  export class programmeEntity {
    @PrimaryGeneratedColumn()
    id_programme: number;

    @Column({ type: 'date' , nullable: false })
    date_debut_programme: Date;

    @Column({ type: 'date' , nullable: false })
    date_fin_programme: Date;
    
    @Column({ type: 'varchar', nullable: true })
    district: string;
    
    @Column({ type: 'varchar', nullable: true })
    depart: string;

    @Column({ type: 'varchar', nullable: true })
    code_ouvrage: string;

    @Column({ type: 'integer', nullable: true })
    code_programme: number;

    @Column({ type: 'integer', nullable: true })
    code_visite: number;
 
    @Column({ type: 'varchar', nullable: true })
    nom_equipe_programme: string;

    @CreateDateColumn({ name: 'date_programme' })
    date_programme: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  

    @Column({type : 'int', nullable: false })
    id_planning: number;
    @ManyToOne(()=> planningEntity, planning => planning.program , {cascade : true , onDelete: 'CASCADE'})
    @JoinColumn ({name: "id_planning"})
    plan: planningEntity

    @Column({type : 'int', nullable: true })
    id_equipe: number;
    @ManyToOne(()=> equipeEntity, equipe => equipe.program)
    @JoinColumn ({name: "id_equipe"})
    equip: equipeEntity
    
    // //Many-to-many relation with role
    // @ManyToMany(() => liaisonEntity)
    // @JoinTable()
    // liaisons: liaisonEntity[]
  }
  