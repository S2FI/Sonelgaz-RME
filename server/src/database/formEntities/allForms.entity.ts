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
//   import { Role } from '../role/role.entity';
  @Entity('forms')
  @TableInheritance({ column: { type: "varchar", name: "type" } })
  export  class formEntity {
    @PrimaryGeneratedColumn()
    id_form: number;

    @Column({ type: 'varchar', nullable: true })
    ligne_depart: string;

    @Column({ type: 'varchar', nullable: true })
    created_user_form: string;

    @Column({ type: 'varchar', nullable: true })
    nomComplet_equipier: string;

    @Column({ type: 'time without time zone', nullable: true })
    heures_debut: Date;

    @Column({ type: 'time without time zone', nullable: true })
    heures_fin: Date;

    @Column({ type: 'double precision', nullable: true })
    longueur_visiter: number;

    @Column({ type: 'varchar', nullable: true })
    signature: string;

    @Column({ type: 'date', nullable: true })
    date_procedure: Date;

    @CreateDateColumn({ name: 'date_creation' })
    date_creation: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
  }
  
  

  

  