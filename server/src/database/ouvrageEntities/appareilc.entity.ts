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
  @Entity('appareilc')
  export class appareilcEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
 
    @Column({ type: 'character varying', length: 254, nullable: true })
    symb: string;

    @Column({ type: 'character varying', length: 5, nullable: true })
    etat_s: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    typstcomp: string;

    @Column({ type: 'double precision', nullable: true })
    numpstcomp: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    tynd: string;

    @Column({ type: 'double precision', nullable: true })
    numnd: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    tycompos: string;

    @Column({ type: 'double precision', nullable: true })
    numcompos: number;

    @Column({ type: 'double precision', nullable: true })
    intensnom: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    modact: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    fonct: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    pos: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    appasserv: string;
    
    @Column({ type: 'character varying', length: 1, nullable: true })
    natdiel: string;

    @Column({ type: 'double precision', nullable: true })
    alimaux: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    telecom: string;

    @Column({ type: 'character varying', length: 15, nullable: true })
    commande: string;
  
    @Column({ type: 'date', nullable: true })
    anfab: Date;

    @Column({ type: 'date', nullable: true })
    anmes: Date;

    @Column({ type: 'date', nullable: true })
    anmhs: Date;

    @Column({ type: 'character varying', length: 1, nullable: true })
    etat: string;
    
    @Column({ type: 'character varying', length: 20, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true })
    symbole: number;

    @Column({ type: 'character varying', length: 12, nullable: true })
    numseri: string;
    
    @Column({ type: 'numeric', nullable: true })
    tensnom: number;

    @Column({ type: 'numeric', nullable: true })
    tenscons: number;

    @Column({ type: 'numeric', nullable: true })
    pouvcoup: number;

    @Column({ type: 'numeric', nullable: true })
    pouvferm: number;

    @Column({ type: 'double precision', nullable: true })
    codconst: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    numdepart: string;

    @Column({ type: 'character varying', length: 50, nullable: true })
    nom_depart: string;

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