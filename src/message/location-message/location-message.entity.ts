import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from '../entities/message.entity';

@Entity()
export class LocationMessage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => Message, { cascade: true })
  @JoinColumn()
  baseMessage: Message;

  @Column()
  name: string;

  @Column()
  lat: number;

  @Column()
  long: number;
}
