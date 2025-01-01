import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthRouter from "./Auth";
import TodoRouter from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import "../utils/i18n";
import { initializeAuth } from "../store/auth";

const Stack = createNativeStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const isLoggedIn = true;

  useEffect(() => {
    if (isLoggedIn === null) {
      dispatch(initializeAuth());
    }
  }, [isLoggedIn, dispatch]);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="TodoRouter"
              component={TodoRouter}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="AuthRouter"
            component={AuthRouter}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
