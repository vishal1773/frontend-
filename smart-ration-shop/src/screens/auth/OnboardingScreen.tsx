import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import AppButton from '../../components/common/AppButton';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { colors, spacing } from '../../theme/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

const slides = [
  { icon: '📱', title: 'Track Your Quota', desc: 'View monthly ration allocation anytime.' },
  { icon: '🎤', title: 'Voice Assistant', desc: 'Tamil & English support for easy access.' },
  { icon: '🔔', title: 'Live Updates', desc: 'Get instant notifications on stock & complaints.' },
];

export default function OnboardingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.heading}>
          Welcome
        </Text>
        {slides.map((slide) => (
          <View key={slide.title} style={styles.card}>
            <Text style={styles.icon}>{slide.icon}</Text>
            <Text variant="titleMedium" style={styles.title}>
              {slide.title}
            </Text>
            <Text variant="bodyMedium" style={styles.desc}>
              {slide.desc}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.actions}>
        <AppButton label="Get Started" onPress={() => navigation.replace('Login')} />
        <AppButton label="Register" variant="outline" onPress={() => navigation.navigate('SelectRole')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: spacing.md },
  heading: { color: colors.text, fontWeight: '700', marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: { fontSize: 32, marginBottom: spacing.sm },
  title: { color: colors.text, fontWeight: '600' },
  desc: { color: colors.textMuted, marginTop: 6 },
  actions: { padding: spacing.xl, gap: spacing.sm },
});
