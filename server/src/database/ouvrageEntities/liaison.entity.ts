import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
  } from 'typeorm';
//   import { Role } from '../role/role.entity';
  @Entity('liaison')
  export class liaisonEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
 
    @Column({ type: 'character varying', length: 254, nullable: true })
    symb: string;

    @Column({ type: 'character varying', length: 5, nullable: true })
    etat_s: string;

    @Column({ type: 'character varying', length: 8, nullable: true })
    codend1: string;

    @Column({ type: 'date', nullable: true })
    anmes: Date;

    @Column({ type: 'date', nullable: true })
    anmhs: Date;

    @Column({ type: 'character varying', length: 1, nullable: true })
    etat: string;

    @Column({ type: 'double precision', nullable: true})
    numbornend: number;

    @Column({ type: 'double precision', nullable: true})
    codeconst: number;

    @Column({ type: 'character varying', length: 8, nullable: true })
    codend2: string;

    @Column({ type: 'double precision', nullable: true})
    numborne_1: number;

    @Column({ type: 'double precision', nullable: true})
    numarcseg: number;

    @Column({ type: 'double precision', nullable: true})
    numarcpara: number;

    @Column({ type: 'double precision', nullable: true})
    longeurarc: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    posecable: string;

    @Column({ type: 'character varying', length: 4, nullable: true })
    structcond: string;

    @Column({ type: 'character varying', length: 2, nullable: true })
    naturecond: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    naturearc: string;

    @Column({ type: 'character varying', length: 20, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true })
    symbole: number;

    @Column({ type: 'numeric', nullable: true })
    tensnom: number;

    @Column({ type: 'numeric', nullable: true })
    tensconst: number;

    @Column({ type: 'numeric', nullable: true })
    sectarc: number;

    @Column({ type: 'double precision', nullable: true })
    coddist: number;

    @Column({ type: 'character varying', length: 3, nullable: true })
    typisolant: string;

    @Column({ type: 'character varying', length: 50, nullable: true })
    numdepart: string;

    @Column({ type: 'double precision', nullable: true })
    troncon: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    code2: string;

    @Column({ type: 'numeric', nullable: true })
    longueur_s: number;

    @Column({ type: 'numeric', nullable: true })
    st_length_: number;

    @Column({ type: 'numeric', nullable: true })
    shape_leng: number;

    @Column({ type: 'geometry', nullable: true })
    geom: object;


    // //Many-to-many relation with role
    // @ManyToMany((type) => Role, {
    //   cascade: true,
    // })
    // @Jonumericable({
    //   name: 'users_roles',
    //   joinColumn: { name: 'userId', referencedColumnName: 'id' },
    //   inverseJoinColumn: { name: 'roleId' },
    // })
    // roles: Role[];
  }