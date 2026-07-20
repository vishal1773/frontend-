import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { theme } from '../theme/theme';

type Props = {
  label: string;
  tone: 'success' | 'warning' | 'danger' | 'info';
};

export default function StatusPill({ label, tone }: Props) {
  const toneStyles = {
    success: styles.success,
    warning: styles.warning,
    danger: styles.danger,
    info: styles.info,
  };

  return <View style={[styles.pill, toneStyles[tone]]}><Text style={styles.text}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
  success: {
    backgroundColor: '#DCFCE7',
  },
  warning: {
    backgroundColor: '#FEF3C7',
  },
  danger: {
    backgroundColor: '#FEE2E2',
  },
  info: {
    backgroundColor: '#DBEAFE',
  },
});
