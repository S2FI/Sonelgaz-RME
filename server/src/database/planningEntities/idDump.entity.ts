import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from 'typeorm';
//   import { Role } from '../role/role.entity';
  @Entity('dump')
  export class dumpEntity {
    @PrimaryGeneratedColumn()
    id_dumped: number;
    @Column({ type: 'integer', nullable: false, unique: true })
    dumped_plan: number;
    @Column({ type: 'varchar', nullable: true, default:"inconnu" })
    title_dumped: string;

  }
  