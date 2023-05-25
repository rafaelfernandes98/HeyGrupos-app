import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { ThreadType } from './Chat';

export type RouteType = {
  navigate: (
    route: string,
    params?: { route: RouteStackParamList },
  ) => NativeStackNavigationOptions;
};

export type RouteStackParamList = {
  thread: ThreadType;
};

export type StackParamList = {
  thread: ThreadType;
  Messages: {
    thread: ThreadType;
  };
  // outras rotas...
};

// type Routes = {
//   SignIn: () => void;
//   ChatRoom: () => void;
//   Messages: {
//     thread?: ThreadType;
//   };
// };
