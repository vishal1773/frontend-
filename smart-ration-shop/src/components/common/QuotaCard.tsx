import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../../theme/theme';

type QuotaCardProps = {
  itemName: string;
  allocated: number;
  consumed: number;
  unit: string;
};

export default function QuotaCard({ itemName, allocated, consumed, unit }: QuotaCardProps) {
  const remaining = Math.max(0, allocated - consumed);
  const percentage = allocated > 0 ? Math.round((consumed / allocated) * 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.title}>
          {itemName}
        </Text>
        <Text variant="bodySmall" style={styles.remaining}>
          {remaining} {unit} left
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
      <Text variant="bodySmall" style={styles.meta}>
        {consumed}/{allocated} {unit} used ({percentage}%)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.text,
    fontWeight: '600',
  },
  remaining: {
    color: colors.primary,
    fontWeight: '600',
  },
  track: {
    height: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  meta: {
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
