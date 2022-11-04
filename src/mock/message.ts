import { IMessage, EMessageContentType, EMessageType, EMessageStatus } from '../models';

export const message1: IMessage = {
  id: '0',
  type: EMessageType.IN,
  createdAt: new Date(),
  content:
    'Всякая записанная речь (литературное произведение, сочинение, документ и т. п., а также часть, отрывок из них).',
  contentType: EMessageContentType.TEXT,
  status: EMessageStatus.READ,
};

export const message2: IMessage = {
  id: '0',
  type: EMessageType.IN,
  createdAt: new Date(),
  content:
    'Всякая записанная речь (литературное произведение, сочинение, документ и т. п., а также часть, отрывок из них).',
  contentType: EMessageContentType.TEXT,
  status: EMessageStatus.READ,
};

export const message3: IMessage = {
  id: '0',
  type: EMessageType.OUT,
  createdAt: new Date(),
  content:
    'Всякая записанная речь (литературное произведение, сочинение, документ и т. п., а также часть, отрывок из них).',
  contentType: EMessageContentType.TEXT,
  status: EMessageStatus.READ,
};

export const message4: IMessage = {
  id: '0',
  type: EMessageType.OUT,
  createdAt: new Date(),
  content:
    'Всякая записанная речь (литературное произведение, сочинение, документ и т. п., а также часть, отрывок из них).',
  contentType: EMessageContentType.TEXT,
  status: EMessageStatus.UNREAD,
};
