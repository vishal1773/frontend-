import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import AppButton from '../../components/common/AppButton';
import ScreenContainer from '../../components/layout/ScreenContainer';
import StatusPill from '../../components/common/StatusPill';
import { Complaint } from '../../types';
import { colors, radius, spacing } from '../../theme/theme';

const initialComplaints: Complaint[] = [
  { id: '1', title: 'Stock not available', description: 'Sugar was out of stock', status: 'open', createdAt: '2026-07-18' },
];

export default function ComplaintsScreen() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = () => {
    if (!title.trim()) return;
    setComplaints((prev) => [
      { id: Date.now().toString(), title, description, status: 'open', createdAt: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
    setTitle('');
    setDescription('');
  };

  return (
    <ScreenContainer title="Complaints" subtitle="Register and track grievances">
      <View style={styles.form}>
        <TextInput label="Title" mode="outlined" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput label="Description" mode="outlined" multiline value={description} onChangeText={setDescription} style={styles.input} />
        <AppButton label="Submit Complaint" onPress={submit} />
      </View>
      <FlatList
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="titleSmall" style={styles.title}>{item.title}</Text>
              <StatusPill label={item.status.replace('_', ' ')} tone={item.status === 'resolved' ? 'success' : 'warning'} />
            </View>
            <Text variant="bodySmall" style={styles.desc}>{item.description}</Text>
          </View>
        )}
        style={styles.list}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.sm, marginBottom: spacing.lg },
  input: { backgroundColor: colors.surface },
  list: { flex: 1 },
  card: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.sm },
  title: { color: colors.text, fontWeight: '600', flex: 1 },
  desc: { color: colors.textMuted, marginTop: 6 },
});
