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
import ShopkeeperDashboardScreen from '../screens/shopkeeper/ShopkeeperDashboardScreen';
import StockScreen from '../screens/shopkeeper/StockScreen';
import ReportsScreen from '../screens/shopkeeper/ReportsScreen';
import ShopkeeperProfileScreen from '../screens/shopkeeper/ShopkeeperProfileScreen';
import QuotaScreen from '../screens/citizen/QuotaScreen';
import ComplaintsScreen from '../screens/citizen/ComplaintsScreen';
import ProfileScreen from '../screens/citizen/ProfileScreen';

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
  ShopkeeperDashboard: undefined;
  ShopkeeperStock: undefined;
  ShopkeeperReports: undefined;
  ShopkeeperProfile: undefined;
  CitizenQuota: undefined;
  CitizenComplaints: undefined;
  CitizenProfile: { phone?: string } | undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, cardStyle: { flex: 1 } }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
        <Stack.Screen name="CitizenRegistration" component={CitizenRegistrationScreen} />
        <Stack.Screen name="ShopkeeperRegistration" component={ShopkeeperRegistrationScreen} />
        <Stack.Screen name="DistrictOfficerRegistration" component={DistrictOfficerRegistrationScreen} />
        <Stack.Screen name="StateAdminRegistration" component={StateAdminRegistrationScreen} />
        <Stack.Screen name="CitizenDashboard" component={CitizenDashboardScreen} />
        <Stack.Screen name="CitizenQuota" component={QuotaScreen} />
        <Stack.Screen name="CitizenComplaints" component={ComplaintsScreen} />
        <Stack.Screen name="CitizenProfile" component={ProfileScreen} />
        <Stack.Screen name="ShopkeeperDashboard" component={ShopkeeperDashboardScreen} />
        <Stack.Screen name="ShopkeeperStock" component={StockScreen} />
        <Stack.Screen name="ShopkeeperReports" component={ReportsScreen} />
        <Stack.Screen name="ShopkeeperProfile" component={ShopkeeperProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
