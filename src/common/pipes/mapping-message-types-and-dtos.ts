import { AttachmentMessageDto } from '../../message/dtos/attachment-message.dto';
import { LocationMessageDto } from '../../message/dtos/location-message.dto';
import { TemplateMessageDto } from '../../message/dtos/template-message.dto';
import { TextMessageDto } from '../../message/dtos/text-message.dto';
import {
  MessageType,
  MessageTypeEnum,
} from '../../message/enums/message-type.enum';

export type TypesIncomingDtosType = Record<
  Exclude<MessageType, 'template'>,
  | typeof AttachmentMessageDto
  | typeof LocationMessageDto
  | typeof TextMessageDto
>;

export const allowedTypesForIncomingDtos: TypesIncomingDtosType = {
  [MessageTypeEnum.attachment]: AttachmentMessageDto,
  [MessageTypeEnum.location]: LocationMessageDto,
  [MessageTypeEnum.text]: TextMessageDto,
};

export type TypesOutgoingDtosType = Record<
  MessageType,
  | typeof AttachmentMessageDto
  | typeof LocationMessageDto
  | typeof TextMessageDto
  | typeof TemplateMessageDto
>;

export const allowedTypesForOutgoingDtos: TypesOutgoingDtosType = {
  [MessageTypeEnum.attachment]: AttachmentMessageDto,
  [MessageTypeEnum.location]: LocationMessageDto,
  [MessageTypeEnum.text]: TextMessageDto,
  [MessageTypeEnum.template]: TemplateMessageDto,
};
