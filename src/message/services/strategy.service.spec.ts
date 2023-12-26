import { Test, TestingModule } from '@nestjs/testing';

import { AttachmentMessageService } from '../attachment-message/attachment-message.service';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { LocationMessageService } from '../location-message/location-message.service';
import { TemplateMessageService } from '../text-message/template-message.service';
import { TextMessageService } from '../text-message/text-message.service';
import { StrategyService } from './strategy.service';

class AttachmentMessageServiceMock {
  type: MessageTypeEnum.attachment;
}
class LocationMessageServiceMock {
  type: MessageTypeEnum.location;
}
class TextMessageServiceMock {
  type: MessageTypeEnum.text;
}
class TemplateMessageServiceMock {
  type: MessageTypeEnum.template;
}

describe('StrategyService', () => {
  let service: StrategyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        StrategyService,
        {
          provide: AttachmentMessageService,
          useClass: AttachmentMessageServiceMock,
        },
        {
          provide: LocationMessageService,
          useClass: LocationMessageServiceMock,
        },
        {
          provide: TextMessageService,
          useClass: TextMessageServiceMock,
        },
        {
          provide: TemplateMessageService,
          useClass: TemplateMessageServiceMock,
        },
      ],
    }).compile();

    service = app.get<StrategyService>(StrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStrategy', () => {
    it('should return a service depending on the context: attachment', () => {
      const result = service.getStrategy(MessageTypeEnum.attachment);
      expect(result).toBeInstanceOf(AttachmentMessageServiceMock);
    });

    it('should return a service depending on the context: location', () => {
      const result = service.getStrategy(MessageTypeEnum.location);
      expect(result).toBeInstanceOf(LocationMessageServiceMock);
    });

    it('should return a service depending on the context: text', () => {
      const result = service.getStrategy(MessageTypeEnum.text);
      expect(result).toBeInstanceOf(TextMessageServiceMock);
    });

    it('should return a service depending on the context: template', () => {
      const result = service.getStrategy(MessageTypeEnum.template);
      expect(result).toBeInstanceOf(TemplateMessageServiceMock);
    });
  });
});
