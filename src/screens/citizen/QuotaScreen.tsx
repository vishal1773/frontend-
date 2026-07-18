import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import BottomNavigation from '../../components/BottomNavigation';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'CitizenQuota'>;

const quota = [
  { item: 'Rice', quantity: '20 kg', status: 'Collected', icon: '✓', color: theme.colors.success },
  { item: 'Sugar', quantity: '2 kg', status: 'Pending', icon: '⌛', color: theme.colors.warning },
  { item: 'Oil', quantity: '1 L', status: 'Pending', icon: '⌛', color: theme.colors.warning },
  { item: 'Wheat', quantity: '5 kg', status: 'Available', icon: '•', color: theme.colors.primary },
];

export default function QuotaScreen({ navigation }: Props) {
  const goTo = (tab: string) => {
    if (tab === 'dashboard') navigation.navigate('CitizenDashboard', { phone: '9876543210' });
    if (tab === 'complaints') navigation.navigate('CitizenComplaints');
    if (tab === 'profile') navigation.navigate('CitizenProfile');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>MONTHLY ENTITLEMENT</Text>
        <Text style={styles.title}>Your quota</Text>

        <View style={styles.profileCard}>
          <Text style={styles.name}>Aarav Kumar</Text>
          <Text style={styles.detail}>Ration card: TN-102-458-921</Text>
          <Text style={styles.detail}>Bengaluru District · July 2026</Text>
        </View>

        <Text style={styles.sectionTitle}>Monthly Quota</Text>
        <View style={styles.quotaCard}>
          {quota.map((entry, index) => (
            <View key={entry.item} style={[styles.quotaRow, index < quota.length - 1 && styles.rowBorder]}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{entry.item}</Text>
                <Text style={styles.status}>{entry.icon} {entry.status}</Text>
              </View>
              <Text style={styles.quantity}>{entry.quantity}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Collection Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Last collection date</Text><Text style={styles.infoValue}>02 Jul 2026</Text></View>
          <View style={styles.infoRow}><Text style={styles.infoLabel}>Next collection date</Text><Text style={styles.infoValue}>01 Aug 2026</Text></View>
          <Text style={styles.future}>Download receipt will be available soon.</Text>
        </View>
      </ScrollView>
      <BottomNavigation active="quota" onTabPress={goTo} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background }, scrollView: { flex: 1 }, content: { flexGrow: 1, padding: theme.spacing.lg, paddingBottom: 120 },
  eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 5 }, title: { color: theme.colors.text, fontSize: 26, fontWeight: '800', marginBottom: theme.spacing.lg },
  profileCard: { backgroundColor: theme.colors.primary, borderRadius: theme.radius.lg, marginBottom: theme.spacing.xl, padding: theme.spacing.md }, name: { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 6 }, detail: { color: theme.colors.primarySoft, fontSize: 13, marginBottom: 3 },
  sectionTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '800', marginBottom: theme.spacing.sm }, quotaCard: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, marginBottom: theme.spacing.xl },
  quotaRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: theme.spacing.md }, rowBorder: { borderBottomColor: theme.colors.border, borderBottomWidth: 1 }, itemInfo: { gap: 4 }, itemName: { color: theme.colors.text, fontSize: 15, fontWeight: '700' }, status: { color: theme.colors.textMuted, fontSize: 12 }, quantity: { color: theme.colors.primary, fontSize: 17, fontWeight: '800' },
  infoCard: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, padding: theme.spacing.md }, infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.md }, infoLabel: { color: theme.colors.textMuted, fontSize: 13 }, infoValue: { color: theme.colors.text, fontSize: 13, fontWeight: '700' }, future: { borderTopColor: theme.colors.border, borderTopWidth: 1, color: theme.colors.textMuted, fontSize: 12, paddingTop: theme.spacing.sm },
});
