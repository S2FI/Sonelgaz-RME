import { programmeEntity } from './program.entity';
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
//   import { Role } from '../role/role.entity';
  @Entity('planning')
  export class planningEntity {
    @PrimaryGeneratedColumn()
    id_planning: number;
    @Column({ type: 'varchar', nullable: true })
    Titre_planning: string;
    
    @Column({ type: 'varchar', nullable: true })
    Type_planning: string;
    @Column({ type: 'varchar', nullable: true })
    user_created: string;
  
    @Column({ type: 'varchar', nullable: true })
    code_visite: string;

    @CreateDateColumn({ name: 'date_planning' })
    date_planning: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
    @OneToMany(()=> programmeEntity, programme => programme.plan )
    program : programmeEntity[]

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
  