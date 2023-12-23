import { Body, Controller, Post } from '@nestjs/common';
import { v1 as uuidv1 } from 'uuid';

import {
  IncomingMessage,
  ReturnedIncomingMessage,
} from './types/incoming-message.type';
import {
  OutgoingMessage,
  ReturnedOutgoingMessage,
} from './types/outgoing-message.type';

@Controller('messages')
export class MessageController {
  @Post('incoming-messages')
  receivingNewMessage(
    @Body() incomingMessage: IncomingMessage,
  ): ReturnedIncomingMessage {
    return { id: uuidv1(), ...incomingMessage };
  }

  @Post('outgoing-messages')
  sendingNewMessage(
    @Body() outgoingMessage: OutgoingMessage,
  ): ReturnedOutgoingMessage {
    return { id: uuidv1(), ...outgoingMessage };
  }
}
