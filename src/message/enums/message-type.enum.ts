export enum MessageTypeEnum {
  attachment = 'attachment',
  location = 'location',
  text = 'text',
  template = 'template',
}

export type MessageType = `${MessageTypeEnum}`;
