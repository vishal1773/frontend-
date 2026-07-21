import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function AnalyticsScreen() {
  return (
    <ScreenContainer title="Analytics" subtitle="District-level insights & AI demand predictions">
      <View style={styles.card}>
        <Text variant="titleMedium" style={styles.title}>Demand Forecast (Next Month)</Text>
        <Text variant="bodyMedium" style={styles.line}>Rice: +12% expected demand</Text>
        <Text variant="bodyMedium" style={styles.line}>Wheat: +5% expected demand</Text>
        <Text variant="bodyMedium" style={styles.line}>Sugar: stable</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  title: { color: colors.text, fontWeight: '700', marginBottom: spacing.md },
  line: { color: colors.textMuted, marginBottom: spacing.xs },
});
