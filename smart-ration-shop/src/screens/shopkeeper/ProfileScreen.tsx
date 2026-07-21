import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../theme/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer title="Profile" subtitle="Shopkeeper account">
      <View style={styles.info}>
        <Text variant="titleMedium" style={styles.name}>{user?.name ?? 'Shopkeeper'}</Text>
        <Text variant="bodyMedium" style={styles.meta}>Anna Nagar Ration Shop</Text>
      </View>
      <View style={styles.actions}>
        <AppButton label="Notifications" variant="outline" onPress={() => navigation.navigate('Notifications')} />
        <AppButton label="Logout" onPress={logout} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  info: { backgroundColor: colors.surface, borderRadius: 16, padding: spacing.lg, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  name: { color: colors.text, fontWeight: '700' },
  meta: { color: colors.textMuted, marginTop: 6 },
  actions: { gap: spacing.sm },
});
