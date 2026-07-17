import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpScreen from '../screens/auth/OtpScreen';
import SelectRoleScreen from '../screens/auth/SelectRoleScreen';
import CitizenRegistrationScreen from '../screens/auth/CitizenRegistrationScreen';
import ShopkeeperRegistrationScreen from '../screens/auth/ShopkeeperRegistrationScreen';
import DistrictOfficerRegistrationScreen from '../screens/auth/DistrictOfficerRegistrationScreen';
import StateAdminRegistrationScreen from '../screens/auth/StateAdminRegistrationScreen';
import CitizenDashboardScreen from '../screens/citizen/CitizenDashboardScreen';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: { phone: string };
  SelectRole: undefined;
  CitizenRegistration: undefined;
  ShopkeeperRegistration: undefined;
  DistrictOfficerRegistration: undefined;
  StateAdminRegistration: undefined;
  CitizenDashboard: { phone: string; token?: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
        <Stack.Screen name="CitizenRegistration" component={CitizenRegistrationScreen} />
        <Stack.Screen name="ShopkeeperRegistration" component={ShopkeeperRegistrationScreen} />
        <Stack.Screen name="DistrictOfficerRegistration" component={DistrictOfficerRegistrationScreen} />
        <Stack.Screen name="StateAdminRegistration" component={StateAdminRegistrationScreen} />
        <Stack.Screen name="CitizenDashboard" component={CitizenDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
