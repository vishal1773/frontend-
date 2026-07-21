import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { NotificationItem } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const notifications: NotificationItem[] = [
  { id: '1', title: 'Quota Available', message: 'Your July quota is ready for collection.', time: '2h ago', type: 'success', read: false },
  { id: '2', title: 'Complaint Update', message: 'Your complaint is being reviewed.', time: '1d ago', type: 'info', read: true },
];

export default function NotificationsScreen() {
  return (
    <ScreenContainer title="Notifications" subtitle="Quota, stock & government updates">
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, !item.read && styles.unread]}>
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
  unread: { borderLeftWidth: 4, borderLeftColor: colors.primary },
  title: { color: colors.text, fontWeight: '600' },
  message: { color: colors.textMuted, marginTop: 4 },
  time: { color: colors.textMuted, marginTop: 6 },
});
