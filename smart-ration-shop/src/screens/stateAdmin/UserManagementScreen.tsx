import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { colors, radius, spacing } from '../../theme/theme';

const users = [
  { id: '1', name: 'Demo Citizen', role: 'Citizen', status: 'active' },
  { id: '2', name: 'Shop Admin', role: 'Shopkeeper', status: 'active' },
];

export default function UserManagementScreen() {
  return (
    <ScreenContainer title="User Management" subtitle="Manage citizens, shopkeepers & officers">
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.name}>{item.name}</Text>
              <StatusPill label={item.status} tone="success" />
            </View>
            <Text variant="bodySmall" style={styles.role}>{item.role}</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: colors.text, fontWeight: '600' },
  role: { color: colors.textMuted, marginTop: 6 },
});
