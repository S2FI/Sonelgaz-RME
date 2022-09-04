import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
    ChildEntity,
    TableInheritance,
  } from 'typeorm';
//   import { Role } from '../role/role.entity';
  @Entity('forms')
  @TableInheritance({ column: { type: "varchar", name: "type" } })
  export  class formEntity {
    @PrimaryGeneratedColumn()
    id_form: number;
    @Column({ type: 'varchar', nullable: true})
    titre_formulaire: string;

    @Column({ type: 'varchar', nullable: true})
    code_ouvrage: string;

    @Column({ type: 'varchar', nullable: true })
    created_user_form: string;

    @Column({ type: 'varchar', nullable: true })
    signature: string;

    @CreateDateColumn({ name: 'date_procedure' })
    date_procedure: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  
  }
  
  

  

  