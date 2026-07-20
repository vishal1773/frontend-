import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { theme } from '../theme/theme';

type Props = {
  active: string;
  variant?: 'citizen' | 'shopkeeper';
  onTabPress?: (key: string) => void;
};

const citizenTabs = [
  { key: 'dashboard', label: 'Dashboard', icon: 'home-outline' },
  { key: 'quota', label: 'Quota', icon: 'package-variant-closed' },
  { key: 'complaints', label: 'Complaints', icon: 'alert-circle-outline' },
  { key: 'profile', label: 'Profile', icon: 'account-outline' },
];

const shopkeeperTabs = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'stock', label: 'Stock', icon: 'cube-outline' },
  { key: 'reports', label: 'Reports', icon: 'chart-line' },
  { key: 'profile', label: 'Profile', icon: 'account-outline' },
];

export default function BottomNavigation({ active, variant = 'citizen', onTabPress }: Props) {
  const tabs = variant === 'shopkeeper' ? shopkeeperTabs : citizenTabs;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <Pressable key={tab.key} style={styles.tab} onPress={() => onTabPress?.(tab.key)}>
            <MaterialCommunityIcons
              name={tab.icon as never}
              size={20}
              color={isActive ? theme.colors.primary : theme.colors.textMuted}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
