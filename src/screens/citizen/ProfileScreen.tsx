import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import BottomNavigation from '../../components/BottomNavigation';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'CitizenProfile'>;
const details = [['Mobile Number', '+91 98765 43210'], ['Ration Card Number', 'TN-102-458-921'], ['Aadhaar', 'XXXX XXXX 1234'], ['Address', 'House 12, Ward 3, Bengaluru'], ['District', 'Bengaluru'], ['Family Members', '4 Members'], ['Language Preference', 'English']];
const actions = ['Edit Profile', 'Change Language', 'Help & Support', 'Privacy Policy', 'Logout'];

export default function ProfileScreen({ navigation }: Props) {
  const goTo = (tab: string) => {
    if (tab === 'dashboard') navigation.navigate('CitizenDashboard', { phone: '9876543210' });
    if (tab === 'quota') navigation.navigate('CitizenQuota');
    if (tab === 'complaints') navigation.navigate('CitizenComplaints');
  };
  return <View style={styles.wrapper}><ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={styles.eyebrow}>ACCOUNT</Text><Text style={styles.title}>Profile</Text>
    <View style={styles.profileHeader}><View style={styles.avatar}><Text style={styles.avatarText}>A</Text></View><Text style={styles.name}>Aarav Kumar</Text><Text style={styles.subtext}>Citizen account</Text></View>
    <View style={styles.card}>{details.map(([label, value], index) => <View key={label} style={[styles.detailRow, index < details.length - 1 && styles.border]}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue}>{value}</Text></View>)}</View>
    <Text style={styles.sectionTitle}>Actions</Text><View style={styles.card}>{actions.map((action, index) => <Pressable key={action} style={[styles.action, index < actions.length - 1 && styles.border]}><Text style={[styles.actionText, action === 'Logout' && styles.logout]}>{action}</Text><Text style={styles.arrow}>›</Text></Pressable>)}</View>
  </ScrollView><BottomNavigation active="profile" onTabPress={goTo} /></View>;
}
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background }, scrollView: { flex: 1 }, content: { flexGrow: 1, padding: theme.spacing.lg, paddingBottom: 120 }, eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 5 }, title: { color: theme.colors.text, fontSize: 26, fontWeight: '800', marginBottom: theme.spacing.lg }, profileHeader: { alignItems: 'center', backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.lg, borderWidth: 1, marginBottom: theme.spacing.xl, padding: theme.spacing.lg }, avatar: { alignItems: 'center', backgroundColor: theme.colors.primary, borderRadius: 40, height: 80, justifyContent: 'center', marginBottom: 12, width: 80 }, avatarText: { color: '#FFFFFF', fontSize: 32, fontWeight: '800' }, name: { color: theme.colors.text, fontSize: 19, fontWeight: '800', marginBottom: 4 }, subtext: { color: theme.colors.textMuted, fontSize: 13 }, card: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, marginBottom: theme.spacing.xl }, detailRow: { padding: theme.spacing.md }, border: { borderBottomColor: theme.colors.border, borderBottomWidth: 1 }, detailLabel: { color: theme.colors.textMuted, fontSize: 12, marginBottom: 4 }, detailValue: { color: theme.colors.text, fontSize: 14, fontWeight: '700' }, sectionTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '800', marginBottom: theme.spacing.sm }, action: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: theme.spacing.md }, actionText: { color: theme.colors.text, fontSize: 14, fontWeight: '700' }, logout: { color: theme.colors.danger }, arrow: { color: theme.colors.textMuted, fontSize: 24 },
});
