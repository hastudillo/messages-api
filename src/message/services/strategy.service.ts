import { Injectable } from '@nestjs/common';

import { MessageType, MessageTypeEnum } from '../enums/message-type.enum';
import { TextMessageService } from '../text-message/text-message.service';
import { MessageService } from '../types/message-service.type';

@Injectable()
export class StrategyService {
  // TODO:
  services: Record<MessageType, MessageService> = {
    [MessageTypeEnum.attachment]: this.textMessageService,
    [MessageTypeEnum.location]: this.textMessageService,
    [MessageTypeEnum.text]: this.textMessageService,
    [MessageTypeEnum.template]: this.textMessageService,
  };

  constructor(
    // private readonly attachmentMessageService: AttachmentMessageService,
    // private readonly locationMessageService: LocationMessageService,
    private readonly textMessageService: TextMessageService,
    // private readonly templateMessageService: TemplateMessageService,
  ) {}

  getStrategy(context: string): MessageService {
    return this.services[context];
  }
}
