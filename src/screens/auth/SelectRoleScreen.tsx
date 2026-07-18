import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import AppButton from '../../components/AppButton';

type Props = StackScreenProps<AuthStackParamList, 'SelectRole'>;

const roles = [
  { title: 'Citizen', route: 'CitizenRegistration' as keyof AuthStackParamList, description: 'Access ration quota, complaints, and notifications.' },
  { title: 'Shopkeeper', route: 'ShopkeeperRegistration' as keyof AuthStackParamList, description: 'Issue ration and manage stock for your shop.' },
  { title: 'District Officer', route: 'DistrictOfficerRegistration' as keyof AuthStackParamList, description: 'Monitor district-level ration operations.' },
  { title: 'State Admin', route: 'StateAdminRegistration' as keyof AuthStackParamList, description: 'Manage state-wide governance and reports.' },
];

export default function SelectRoleScreen({ navigation }: Props) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container} showsVerticalScrollIndicator persistentScrollbar>
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Choose your role</Text>
        <Text style={styles.title}>Select access level</Text>
        <Text style={styles.subtitle}>This Sprint 1 flow uses dummy data and routes to the registration form for each role.</Text>

        {roles.map((role) => (
          <View key={role.title} style={styles.roleCard}>
            <Text style={styles.roleTitle}>{role.title}</Text>
            <Text style={styles.roleDescription}>{role.description}</Text>
            <AppButton title={`Register as ${role.title}`} onPress={() => navigation.navigate(role.route)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#F1F5F9',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  eyebrow: {
    color: '#0F766E',
    fontWeight: '700',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 18,
    lineHeight: 20,
  },
  roleCard: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  roleDescription: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
    lineHeight: 18,
  },
});
