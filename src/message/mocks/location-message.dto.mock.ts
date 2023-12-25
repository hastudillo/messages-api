import { LocationMessageDto } from '../dtos/location-message.dto';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { StatusEnum } from '../enums/status.enum';

export const locationMessageDtoMock: LocationMessageDto = {
  type: MessageTypeEnum.location,
  status: StatusEnum.received,
  time: '1970-01-01T00:00:00.000Z',
  messageId: 'messageId',
  conversationId: 'conversationId',
  geo: {
    name: 'somewhere',
    lat: 0,
    long: 0,
  },
};
