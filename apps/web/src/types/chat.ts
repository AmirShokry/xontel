export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participantNames: string[];
  lastMessage: string;
  lastMessageTimestamp: Date;
}

export interface NewMessage {
  senderId: string;
  text: string;
}
