import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { Complaint } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const complaints: Complaint[] = [
  { id: '1', title: 'Stock not available', description: 'Sugar out of stock at Anna Nagar', status: 'open', createdAt: '2026-07-18' },
  { id: '2', title: 'Long queue', description: 'Insufficient staff', status: 'in_progress', createdAt: '2026-07-19' },
];

export default function ComplaintMonitoringScreen() {
  return (
    <ScreenContainer title="Complaint Monitoring" subtitle="Live complaint updates via Socket.IO">
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.title}>{item.title}</Text>
              <StatusPill label={item.status.replace('_', ' ')} tone={item.status === 'resolved' ? 'success' : 'warning'} />
            </View>
            <Text variant="bodySmall" style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  title: { color: colors.text, fontWeight: '600', flex: 1 },
  desc: { color: colors.textMuted, marginTop: 6 },
});
