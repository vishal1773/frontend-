import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function ReportsScreen() {
  return (
    <ScreenContainer title="Reports" subtitle="Daily and monthly ration reports">
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.title}>July 2026 Summary</Text>
        <Text variant="bodyMedium" style={styles.line}>Total issues: 512</Text>
        <Text variant="bodyMedium" style={styles.line}>Rice distributed: 980 kg</Text>
        <Text variant="bodyMedium" style={styles.line}>Wheat distributed: 420 kg</Text>
        <Text variant="bodyMedium" style={styles.line}>Sugar distributed: 180 kg</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  line: { color: colors.textMuted, marginBottom: spacing.xs },
});
