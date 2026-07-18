import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';
import AppButton from '../../components/AppButton';

type Props = StackScreenProps<AuthStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>🪙</Text>
        </View>
        <Text style={styles.title}>Smart Ration Shop</Text>
        <Text style={styles.subtitle}>
          Secure, transparent, and efficient public distribution for every citizen.
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>JWT Auth</Text>
          </View>
          <View style={styles.metaChip}>
            <Text style={styles.metaText}>Role Based</Text>
          </View>
        </View>
      </View>

      <AppButton title="Get Started" onPress={() => navigation.replace('Login')} />

      <View style={styles.loaderRow}>
        <ActivityIndicator color={theme.colors.primary} size="small" />
        <Text style={styles.loaderText}>Preparing your experience…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xl,
    justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 15,
    color: theme.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  metaChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.colors.primarySoft,
  },
  metaText: {
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 12,
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    gap: 8,
  },
  loaderText: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
});
