import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { colors, radius, spacing } from '../../theme/theme';

export default function VoiceAssistantScreen() {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('Ask about quota, stock, or register a complaint by voice.');

  const toggleListening = () => {
    setListening((prev) => !prev);
    if (!listening) {
      setResponse('Listening... Try: "What is my rice quota?"');
      setTimeout(() => setResponse('Your remaining rice quota is 3 kg for July 2026.'), 1500);
    }
  };

  return (
    <ScreenContainer title="AI Voice Assistant" subtitle="Tamil & English support">
      <View style={styles.card}>
        <Text style={styles.mic}>{listening ? '🎙️' : '🎤'}</Text>
        <Text variant="bodyLarge" style={styles.response}>{response}</Text>
        <AppButton label={listening ? 'Stop Listening' : 'Start Listening'} onPress={toggleListening} />
      </View>
      <Text variant="bodySmall" style={styles.hint}>
        Phase 4: Integrate speech-to-text and NLP for real voice commands.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.xl, padding: spacing.xl, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  mic: { fontSize: 48, marginBottom: spacing.lg },
  response: { color: colors.text, textAlign: 'center', marginBottom: spacing.lg },
  hint: { color: colors.textMuted, marginTop: spacing.lg, textAlign: 'center' },
});
