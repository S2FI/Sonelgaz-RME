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
  @Entity('planning')
  export class planningEntity {
    @PrimaryGeneratedColumn()
    id_planning: number;
    @Column({ type: 'varchar', nullable: false })
    Titre_planning: string;
    // we need to add a default password and get it form the .env file
    @Column({ type: 'varchar', nullable: true })
    Type_planning: string;
    @Column({ type: 'varchar', nullable: true })
    user_created: string;

    @CreateDateColumn({ name: 'date_planning' })
    date_planning: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  

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
  