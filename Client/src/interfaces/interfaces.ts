export interface User {
  id: number;
  username?: string | null;
  email: string;
  twoStepPassword?: string | null;
  profilePicture: string | null | undefined;
  isOnline: boolean;
  lastSeen: string;
  firstName: string;
  lastName?: string | null;
  bio?: string | null;
  phoneNumber: string | null;
  isDeleted: boolean;
  isBanned: boolean;
  status: "user" | "admin" | "superAdmin";
}

export interface Admin {
  id: number;
  password: string;
  email: string;
  isOnline: boolean;
  lastSeen: string;
  firstName: string;
  lastName?: string | null;
  isDeleted: boolean;
  isBanned: boolean;
}

export interface Contact {
  firstUserId: number;
  targetUserId: number;
}

export interface Channel {
  _id: string;
  ownerId: number;
  description: string | null;
  name: string;
  link: string;
  type: "private" | "public";
  profilePicture: string | null;
  memberCount: number;
  status: "channel";
}
export interface Direct {
  _id: string;
  user: User;
  status: "direct";
}
export interface Group {
  _id: string;
  ownerId: number;
  description: string | null;
  name: string;
  link: string;
  type: "private" | "public";
  profilePicture: string | null;
  members: {
    id: number;
    role: "admin" | "owner" | "member";
  }[];
  memberCount: number;
  status: "group";
}
export interface Message {
  _id: string;
  messageType: string | null;
  senderUserId: number;
  senderUser: User | null;
  text: string | null;
  channelId: string | null;
  groupId: string | null;
  createAt: Date;
  media: string | null;
}
export interface GroupMessage {
  _id: string;
  messageType: string | null;
  senderUserId: number;
  text: string | null;
  createdAt: Date;
  groupId: string;
  media: string | null;
}
export interface DirectMessage {
  _id: string;
  messageType: string | null;
  senderUserId: number;
  text: string | null;
  createdAt: Date;
  directId: string;
  media: string | null;
}
export interface ChannelMessage {
  _id: string;
  messageType: string | null;
  senderUserId: number;
  text: string | null;
  createdAt: Date;
  ChannelId: string;
  media: string | null;
}
