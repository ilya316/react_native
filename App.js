import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';

const Stack = createStackNavigator();

import MainBattle from './components/MainBattle';
import HomePage from './components/HomePage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 1) {
        setProgress(progress + 0.34);
      } else {
        setIsLoading(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Progress.Circle
            progress={progress}
            showsText={true}
            width={200}
            color={'red'}
            borderWidth={0}
            size={200}
            thickness={5}
          />
        </View>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={HomePage}
          />

          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Battle"
            component={MainBattle}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
