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
  @Entity('postesource')
  export class postesourceEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
 
    @Column({ type: 'character varying', length: 5, nullable: true })
    etat_s: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    typstcomp: string;

    @Column({ type: 'double precision', nullable: true})
    numpst: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    nompst: string;

    @Column({ type: 'character varying', length: 50, nullable: true })
    typst: string;

    @Column({ type: 'double precision', nullable: true})
    nbtrans: number;

    @Column({ type: 'double precision', nullable: true})
    tensnom: number;

    @Column({ type: 'double precision', nullable: true})
    puisstrans: number;

    @Column({ type: 'double precision', nullable: true})
    puisstra_1: number;

    @Column({ type: 'double precision', nullable: true})
    puisstra_2: number;

    @Column({ type: 'double precision', nullable: true})
    puisscc: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    telecom: string;

    @Column({ type: 'date', nullable: true })
    ancons: Date;

    @Column({ type: 'date', nullable: true })
    anmes: Date;

    @Column({ type: 'date', nullable: true })
    anmhs: Date;

    @Column({ type: 'character varying', length: 50, nullable: true })
    etat: string;

    @Column({ type: 'character varying', length: 50, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true})
    symbole: number;

    @Column({ type: 'double precision', nullable: true})
    puisstra_3: number;

    @Column({ type: 'character varying', length: 3, nullable: true })
    codegrte: string;

    @Column({ type: 'numeric', nullable: true })
    tensnom1: number;

    @Column({ type: 'numeric', nullable: true })
    tensnom2: number;

    @Column({ type: 'numeric', nullable: true })
    tensnom3: number;

    @Column({ type: 'double precision', nullable: true})
    codecom: number;

    @Column({ type: 'numeric', nullable: true })
    st_area_sh: number;

    @Column({ type: 'numeric', nullable: true })
    st_length_: number;

    @Column({ type: 'numeric', nullable: true })
    shape_leng: number;

    @Column({ type: 'numeric', nullable: true })
    shape_area: number;

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