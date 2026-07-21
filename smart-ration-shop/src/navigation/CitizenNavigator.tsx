import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CitizenDashboardScreen from '../screens/citizen/DashboardScreen';
import QuotaScreen from '../screens/citizen/QuotaScreen';
import TransactionHistoryScreen from '../screens/citizen/TransactionHistoryScreen';
import ComplaintsScreen from '../screens/citizen/ComplaintsScreen';
import NotificationsScreen from '../screens/citizen/NotificationsScreen';
import VoiceAssistantScreen from '../screens/citizen/VoiceAssistantScreen';
import ProfileScreen from '../screens/citizen/ProfileScreen';
import EditProfileScreen from '../screens/citizen/EditProfileScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CitizenTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tab.Screen name="Home" component={CitizenDashboardScreen} />
      <Tab.Screen name="Quota" component={QuotaScreen} />
      <Tab.Screen name="Complaints" component={ComplaintsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function CitizenNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CitizenTabs" component={CitizenTabs} />
      <Stack.Screen name="Transactions" component={TransactionHistoryScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="VoiceAssistant" component={VoiceAssistantScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
