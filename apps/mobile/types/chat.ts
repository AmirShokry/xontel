export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export interface NewMessage {
  senderId: string;
  text: string;
}
