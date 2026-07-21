import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import QuotaCard from '../../components/common/QuotaCard';
import ScreenContainer from '../../components/layout/ScreenContainer';
import { QuotaItem } from '../../types';

const mockQuota: QuotaItem[] = [
  { id: '1', itemName: 'Rice', allocated: 5, consumed: 2, unit: 'kg', month: 'July 2026' },
  { id: '2', itemName: 'Wheat', allocated: 3, consumed: 1, unit: 'kg', month: 'July 2026' },
  { id: '3', itemName: 'Sugar', allocated: 1, consumed: 0.5, unit: 'kg', month: 'July 2026' },
];

export default function QuotaScreen() {
  return (
    <ScreenContainer title="Monthly Quota" subtitle="July 2026 allocation">
      <FlatList
        data={mockQuota}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <QuotaCard
            itemName={item.itemName}
            allocated={item.allocated}
            consumed={item.consumed}
            unit={item.unit}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ list: { paddingBottom: 24 } });
