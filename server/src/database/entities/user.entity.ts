import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { equipeEntity } from './equipe.entity';
//   import { Role } from '../role/role.entity';
  @Entity('user')
  export class userEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;
    // we need to add a default password and get it form the .env file
    @Column({ type: 'varchar', nullable: false })
    password: string;
    @Column({ type: 'varchar', nullable: true, default: 'User' })
    role: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @ManyToOne(()=> equipeEntity, equipe => equipe.Employer)
    @JoinColumn ({})
    equip: equipeEntity

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
  