import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function ReportsScreen() {
  return (
    <ScreenContainer title="District Reports" subtitle="Monthly ration distribution summary">
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.title}>Chennai District - July 2026</Text>
        <Text variant="bodyMedium" style={styles.line}>Shops monitored: 42</Text>
        <Text variant="bodyMedium" style={styles.line}>Total beneficiaries served: 18,420</Text>
        <Text variant="bodyMedium" style={styles.line}>Complaints resolved: 76%</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  line: { color: colors.textMuted, marginBottom: spacing.xs },
});
