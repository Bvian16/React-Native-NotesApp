import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';

import Card from './src/components/Card';
import Home from './src/components/Home';
import Login from './src/components/Login';
import NoteForm from './src/components/NoteForm';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="NoteForm"
            component={NoteForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Card" component={Card} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
