import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  active: string;
};

const tabs = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'quota', label: 'Quota', icon: '📦' },
  { key: 'complaints', label: 'Complaints', icon: '⚠️' },
  { key: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomNavigation({ active }: Props) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <Pressable key={tab.key} style={styles.tab}>
          <Text style={styles.icon}>{tab.icon}</Text>
          <Text style={[styles.label, active === tab.key && styles.activeLabel]}>{tab.label}</Text>
        </Pressable>
      ))}
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
  icon: {
    fontSize: 18,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  activeLabel: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
