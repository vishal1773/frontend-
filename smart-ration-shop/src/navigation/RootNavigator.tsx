import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import CitizenNavigator from './CitizenNavigator';
import ShopkeeperNavigator from './ShopkeeperNavigator';
import DistrictNavigator from './DistrictNavigator';
import StateAdminNavigator from './StateAdminNavigator';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme/theme';

export default function RootNavigator() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  const roleNavigator = {
    citizen: <CitizenNavigator />,
    shopkeeper: <ShopkeeperNavigator />,
    district_officer: <DistrictNavigator />,
    state_admin: <StateAdminNavigator />,
  }[user.role];

  return <NavigationContainer>{roleNavigator}</NavigationContainer>;
}
