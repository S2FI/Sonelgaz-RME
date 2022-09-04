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
@ChildEntity('form_visite')
  export class visiteEntity extends formEntity{
    @Column( {type: 'integer' , nullable : true})
    id_form_visite: number;

    @Column({ type: 'varchar', nullable: true })
    description: string;
    
    @Column({ type: 'varchar', nullable: true })
    action: string;
  
  }