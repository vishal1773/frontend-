import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function ReportsScreen() {
  return (
    <ScreenContainer title="State Reports" subtitle="Export and view system-wide reports">
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.title}>Tamil Nadu - July 2026</Text>
        <Text variant="bodyMedium" style={styles.line}>Total ration distributed: 12.4M kg</Text>
        <Text variant="bodyMedium" style={styles.line}>Active beneficiaries: 2.4M</Text>
        <Text variant="bodyMedium" style={styles.line}>IoT sensors online: 94%</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  line: { color: colors.textMuted, marginBottom: spacing.xs },
});
