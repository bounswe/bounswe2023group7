import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @Index()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordBeforeInsertAndUpdate() {
    if (this.password) {
      this.password = await this.getEncryptedPassword(this.password);
    }
  }

  async getEncryptedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compareEncryptedPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
