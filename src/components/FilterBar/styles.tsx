import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      paddingVertical: 16,
    },
    filterSection: {
      gap: 16,
    },
    typeFilters: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 25,
      flex: 0.3,
      justifyContent: 'center',
    },
    buttonText: {
      marginLeft: 6,
      fontWeight: '600',
    },
    dateFilterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      //   justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 12,
      marginBottom: 8,
      paddingHorizontal: 12,
    },
    dateButtonText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '600',
    },
    dateDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    dateCard: {
      flex: 0.45,
      padding: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    dateLabel: {
      fontSize: 14,
      opacity: 0.7,
      marginBottom: 4,
    },
    dateValue: {
      fontSize: 16,
      fontWeight: '600',
    },
    arrowIcon: {
      marginHorizontal: 8,
    },
  });
};
