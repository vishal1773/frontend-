import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import AppButton from '../../components/AppButton';
import BottomNavigation from '../../components/BottomNavigation';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { theme } from '../../theme/theme';

type Props = StackScreenProps<AuthStackParamList, 'CitizenComplaints'>;
const categories = ['Stock Not Available', 'Shop Closed', 'Poor Service', 'Wrong Quantity', 'Other'];

export default function ComplaintsScreen({ navigation }: Props) {
  const [category, setCategory] = useState(categories[0]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const goTo = (tab: string) => {
    if (tab === 'dashboard') navigation.navigate('CitizenDashboard', { phone: '9876543210' });
    if (tab === 'quota') navigation.navigate('CitizenQuota');
    if (tab === 'profile') navigation.navigate('CitizenProfile');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>SUPPORT</Text><Text style={styles.title}>Complaints</Text>
        <Text style={styles.sectionTitle}>Raise a complaint</Text>
        <View style={styles.formCard}>
          <Text style={styles.label}>Complaint category</Text>
          <View style={styles.categories}>{categories.map((item) => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.chip, category === item && styles.chipSelected]}><Text style={[styles.chipText, category === item && styles.chipTextSelected]}>{item}</Text></Pressable>)}</View>
          <Text style={styles.label}>Complaint title</Text>
          <TextInput value={title} onChangeText={setTitle} placeholder="Briefly describe the issue" placeholderTextColor="#94A3B8" style={styles.input} />
          <Text style={styles.label}>Description</Text>
          <TextInput value={description} onChangeText={setDescription} placeholder="Share the details of your complaint" placeholderTextColor="#94A3B8" style={[styles.input, styles.description]} multiline textAlignVertical="top" />
          {submitted ? <Text style={styles.success}>Complaint submitted successfully.</Text> : null}
          <AppButton title="Submit Complaint" onPress={() => setSubmitted(true)} />
        </View>
        <Text style={styles.sectionTitle}>Complaint History</Text>
        <View style={styles.historyCard}>
          <HistoryItem id="CMP001" title="Sugar stock unavailable" status="Pending" pending />
          <HistoryItem id="CMP002" title="Quantity correction request" status="Resolved" />
        </View>
      </ScrollView>
      <BottomNavigation active="complaints" onTabPress={goTo} />
    </View>
  );
}

function HistoryItem({ id, title, status, pending = false }: { id: string; title: string; status: string; pending?: boolean }) { return <View style={styles.historyItem}><View><Text style={styles.historyTitle}>{title}</Text><Text style={styles.historyId}>Complaint ID: {id}</Text></View><Text style={[styles.statusBadge, pending ? styles.pending : styles.resolved]}>{status}</Text></View>; }
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: theme.colors.background }, scrollView: { flex: 1 }, content: { flexGrow: 1, padding: theme.spacing.lg, paddingBottom: 120 }, eyebrow: { color: theme.colors.primary, fontSize: 12, fontWeight: '700', marginBottom: 5 }, title: { color: theme.colors.text, fontSize: 26, fontWeight: '800', marginBottom: theme.spacing.xl }, sectionTitle: { color: theme.colors.text, fontSize: 17, fontWeight: '800', marginBottom: theme.spacing.sm },
  formCard: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1, marginBottom: theme.spacing.xl, padding: theme.spacing.md }, label: { color: theme.colors.text, fontSize: 13, fontWeight: '700', marginBottom: 8 }, categories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: theme.spacing.md }, chip: { borderColor: theme.colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 7 }, chipSelected: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }, chipText: { color: theme.colors.textMuted, fontSize: 12 }, chipTextSelected: { color: '#FFFFFF', fontWeight: '700' }, input: { backgroundColor: theme.colors.background, borderColor: theme.colors.border, borderRadius: theme.radius.sm, borderWidth: 1, color: theme.colors.text, marginBottom: theme.spacing.md, paddingHorizontal: 12, paddingVertical: 11 }, description: { height: 96 }, success: { color: theme.colors.success, fontSize: 13, fontWeight: '700', marginBottom: theme.spacing.sm },
  historyCard: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderRadius: theme.radius.md, borderWidth: 1 }, historyItem: { alignItems: 'center', borderBottomColor: theme.colors.border, borderBottomWidth: 1, flexDirection: 'row', justifyContent: 'space-between', padding: theme.spacing.md }, historyTitle: { color: theme.colors.text, fontSize: 14, fontWeight: '700', marginBottom: 4 }, historyId: { color: theme.colors.textMuted, fontSize: 12 }, statusBadge: { borderRadius: 999, fontSize: 12, fontWeight: '700', overflow: 'hidden', paddingHorizontal: 10, paddingVertical: 5 }, pending: { backgroundColor: '#FEF3C7', color: '#92400E' }, resolved: { backgroundColor: '#DCFCE7', color: '#166534' },
});
