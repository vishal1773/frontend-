import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { NotificationItem } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const notifications: NotificationItem[] = [
  { id: '1', title: 'Low Stock Alert', message: 'Wheat stock below threshold.', time: '30m ago', type: 'alert', read: false },
  { id: '2', title: 'Stock Arrival', message: 'Rice shipment received from depot.', time: '3h ago', type: 'success', read: true },
];

export default function NotificationsScreen() {
  return (
    <ScreenContainer title="Notifications" subtitle="Stock alerts and updates">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleSmall" style={styles.title}>{item.title}</Text>
            <Text variant="bodyMedium" style={styles.message}>{item.message}</Text>
            <Text variant="bodySmall" style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '600' },
  message: { color: colors.textMuted, marginTop: 4 },
  time: { color: colors.textMuted, marginTop: 6 },
});
