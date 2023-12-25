import { Test, TestingModule } from '@nestjs/testing';

import { MessageTypeEnum } from '../enums/message-type.enum';
import { TextMessageService } from '../text-message/text-message.service';
import { StrategyService } from './strategy.service';

// TODO:
class TextMessageServiceMock {
  type: MessageTypeEnum.text;
}

describe('StrategyService', () => {
  let service: StrategyService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        StrategyService,
        {
          provide: TextMessageService,
          useClass: TextMessageServiceMock,
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
      expect(result).toBeInstanceOf(TextMessageServiceMock);
    });

    it('should return a service depending on the context: location', () => {
      const result = service.getStrategy(MessageTypeEnum.location);
      expect(result).toBeInstanceOf(TextMessageServiceMock);
    });

    it('should return a service depending on the context: text', () => {
      const result = service.getStrategy(MessageTypeEnum.text);
      expect(result).toBeInstanceOf(TextMessageServiceMock);
    });

    it('should return a service depending on the context: template', () => {
      const result = service.getStrategy(MessageTypeEnum.template);
      expect(result).toBeInstanceOf(TextMessageServiceMock);
    });
  });
});
