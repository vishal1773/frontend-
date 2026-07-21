import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../theme/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <ScreenContainer title="Profile" subtitle="District Officer account">
      <View style={styles.info}>
        <Text variant="titleMedium" style={styles.name}>{user?.name ?? 'District Officer'}</Text>
        <Text variant="bodyMedium" style={styles.meta}>Chennai District</Text>
      </View>
      <AppButton label="Logout" onPress={logout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  info: { backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  name: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.textMuted, marginTop: 6 },
});
