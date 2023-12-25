import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Message } from '../entities/message.entity';

@Entity()
export class TextMessage {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @OneToOne(() => Message, { cascade: true })
  @JoinColumn()
  baseMessage: Message;

  @Column({ type: 'text' })
  text: string;
}
