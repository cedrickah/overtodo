import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoRouterStackParamList } from "../types";
import TodoScreen from "../screens/app/Todo";

const Stack = createNativeStackNavigator<TodoRouterStackParamList>();

const TodoRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={TodoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default TodoRouter;
