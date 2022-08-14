import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    ChildEntity,
    TableInheritance,
  } from 'typeorm';
import { formEntity } from './allForms.entity';
@ChildEntity('form_maintenance')
  export class maintenanceEntity extends formEntity{
    @Column( {type: 'integer' , nullable : true})
    id_form_maintenance: number;
    
    @Column({ type: 'varchar', nullable: true})
    emplacement: string;

    @Column({ type: 'varchar', nullable: true })
    raison_de_panne: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;
  
  }