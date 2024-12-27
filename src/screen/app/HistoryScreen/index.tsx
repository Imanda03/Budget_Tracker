import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {mockTransactions, Transaction} from '../../../data/mockDate';
import {FilterBar} from '../../../components/FilterBar';
import {TransactionItem} from '../../../components/TransactionItem';
import {createStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../../utils/colors';

const HistoryScreen = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  const [filter, setFilter] = useState('all');
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const [dateRange, setDateRange] = useState({
    from: oneYearAgo,
    to: today,
  });
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const filteredTransactions = mockTransactions.filter(
    (transaction: Transaction) => {
      if (mockTransactions.length === 0) return true;

      const transactionDate = new Date(transaction.date);
      const isInDateRange =
        transactionDate >= dateRange.from && transactionDate <= dateRange.to;
      const matchesType = filter === 'all' || transaction.type === filter;
      return isInDateRange && matchesType;
    },
  );

  console.log('filterable', filteredTransactions);

  return (
    <BackgroundWrapper>
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showFromPicker={showFromPicker}
        setShowFromPicker={setShowFromPicker}
        showToPicker={showToPicker}
        setShowToPicker={setShowToPicker}
      />
      <ScrollView style={styles.container}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="receipt-long" size={64} color={theme.PURPLE} />
            <Text style={[styles.emptyText, {color: theme.TEXT}]}>
              No transactions found
            </Text>
          </View>
        )}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default HistoryScreen;
