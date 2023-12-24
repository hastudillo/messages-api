import {
  AttachmentMessageDto,
  ReturnedAttachmentMessageDto,
} from '../dtos/attachment-message.dto';
import {
  LocationMessageDto,
  ReturnedLocationMessageDto,
} from '../dtos/location-message.dto';
import {
  ReturnedTextMessageDto,
  TextMessageDto,
} from '../dtos/text-message.dto';

export type IncomingMessage =
  | AttachmentMessageDto
  | LocationMessageDto
  | TextMessageDto;

export type ReturnedIncomingMessage =
  | ReturnedAttachmentMessageDto
  | ReturnedLocationMessageDto
  | ReturnedTextMessageDto;
