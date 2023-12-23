import { AttachmentMessageDto } from '../dtos/attachment-message.dto';
import { LocationMessageDto } from '../dtos/location-message.dto';
import { TextMessageDto } from '../dtos/text-message.dto';

export type IncomingMessage =
  | AttachmentMessageDto
  | LocationMessageDto
  | TextMessageDto;

export type ReturnedIncomingMessage = { id: string } & IncomingMessage;
