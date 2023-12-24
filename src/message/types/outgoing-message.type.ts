import {
  AttachmentMessageDto,
  ReturnedAttachmentMessageDto,
} from '../dtos/attachment-message.dto';
import {
  LocationMessageDto,
  ReturnedLocationMessageDto,
} from '../dtos/location-message.dto';
import {
  ReturnedTemplateMessageDto,
  TemplateMessageDto,
} from '../dtos/template-message.dto';
import {
  ReturnedTextMessageDto,
  TextMessageDto,
} from '../dtos/text-message.dto';

export type OutgoingMessage =
  | TemplateMessageDto
  | AttachmentMessageDto
  | LocationMessageDto
  | TextMessageDto;

export type ReturnedOutgoingMessage =
  | ReturnedTemplateMessageDto
  | ReturnedAttachmentMessageDto
  | ReturnedLocationMessageDto
  | ReturnedTextMessageDto;
