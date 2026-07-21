import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { ROLE_LABELS, ROLES } from '../../constants';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, radius, spacing } from '../../theme/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SelectRole'>;
};

const roles = [
  { key: ROLES.CITIZEN, icon: '👤', desc: 'View quota, complaints & voice assistant' },
  { key: ROLES.SHOPKEEPER, icon: '🏪', desc: 'Scan QR, issue ration & manage stock' },
  { key: ROLES.DISTRICT_OFFICER, icon: '📊', desc: 'Monitor shops, stock & complaints' },
  { key: ROLES.STATE_ADMIN, icon: '🏛️', desc: 'Manage users, districts & analytics' },
];

export default function SelectRoleScreen({ navigation }: Props) {
  return (
    <ScreenContainer title="Select Role" subtitle="Choose how you will use the app">
      <View style={styles.list}>
        {roles.map((role) => (
          <TouchableOpacity
            key={role.key}
            style={styles.card}
            onPress={() => navigation.navigate('Register', { role: role.key })}
          >
            <Text style={styles.icon}>{role.icon}</Text>
            <View style={styles.content}>
              <Text variant="titleMedium" style={styles.title}>
                {ROLE_LABELS[role.key]}
              </Text>
              <Text variant="bodySmall" style={styles.desc}>
                {role.desc}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.sm },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: { fontSize: 28, marginRight: spacing.md },
  content: { flex: 1 },
  title: { color: colors.text, fontWeight: '600' },
  desc: { color: colors.textMuted, marginTop: 4 },
  loginLink: { color: colors.primary, textAlign: 'center', marginTop: spacing.md, fontWeight: '600' },
});
