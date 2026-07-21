import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

const districts = [
  { id: '1', name: 'Chennai', shops: 42, beneficiaries: '184K' },
  { id: '2', name: 'Coimbatore', shops: 38, beneficiaries: '156K' },
  { id: '3', name: 'Madurai', shops: 35, beneficiaries: '142K' },
];

export default function DistrictManagementScreen() {
  return (
    <ScreenContainer title="District Management" subtitle="Manage districts across the state">
      <FlatList
        data={districts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
            <Text variant="bodySmall" style={styles.meta}>{item.shops} shops · {item.beneficiaries} beneficiaries</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  name: { color: colors.text, fontWeight: '600' },
  meta: { color: colors.textMuted, marginTop: 6 },
});
