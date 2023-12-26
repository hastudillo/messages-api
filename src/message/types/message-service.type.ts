import { AttachmentMessageService } from '../attachment-message/attachment-message.service';
import { LocationMessageService } from '../location-message/location-message.service';
import { TemplateMessageService } from '../text-message/template-message.service';
import { TextMessageService } from '../text-message/text-message.service';

export type MessageService =
  | AttachmentMessageService
  | LocationMessageService
  | TextMessageService
  | TemplateMessageService;
