export type User = {
  _id: string;
  username: string;
};

export type Todo = {
  _id: string;
  title: string;
  description: string;
};

export type TodoRouterStackParamList = {
  HomeScreen: undefined;
};

export type AuthRouterStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
};
