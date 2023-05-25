export type ThreadType = {
  _id: string;
  name: string;
  lastMessage: {
    created_at: string;
    text: string;
  };
};

export type MessagesType = {
  text: string;
  created_at: string;
  system?: boolean;
};

export type UserMessages = {
  name?: string & MessagesType;
};
