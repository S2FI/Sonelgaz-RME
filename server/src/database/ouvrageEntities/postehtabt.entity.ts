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
  @Entity('postehtabt')
  export class postehtabtEntity {
    @PrimaryGeneratedColumn()
    gid: number;

    @Column({ type: 'double precision', nullable: true})
    objectid: number;
 
    @Column({ type: 'character varying', length: 5, nullable: true })
    etat_s: string;

    @Column({ type: 'character varying', length: 20, nullable: true })
    code: string;

    @Column({ type: 'double precision', nullable: true})
    numpstcomp: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    tynd: string;

    @Column({ type: 'double precision', nullable: true})
    numpst: number;

    @Column({ type: 'character varying', length: 30, nullable: true })
    nompst: string;

    @Column({ type: 'character varying', length: 30, nullable: true })
    localite: string;

    @Column({ type: 'character varying', length: 2, nullable: true })
    foncpst: string;

    @Column({ type: 'character varying', length: 2, nullable: true })
    natpst: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    typrotect: string;

    @Column({ type: 'character varying', length: 1, nullable: true })
    modraccord: string;

    @Column({ type: 'double precision', nullable: true})
    nbtrans: number;

    @Column({ type: 'double precision', nullable: true})
    sectjb: number;

    @Column({ type: 'double precision', nullable: true})
    puissinst: number;

    @Column({ type: 'double precision', nullable: true})
    pmd: number;

    @Column({ type: 'character varying', length: 1, nullable: true })
    alimauto: string;

    @Column({ type: 'date', nullable: true })
    ancons: Date;

    @Column({ type: 'date', nullable: true })
    anmes: Date;

    @Column({ type: 'date', nullable: true })
    anmhs: Date;

    @Column({ type: 'character varying', length: 1, nullable: true })
    etat: string;

    @Column({ type: 'numeric', nullable: true })
    tensnom: number;

    @Column({ type: 'character varying', length: 50, nullable: true })
    numdepart: string;

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