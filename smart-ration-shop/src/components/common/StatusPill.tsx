import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius } from '../../theme/theme';

type StatusPillProps = {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'info';
};

const toneColors = {
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.primary,
};

export default function StatusPill({ label, tone = 'info' }: StatusPillProps) {
  return (
    <View style={[styles.pill, { backgroundColor: `${toneColors[tone]}22` }]}>
      <Text style={[styles.label, { color: toneColors[tone] }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
