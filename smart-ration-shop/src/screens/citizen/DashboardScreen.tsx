import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DashboardCard from '../../components/common/DashboardCard';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { useAuth } from '../../context/AuthContext';
import { colors, spacing } from '../../theme/theme';

export default function DashboardScreen() {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  return (
    <ScreenContainer title={`Hello, ${user?.name ?? 'Citizen'}`} subtitle="Your ration overview">
      <ScrollView>
        <View style={styles.grid}>
          <DashboardCard title="Monthly Quota" value="3 items" hint="Updated today" icon="📦" color={colors.primary} />
          <DashboardCard title="Complaints" value="1 open" hint="Track status live" icon="📝" color={colors.warning} />
        </View>
        <View style={styles.actions}>
          <AppButton label="View Quota" onPress={() => navigation.navigate('Quota')} />
          <AppButton label="Voice Assistant" variant="outline" onPress={() => navigation.navigate('VoiceAssistant')} />
          <AppButton label="Transactions" variant="outline" onPress={() => navigation.navigate('Transactions')} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
});
