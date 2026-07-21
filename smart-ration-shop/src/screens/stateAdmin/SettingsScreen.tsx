import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useTheme } from '../../context/ThemeContext';
import { colors, radius, spacing } from '../../theme/theme';

export default function SettingsScreen() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <ScreenContainer title="Settings" subtitle="System configuration">
      <View style={styles.row}>
        <Text variant="bodyLarge" style={styles.label}>Dark Mode</Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <View style={styles.card}>
        <Text variant="titleSmall" style={styles.title}>Language</Text>
        <Text variant="bodyMedium" style={styles.meta}>English / Tamil (Phase 4)</Text>
      </View>
      <AppButton label="Save Settings" onPress={() => {}} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  label: { color: colors.text },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '600' },
  meta: { color: colors.textMuted, marginTop: 6 },
});
