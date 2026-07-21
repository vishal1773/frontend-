import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StateAdminDashboardScreen from '../screens/stateAdmin/DashboardScreen';
import UserManagementScreen from '../screens/stateAdmin/UserManagementScreen';
import ShopManagementScreen from '../screens/stateAdmin/ShopManagementScreen';
import DistrictManagementScreen from '../screens/stateAdmin/DistrictManagementScreen';
import AnalyticsScreen from '../screens/stateAdmin/AnalyticsScreen';
import ReportsScreen from '../screens/stateAdmin/ReportsScreen';
import SettingsScreen from '../screens/stateAdmin/SettingsScreen';
import ProfileScreen from '../screens/stateAdmin/ProfileScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function StateAdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen name="Home" component={StateAdminDashboardScreen} />
      <Tab.Screen name="Users" component={UserManagementScreen} />
      <Tab.Screen name="Shops" component={ShopManagementScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function StateAdminNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StateAdminTabs" component={StateAdminTabs} />
      <Stack.Screen name="Districts" component={DistrictManagementScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
