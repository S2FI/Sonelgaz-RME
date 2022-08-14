import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
//   import { Role } from '../role/role.entity';
  @Entity('accesssoire')
  export class accesssoireEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
    // we need to add a default password and get it form the .env file
    @Column({ type: 'character varying' , length: 5, nullable: true })
    etat_s: string;

    @Column({ type: 'double precision', nullable: true })
    coddist: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    tynd: string;

    @Column({ type: 'double precision', nullable: true })
    numtransfo: number;

    @Column({ type: 'double precision', nullable: true })
    codconst: number;

    @Column({ type: 'date', nullable: true })
    datefab: Date;

    @Column({ type: 'date', nullable: true })
    datemes: Date;

    @Column({ type: 'date', nullable: true })
    datemhs: Date;

    @Column({ type: 'character varying', length: 1, nullable: true })
    etat: string;

    @Column({ type: 'character varying', length: 10, nullable: true })
    natboite: string;
    
    @Column({ type: 'character varying', length: 10, nullable: true })
    reference: string;
    
    @Column({ type: 'double precision', nullable: true })
    tyjonction: number;
    
    @Column({ type: 'character varying', length: 20, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true })
    symbole: number;

    @Column({ type: 'double precision', nullable: true })
    codecom: number;

    @Column({ type: 'numeric', nullable: true })
    longemerg: number;


    @Column({ type: 'character varying'  , length: 50, nullable: true })
    numdepart: string;

    @Column({ type: 'geometry', nullable: true })
    geom: object;


    // //Many-to-many relation with role
    // @ManyToMany((type) => Role, {
    //   cascade: true,
    // })
    // @JoinTable({
    //   name: 'users_roles',
    //   joinColumn: { name: 'userId', referencedColumnName: 'id' },
    //   inverseJoinColumn: { name: 'roleId' },
    // })
    // roles: Role[];
  }