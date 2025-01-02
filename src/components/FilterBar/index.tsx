import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../utils/colors';
import {createStyles} from './styles';

export const FilterBar = ({
  filter,
  setFilter,
  dateRange,
  setDateRange,
  showFromPicker,
  setShowFromPicker,
  showToPicker,
  setShowToPicker,
}: any) => {
  const {theme} = useTheme();
  const styles = createStyles();
  const [showDateFilters, setShowDateFilters] = useState(false);

  const handleDateChange = (
    event: any,
    selectedDate: Date | undefined,
    type: string,
  ) => {
    if (type === 'from') {
      setShowFromPicker(false);
      if (selectedDate) {
        // For "from" date, ensure it's not after the "to" date
        if (selectedDate <= dateRange.to) {
          setDateRange((prev: any) => ({...prev, from: selectedDate}));
          setShowDateFilters(true);
        } else {
          // If selected date is after "to" date, set both dates to the selected date
          setDateRange((prev: any) => ({
            from: selectedDate,
            to: selectedDate,
          }));
        }
      }
    } else {
      setShowToPicker(false);
      if (selectedDate) {
        // For "to" date, ensure it's not before the "from" date
        if (selectedDate >= dateRange.from) {
          setDateRange((prev: any) => ({...prev, to: selectedDate}));
          setShowDateFilters(true);
        } else {
          // If selected date is before "from" date, set both dates to the selected date
          setDateRange((prev: any) => ({
            from: selectedDate,
            to: selectedDate,
          }));
        }
      }
    }
  };

  // Get maximum date for "from" picker (cannot be after "to" date)
  const getFromPickerMaxDate = () => {
    return dateRange.to;
  };

  // Get minimum date for "to" picker (cannot be before "from" date)
  const getToPickerMinDate = () => {
    return dateRange.from;
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterSection}>
        <View style={styles.typeFilters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filter === 'all' ? theme.PURPLE : theme.INPUT_BACKGROUND,
              },
            ]}
            onPress={() => setFilter('all')}>
            <Icon
              name="list"
              size={20}
              color={filter === 'all' ? theme.SECONDARY : theme.TEXT}
            />
            <Text
              style={[
                styles.buttonText,
                {color: filter === 'all' ? theme.SECONDARY : theme.TEXT},
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filter === 'income' ? theme.SUCCESS : theme.INPUT_BACKGROUND,
              },
            ]}
            onPress={() => setFilter('income')}>
            <Icon
              name="trending-up"
              size={20}
              color={filter === 'income' ? theme.SECONDARY : theme.TEXT}
            />
            <Text
              style={[
                styles.buttonText,
                {color: filter === 'income' ? theme.SECONDARY : theme.TEXT},
              ]}>
              Income
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filter === 'expense' ? theme.ERROR : theme.INPUT_BACKGROUND,
              },
            ]}
            onPress={() => setFilter('expense')}>
            <Icon
              name="trending-down"
              size={20}
              color={filter === 'expense' ? theme.SECONDARY : theme.TEXT}
            />
            <Text
              style={[
                styles.buttonText,
                {color: filter === 'expense' ? theme.SECONDARY : theme.TEXT},
              ]}>
              Expense
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateFilterContainer}>
          <TouchableOpacity
            style={[styles.dateFilterButton, {backgroundColor: theme.PURPLE}]}
            onPress={() => setShowFromPicker(true)}>
            <Icon name="event" size={20} color={theme.SECONDARY} />
            <Text style={[styles.dateButtonText, {color: theme.SECONDARY}]}>
              From Date
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateFilterButton, {backgroundColor: theme.PURPLE}]}
            onPress={() => setShowToPicker(true)}>
            <Icon name="event" size={20} color={theme.SECONDARY} />
            <Text style={[styles.dateButtonText, {color: theme.SECONDARY}]}>
              To Date
            </Text>
          </TouchableOpacity>
        </View>

        {showDateFilters && (
          <View style={styles.dateDisplay}>
            <View
              style={[
                styles.dateCard,
                {backgroundColor: theme.INPUT_BACKGROUND},
              ]}>
              <Text style={[styles.dateLabel, {color: theme.TEXT}]}>From</Text>
              <Text style={[styles.dateValue, {color: theme.TEXT}]}>
                {dateRange.from.toLocaleDateString()}
              </Text>
            </View>
            <Icon
              name="arrow-forward"
              size={24}
              color={theme.TEXT}
              style={styles.arrowIcon}
            />
            <View
              style={[
                styles.dateCard,
                {backgroundColor: theme.INPUT_BACKGROUND},
              ]}>
              <Text style={[styles.dateLabel, {color: theme.TEXT}]}>To</Text>
              <Text style={[styles.dateValue, {color: theme.TEXT}]}>
                {dateRange.to.toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={dateRange.from}
          mode="date"
          onChange={(event, date) => handleDateChange(event, date, 'from')}
          maximumDate={getFromPickerMaxDate()}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          value={dateRange.to}
          mode="date"
          onChange={(event, date) => handleDateChange(event, date, 'to')}
          minimumDate={getToPickerMinDate()}
        />
      )}
    </View>
  );
};
