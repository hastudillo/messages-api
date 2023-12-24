import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { v1 as uuidv1 } from 'uuid';

import { AttachmentMessageDto } from './dtos/attachment-message.dto';
import { LocationMessageDto } from './dtos/location-message.dto';
import { TemplateMessageDto } from './dtos/template-message.dto';
import { TextMessageDto } from './dtos/text-message.dto';
import {
  IncomingMessage,
  ReturnedIncomingMessage,
} from './types/incoming-message.type';
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
)
@Controller('messages')
export class MessageController {
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
  })
  @Post('incoming-messages')
  receivingNewMessage(
    @Body() incomingMessage: IncomingMessage,
  ): ReturnedIncomingMessage {
    return { id: uuidv1(), ...incomingMessage };
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
  })
  @Post('outgoing-messages')
  sendingNewMessage(
    @Body() outgoingMessage: OutgoingMessage,
  ): ReturnedOutgoingMessage {
    return { id: uuidv1(), ...outgoingMessage };
  }
}
