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


@ChildEntity('form_entretien')
  export class entretienEntity extends formEntity{
    @Column( {type: 'integer' , nullable : true})
    id_form_entretien: number;
    
    @Column({ type: 'numeric', nullable: true})
    nbr_support_portee: number;

    @Column({ type: 'numeric', nullable: true})
    nbr_isolateur_casse: number;

    @Column({ type: 'varchar', nullable: true })
    fil_fer_degager: string;

    @Column({ type: 'varchar', nullable: true })
    conducteur_ebreche: string;

    @Column({ type: 'varchar', nullable: true })
    pont_detache: string;

    @Column({ type: 'varchar', nullable: true })
    portee_dereglee: string;

    @Column({ type: 'varchar', nullable: true })
    support_incline: string;

    @Column({ type: 'varchar', nullable: true })
    elegage: string;

    @Column({ type: 'varchar', nullable: true })
    armements: string;

    @Column({ type: 'varchar', nullable: true })
    nid_cigogne_oiseau : string;

    @Column({ type: 'varchar', nullable: true })
    observation: string;
  
  }