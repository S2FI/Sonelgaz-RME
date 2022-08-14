import { programmeEntity } from './../planningEntities/program.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
  } from 'typeorm';
import { userEntity } from './user.entity';
//   import { Role } from '../role/role.entity';
  @Entity('equipe')
  export class equipeEntity {
    @PrimaryGeneratedColumn()
    id_equipe: number;
    @Column({ type: 'varchar', nullable: false, unique: true })
    nom_equipe: string;
    @Column({ type: 'varchar', nullable: false })
    chef_equipe: string;
    @Column({ type: 'varchar', nullable: true })
    type_equipe: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @OneToMany(()=> programmeEntity, programme => programme.equip)
    program : programmeEntity[]

    @OneToMany(()=> userEntity, user => user.equip)
    Employer : userEntity[]

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
  