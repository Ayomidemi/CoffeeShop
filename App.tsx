import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Details from './src/screens/Details';
import Payments from './src/screens/Payments';
import TabNavigator from './src/navigators/TabNavigator';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="Details"
          component={Details}
          options={{animation: 'slide_from_bottom'}}
        />

        <Stack.Screen
          name="Payment"
          component={Payments}
          options={{animation: 'slide_from_bottom'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
