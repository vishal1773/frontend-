import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { formatPhone } from '../../utils/formatters';
import { colors, spacing } from '../../theme/theme';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer title="Profile" subtitle="Citizen account details">
      <View style={styles.info}>
        <Text variant="titleMedium" style={styles.name}>{user?.name}</Text>
        <Text variant="bodyMedium" style={styles.meta}>{formatPhone(user?.phone ?? '')}</Text>
        <Text variant="bodyMedium" style={styles.meta}>Role: Citizen</Text>
      </View>
      <View style={styles.actions}>
        <AppButton label="Edit Profile" variant="outline" onPress={() => navigation.navigate('EditProfile')} />
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
