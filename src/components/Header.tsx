import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

type Props = {
  name: string;
  district: string;
};

export default function Header({ name, district }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.eyebrow}>Citizen dashboard</Text>
        <Text style={styles.title}>Hello, {name}</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{district}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
  },
  badge: {
    backgroundColor: theme.colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});
