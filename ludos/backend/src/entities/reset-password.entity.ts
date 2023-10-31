import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('password-resets')
export class ResetPassword {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column()
  timestamp: Date;
}
