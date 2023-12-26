import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { API_KEY_NAME } from '../common/constants';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
import {
  allowedTypesForIncomingDtos,
  allowedTypesForOutgoingDtos,
} from '../common/pipes/mapping-message-types-and-dtos';
import { MessagePipe } from '../common/pipes/message.pipe';
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
  @ApiResponse({
    status: 400,
    description: 'The incoming message cannot be accepted.',
  })
  @ApiResponse({
    status: 401,
    description: "The API key wasn't provided or is incorrect.",
  })
  @ApiSecurity(API_KEY_NAME)
  @Post('incoming-messages')
  @UseGuards(ApiKeyGuard)
  async receivingNewMessage(
    @Body(new MessagePipe(allowedTypesForIncomingDtos))
    incomingMessage: IncomingMessage,
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
  @ApiResponse({
    status: 400,
    description: 'The incoming message cannot be accepted.',
  })
  @ApiResponse({
    status: 401,
    description: "The JWT token wasn't provided or is incorrect.",
  })
  @Post('outgoing-messages')
  async sendingNewMessage(
    @Body(new MessagePipe(allowedTypesForOutgoingDtos))
    outgoingMessage: OutgoingMessage,
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
