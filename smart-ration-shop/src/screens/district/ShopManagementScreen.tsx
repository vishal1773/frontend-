import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { Shop } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const shops: Shop[] = [
  { id: '1', name: 'Anna Nagar Ration Shop', district: 'Chennai', address: 'Anna Nagar', status: 'active' },
  { id: '2', name: 'T Nagar Ration Shop', district: 'Chennai', address: 'T Nagar', status: 'active' },
];

export default function ShopManagementScreen() {
  return (
    <ScreenContainer title="Shop Management" subtitle="District ration shops">
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
              <StatusPill label={item.status} tone="success" />
            </View>
            <Text variant="bodySmall" style={styles.address}>{item.address}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: colors.text, fontWeight: '600', flex: 1 },
  address: { color: colors.textMuted, marginTop: 6 },
});
