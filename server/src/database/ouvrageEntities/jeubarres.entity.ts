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
  @Entity('jeubarres')
  export class jeubarresEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
    // we need to add a default password and get it form the .env file
    @Column({ type: 'character varying', length: 5 , nullable: true })
    etat_s: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    typstcomp: string;

    @Column({ type: 'double precision', nullable: true })
    numpst: number;

    @Column({ type: 'date', nullable: true })
    anmes: Date;

    @Column({ type: 'date', nullable: true })
    anmhs: Date;

    @Column({ type: 'character varying', length: 1, nullable: true })
    etat: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    tynd: string;

    @Column({ type: 'double precision', nullable: true })
    numnd: number;

    @Column({ type: 'date', nullable: true })
    anfab: Date;
    
    @Column({ type: 'double precision', nullable: true })
    intensnom: number;
   
    @Column({ type: 'double precision', nullable: true })
    section: number;

    @Column({ type: 'double precision', nullable: true })
    codcons: number;

    @Column({ type: 'character varying', length: 2, nullable: true })
    naturejb: string;

    @Column({ type: 'character varying', length: 20, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true })
    symbole: number;

    @Column({ type: 'numeric', nullable: true })
    tensnom: number;

    @Column({ type: 'numeric', nullable: true })
    tenscons: number;

    @Column({ type: 'numeric', nullable: true })
    courantcou: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    numdepart: string;

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
    // @JoinTable({
    //   name: 'users_roles',
    //   joinColumn: { name: 'userId', referencedColumnName: 'id' },
    //   inverseJoinColumn: { name: 'roleId' },
    // })
    // roles: Role[];
  }