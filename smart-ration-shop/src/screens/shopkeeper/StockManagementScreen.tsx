import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { StockItem } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const stock: StockItem[] = [
  { id: '1', name: 'Rice', quantity: 450, unit: 'kg', threshold: 100, lastUpdated: '2026-07-21' },
  { id: '2', name: 'Wheat', quantity: 80, unit: 'kg', threshold: 100, lastUpdated: '2026-07-21' },
  { id: '3', name: 'Sugar', quantity: 120, unit: 'kg', threshold: 50, lastUpdated: '2026-07-21' },
];

export default function StockManagementScreen() {
  return (
    <ScreenContainer title="Stock Management" subtitle="Live inventory from shop & ESP32 sensors">
      <FlatList
        data={stock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
              <StatusPill label={item.quantity <= item.threshold ? 'Low' : 'OK'} tone={item.quantity <= item.threshold ? 'warning' : 'success'} />
            </View>
            <Text variant="bodyMedium" style={styles.qty}>{item.quantity} {item.unit}</Text>
            <Text variant="bodySmall" style={styles.meta}>Updated: {item.lastUpdated}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { color: colors.text, fontWeight: '600' },
  qty: { color: colors.primary, marginTop: 6, fontWeight: '700' },
  meta: { color: colors.textMuted, marginTop: 4 },
});
