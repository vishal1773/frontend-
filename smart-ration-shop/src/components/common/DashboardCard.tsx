import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme/theme';
import { DashboardStat } from '../../types';

type DashboardCardProps = DashboardStat;

export default function DashboardCard({ title, value, hint, icon, color }: DashboardCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text variant="titleMedium" style={styles.value}>
        {value}
      </Text>
      <Text variant="labelLarge" style={styles.title}>
        {title}
      </Text>
      <Text variant="bodySmall" style={styles.hint}>
        {hint}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderLeftWidth: 4,
    flex: 1,
    minWidth: '45%',
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  value: {
    color: colors.text,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    marginTop: 4,
  },
  hint: {
    color: colors.textMuted,
    marginTop: 2,
  },
});
