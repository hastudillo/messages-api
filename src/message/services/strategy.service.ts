import { Injectable } from '@nestjs/common';

import { AttachmentMessageService } from '../attachment-message/attachment-message.service';
import { MessageType, MessageTypeEnum } from '../enums/message-type.enum';
import { LocationMessageService } from '../location-message/location-message.service';
import { TemplateMessageService } from '../text-message/template-message.service';
import { TextMessageService } from '../text-message/text-message.service';
import { MessageService } from '../types/message-service.type';

@Injectable()
export class StrategyService {
  services: Record<MessageType, MessageService> = {
    [MessageTypeEnum.attachment]: this.attachmentMessageService,
    [MessageTypeEnum.location]: this.locationMessageService,
    [MessageTypeEnum.text]: this.textMessageService,
    [MessageTypeEnum.template]: this.templateMessageService,
  };

  constructor(
    private readonly attachmentMessageService: AttachmentMessageService,
    private readonly locationMessageService: LocationMessageService,
    private readonly textMessageService: TextMessageService,
    private readonly templateMessageService: TemplateMessageService,
  ) {}

  getStrategy(context: string): MessageService {
    return this.services[context];
  }
}
