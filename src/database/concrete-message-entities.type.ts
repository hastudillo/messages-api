import { AttachmentMessage } from '../message/attachment-message/attachment-message.entity';
import { LocationMessage } from '../message/location-message/location-message.entity';
import { TextMessage } from '../message/text-message/text-message.entity';

export type ConcreteMessageEntities =
  | AttachmentMessage
  | LocationMessage
  | TextMessage;
