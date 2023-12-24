import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { v1 as uuidv1 } from 'uuid';

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
  ReturnedTemplateMessageDto,
  ReturnedAttachmentMessageDto,
  ReturnedLocationMessageDto,
  ReturnedTextMessageDto,
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
    return { id: uuidv1(), ...outgoingMessage };
  }
}
