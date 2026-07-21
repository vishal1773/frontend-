import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ShopkeeperDashboardScreen from '../screens/shopkeeper/DashboardScreen';
import ScanQrScreen from '../screens/shopkeeper/ScanQrScreen';
import IssueRationScreen from '../screens/shopkeeper/IssueRationScreen';
import StockManagementScreen from '../screens/shopkeeper/StockManagementScreen';
import TransactionHistoryScreen from '../screens/shopkeeper/TransactionHistoryScreen';
import ReportsScreen from '../screens/shopkeeper/ReportsScreen';
import NotificationsScreen from '../screens/shopkeeper/NotificationsScreen';
import ProfileScreen from '../screens/shopkeeper/ProfileScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ShopkeeperTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen name="Home" component={ShopkeeperDashboardScreen} />
      <Tab.Screen name="Scan" component={ScanQrScreen} />
      <Tab.Screen name="Stock" component={StockManagementScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function ShopkeeperNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopkeeperTabs" component={ShopkeeperTabs} />
      <Stack.Screen name="IssueRation" component={IssueRationScreen} />
      <Stack.Screen name="Transactions" component={TransactionHistoryScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
}
