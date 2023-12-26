import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  AttachmentMessageDto,
  ReturnedAttachmentMessageDto,
} from './dtos/attachment-message.dto';
import {
  LocationMessageDto,
  ReturnedLocationMessageDto,
} from './dtos/location-message.dto';
import {
  ReturnedTemplateMessageDto,
  TemplateMessageDto,
} from './dtos/template-message.dto';
import {
  ReturnedTextMessageDto,
  TextMessageDto,
} from './dtos/text-message.dto';
import { StrategyService } from './services/strategy.service';
import {
  IncomingMessage,
  ReturnedIncomingMessage,
} from './types/incoming-message.type';
import { MessageService } from './types/message-service.type';
import {
  OutgoingMessage,
  ReturnedOutgoingMessage,
} from './types/outgoing-message.type';

@ApiTags('messages')
@ApiExtraModels(
  TemplateMessageDto,
  AttachmentMessageDto,
  LocationMessageDto,
  TextMessageDto,
  ReturnedTemplateMessageDto,
  ReturnedAttachmentMessageDto,
  ReturnedLocationMessageDto,
  ReturnedTextMessageDto,
)
@Controller('messages')
export class MessageController {
  constructor(
    private readonly logger: Logger,
    private readonly strategyService: StrategyService,
  ) {}

  @ApiBody({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(AttachmentMessageDto),
        },
        {
          $ref: getSchemaPath(LocationMessageDto),
        },
        {
          $ref: getSchemaPath(TextMessageDto),
        },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The incoming message has been successfully created.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(ReturnedAttachmentMessageDto),
        },
        {
          $ref: getSchemaPath(ReturnedLocationMessageDto),
        },
        {
          $ref: getSchemaPath(ReturnedTextMessageDto),
        },
      ],
    },
  })
  @Post('incoming-messages')
  async receivingNewMessage(
    @Body() incomingMessage: IncomingMessage,
  ): Promise<ReturnedIncomingMessage> {
    let service: MessageService;
    try {
      service = this.strategyService.getStrategy(incomingMessage.type);
    } catch (err) {
      this.logger.log(err);
      throw new InternalServerErrorException(
        'Error while choosing the strategy to process the incoming message',
      );
    }
    try {
      return service.save(incomingMessage) as Promise<ReturnedIncomingMessage>;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Error while executing the strategy to process the incoming message',
      );
    }
  }

  @ApiBody({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(TemplateMessageDto),
        },
        {
          $ref: getSchemaPath(AttachmentMessageDto),
        },
        {
          $ref: getSchemaPath(LocationMessageDto),
        },
        {
          $ref: getSchemaPath(TextMessageDto),
        },
      ],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The outgoing message has been successfully created.',
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(ReturnedTemplateMessageDto),
        },
        {
          $ref: getSchemaPath(ReturnedAttachmentMessageDto),
        },
        {
          $ref: getSchemaPath(ReturnedLocationMessageDto),
        },
        {
          $ref: getSchemaPath(ReturnedTextMessageDto),
        },
      ],
    },
  })
  @Post('outgoing-messages')
  async sendingNewMessage(
    @Body() outgoingMessage: OutgoingMessage,
  ): Promise<ReturnedOutgoingMessage> {
    let service: MessageService;
    try {
      service = this.strategyService.getStrategy(outgoingMessage.type);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Error while choosing the strategy to process the outgoing message',
      );
    }
    try {
      return service.save(outgoingMessage);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'Error while executing the strategy to process the outgoing message',
      );
    }
  }
}
