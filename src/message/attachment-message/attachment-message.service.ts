import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosHeaders, AxiosResponse, AxiosResponseHeaders } from 'axios';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import {
  FILENAME_IN_CONTENT_DISPOSITION,
  HEADER_CONTENT_DISPOSITION,
  HEADER_CONTENT_TYPE,
  HEADER_LOCATION,
  SLASH,
} from '../../common/constants';
import {
  AttachmentMessageDto,
  ReturnedAttachmentMessageDto,
} from '../dtos/attachment-message.dto';
import { BaseMessageDto } from '../dtos/base-message.dto';
import { Message } from '../entities/message.entity';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { BaseMessageService } from '../services/base-message.service';
import { IncomingMessage } from '../types/incoming-message.type';
import { IMessageService } from '../types/message-service.interface';
import { OutgoingMessage } from '../types/outgoing-message.type';
import { AttachmentMessage } from './attachment-message.entity';

@Injectable()
export class AttachmentMessageService
  extends BaseMessageService
  implements IMessageService
{
  constructor(
    @InjectRepository(AttachmentMessage)
    private readonly attachmentMessageRepository: Repository<AttachmentMessage>,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  async save(
    newMessage: IncomingMessage | OutgoingMessage,
    user?: string,
  ): Promise<ReturnedAttachmentMessageDto> {
    const baseMessage: Message = this.dtoToEntityMessage(newMessage, user);
    const attachmentMessage = await this.dtoToEntity(
      newMessage as AttachmentMessageDto,
      baseMessage,
    );
    const savedAttachmentMessage: AttachmentMessage =
      await this.attachmentMessageRepository.save(attachmentMessage);
    const messageToReturn: BaseMessageDto = this.entityToMessageDto(
      savedAttachmentMessage.baseMessage,
      newMessage.type,
    );
    return this.entityToDto(savedAttachmentMessage, messageToReturn);
  }

  async dtoToEntity(
    newMessage: AttachmentMessageDto,
    baseMessage: Message,
  ): Promise<AttachmentMessage> {
    const headers: AxiosResponseHeaders | Partial<AxiosHeaders> =
      await lastValueFrom(this.getHeadersFromUrl(newMessage.url));
    const contentType: string = headers[HEADER_CONTENT_TYPE] ?? '';
    const fileName: string =
      headers[HEADER_CONTENT_DISPOSITION]?.split(
        FILENAME_IN_CONTENT_DISPOSITION,
      )?.pop() ??
      headers[HEADER_LOCATION]?.split(SLASH)?.pop() ??
      newMessage.url.split(SLASH).pop() ??
      '';
    return {
      baseMessage,
      url: newMessage.url,
      contentType,
      fileName,
    };
  }

  entityToDto(
    savedAttachmentMessage: AttachmentMessage,
    messageToReturn: BaseMessageDto,
  ): ReturnedAttachmentMessageDto {
    return {
      id: savedAttachmentMessage.baseMessage.id,
      type: messageToReturn.type as MessageTypeEnum.attachment,
      status: messageToReturn.status,
      time: messageToReturn.time,
      messageId: messageToReturn.messageId,
      conversationId: messageToReturn.conversationId,
      url: savedAttachmentMessage.url,
    };
  }

  private getHeadersFromUrl(
    url: string,
  ): Observable<AxiosResponseHeaders | Partial<AxiosHeaders>> {
    return this.httpService.get(url).pipe(
      catchError((error) => {
        throw `An error happened while getting info from ${url}: ${JSON.stringify(
          error?.response?.data,
        )}`;
      }),
      map((response: AxiosResponse) => response.headers),
    );
  }
}
