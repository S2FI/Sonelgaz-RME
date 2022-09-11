import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
//   import { Role } from '../role/role.entity';
  @Entity('track')
  export class trackEntity {
    @PrimaryGeneratedColumn()
    id_track: number;
    @Column({ type: 'varchar', nullable: true })
    tracked_user: string;
    @Column({ type: 'varchar', nullable: true })
    user_role: string;
    @Column({ type: 'varchar', nullable: true })
    action_tracked: string;
    @Column({ type: 'varchar', nullable: true })
    ip_address: string;
    @Column({ type: 'integer', nullable: true })
    id_user: number;
    @CreateDateColumn({ name: 'date_tracked' })
    date_tracked: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
  }
  