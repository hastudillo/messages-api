import { AttachmentMessageDto } from '../dtos/attachment-message.dto';
import { LocationMessageDto } from '../dtos/location-message.dto';
import { TemplateMessageDto } from '../dtos/template-message.dto';
import { TextMessageDto } from '../dtos/text-message.dto';

export type OutgoingMessage =
  | TemplateMessageDto
  | AttachmentMessageDto
  | LocationMessageDto
  | TextMessageDto;

export type ReturnedOutgoingMessage = { id: string } & OutgoingMessage;
