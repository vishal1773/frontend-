import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { NotificationItem } from '../types';

type Props = {
  item: NotificationItem;
};

export default function NotificationCard({ item }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  message: {
    color: theme.colors.textMuted,
    fontSize: 13,
    marginBottom: 6,
  },
  time: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});
