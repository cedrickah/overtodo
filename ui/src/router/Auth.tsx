import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRouterStackParamList } from "../types";
import SignupScreen from "../screens/auth/Signup";
import LoginScreen from "../screens/auth/Login";

const Stack = createNativeStackNavigator<AuthRouterStackParamList>();

const AuthRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthRouter;
