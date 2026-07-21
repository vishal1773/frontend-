import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DistrictDashboardScreen from '../screens/district/DashboardScreen';
import ShopManagementScreen from '../screens/district/ShopManagementScreen';
import StockMonitoringScreen from '../screens/district/StockMonitoringScreen';
import ComplaintMonitoringScreen from '../screens/district/ComplaintMonitoringScreen';
import AnalyticsScreen from '../screens/district/AnalyticsScreen';
import ReportsScreen from '../screens/district/ReportsScreen';
import ProfileScreen from '../screens/district/ProfileScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DistrictTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen name="Home" component={DistrictDashboardScreen} />
      <Tab.Screen name="Shops" component={ShopManagementScreen} />
      <Tab.Screen name="Stock" component={StockMonitoringScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function DistrictNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DistrictTabs" component={DistrictTabs} />
      <Stack.Screen name="Complaints" component={ComplaintMonitoringScreen} />
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
    </Stack.Navigator>
  );
}
