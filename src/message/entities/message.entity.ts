import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { StatusEnum } from '../enums/status.enum';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'message_id' })
  messageId: string;

  @Column({ name: 'conversation_id' })
  conversationId: string;

  @Column({ type: 'enum', enum: StatusEnum })
  status: string;

  @Column({ type: 'datetime' })
  time: string;

  @Column({ nullable: true })
  from?: string;
}
