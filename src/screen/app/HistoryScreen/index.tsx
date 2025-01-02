import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text, ListRenderItem} from 'react-native';
import BackgroundWrapper from '../../../components/BackgroundWrapper';
import {FilterBar} from '../../../components/FilterBar';
import {TransactionItem} from '../../../components/TransactionItem';
import {createStyles} from './styles';
import {useTheme} from '../../../utils/colors';
import {useQuery} from 'react-query';
import {getTransaction} from '../../../services/TransactionService';
import {Transaction} from '../../../utils/types';
import {MaterialIcons} from '../../../utils/Icon';

const HistoryScreen = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  const {data: transactionsData = []} = useQuery(
    ['TransactionList'],
    getTransaction,
  );

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

  const filteredTransactions = transactionsData.filter(
    (transaction: Transaction) => {
      if (transactionsData.length === 0) return true;

      // Convert string date to Date object if it isn't already
      const transactionDate =
        typeof transaction.date === 'string'
          ? new Date(transaction.date)
          : new Date(transaction.date);

      // Create new Date objects for comparison to avoid mutation
      const normalizedTransDate = new Date(
        transactionDate.setHours(0, 0, 0, 0),
      );
      const normalizedFromDate = new Date(
        new Date(dateRange.from).setHours(0, 0, 0, 0),
      );
      const normalizedToDate = new Date(
        new Date(dateRange.to).setHours(0, 0, 0, 0),
      );

      const isInDateRange =
        normalizedTransDate >= normalizedFromDate &&
        normalizedTransDate <= normalizedToDate;
      const matchesType = filter === 'all' || transaction.type === filter;

      return isInDateRange && matchesType;
    },
  );
  const renderItem: ListRenderItem<Transaction> = ({item}) => (
    <TransactionItem transaction={item} />
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="receipt-long" size={64} color={theme.PURPLE} />
      <Text style={[styles.emptyText, {color: theme.TEXT}]}>
        No transactions found
      </Text>
    </View>
  );

  const keyExtractor = (item: Transaction) => item.id.toString();

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
      <FlatList
        data={filteredTransactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        // Performance props
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
        initialNumToRender={10}
        onRefresh={() => {
          // Add your refresh logic here
        }}
        refreshing={false}
        ListFooterComponent={<View style={{height: 150}} />}
      />
    </BackgroundWrapper>
  );
};

export default HistoryScreen;
