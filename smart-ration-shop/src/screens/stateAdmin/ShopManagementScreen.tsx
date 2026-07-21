import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { Shop } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const shops: Shop[] = [
  { id: '1', name: 'Anna Nagar Ration Shop', district: 'Chennai', address: 'Anna Nagar', status: 'active' },
  { id: '2', name: 'Coimbatore Central Shop', district: 'Coimbatore', address: 'RS Puram', status: 'active' },
];

export default function ShopManagementScreen() {
  return (
    <ScreenContainer title="Shop Management" subtitle="State-wide ration shops">
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
            <Text variant="bodySmall" style={styles.meta}>{item.district} · {item.address}</Text>
            <StatusPill label={item.status} tone="success" />
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: 6 },
  name: { color: colors.text, fontWeight: '600' },
  meta: { color: colors.textMuted },
});
