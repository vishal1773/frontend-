import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { Transaction } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const transactions: Transaction[] = [
  { id: '1', date: '2026-07-21', shopName: 'Beneficiary #1024', items: 'Rice 2kg', status: 'completed' },
  { id: '2', date: '2026-07-21', shopName: 'Beneficiary #884', items: 'Wheat 1kg, Sugar 0.5kg', status: 'completed' },
];

export default function TransactionHistoryScreen() {
  return (
    <ScreenContainer title="Transaction History" subtitle="Ration issued today">
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.title}>{item.shopName}</Text>
              <StatusPill label={item.status} tone="success" />
            </View>
            <Text variant="bodyMedium" style={styles.items}>{item.items}</Text>
            <Text variant="bodySmall" style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  title: { color: colors.text, fontWeight: '600', flex: 1 },
  items: { color: colors.textMuted, marginTop: 6 },
  date: { color: colors.textMuted, marginTop: 4 },
});
