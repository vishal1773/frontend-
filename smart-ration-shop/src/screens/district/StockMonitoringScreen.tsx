import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { colors, radius, spacing } from '../../theme/theme';

const stockData = [
  { id: '1', shop: 'Anna Nagar', item: 'Rice', qty: '450 kg', status: 'ok' },
  { id: '2', shop: 'T Nagar', item: 'Wheat', qty: '60 kg', status: 'low' },
];

export default function StockMonitoringScreen() {
  return (
    <ScreenContainer title="Stock Monitoring" subtitle="Real-time stock from shops & ESP32">
      <FlatList
        data={stockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleSmall" style={styles.shop}>{item.shop}</Text>
            <View style={styles.row}>
              <Text variant="bodyMedium" style={styles.item}>{item.item}: {item.qty}</Text>
              <StatusPill label={item.status === 'low' ? 'Low' : 'OK'} tone={item.status === 'low' ? 'warning' : 'success'} />
            </View>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  shop: { color: colors.text, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' },
  item: { color: colors.textMuted },
});
