import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';
import Splash from './src/Screens/Splash';
import Signup from './src/Screens/Signup';
import Login from './src/Screens/Login';
import HomeTab from './src/Screens/HomeTab'; 
import Details from './src/Screens/Details';
import Cart from './src/Screens/Cart';
import Orderplaced from './src/Screens/Orderplaced';
import Intro from './src/Screens/Intro';
import ForgotPassword from './src/Screens/ForgotPassword';
import CategoryProducts from "./src/Screens/CategoryProducts"; 
import Favorites from './src/Screens/Favorite';  // Add Favorites screen import

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Intro"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Home" component={HomeTab} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderPlaced" component={Orderplaced} />
          <Stack.Screen 
            name="CategoryProducts" 
            component={CategoryProducts} 
            options={{ headerShown: true }}  
          />
          <Stack.Screen 
            name="Favorite"  // Add the Favorites screen route
            component={Favorites} 
            options={{ headerShown: true }}  
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
