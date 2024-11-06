import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CadastroPassword from './screens/CadastroPassword';
import Cadastro from './screens/Cadastro';
import Adresses from './screens/Adresses';
import Login from './screens/OnEatLoginScreen';
import LoginScreen from './screens/LoginScreen';
import Perfil from './screens/Perfil';
import Pedidos from './screens/OrderScreen';
import PersonalInfo from './screens/PersonalInfoScreen';
import Busca from './screens/FoodCategoriesScreen'
import RestauranteScreen from './screens/RestaurantScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastroPassword" component={CadastroPassword} />
        <Stack.Screen name="Adresses" component={Adresses} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Pedidos" component={Pedidos} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
        <Stack.Screen name="Busca" component={Busca} />
        <Stack.Screen name="RestauranteScreen" component={RestauranteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
