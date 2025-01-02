import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 13,
      marginVertical: 4,
      borderRadius: 12,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    details: {
      marginLeft: 12,
    },
    category: {
      fontSize: 16,
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      opacity: 0.7,
    },
    rightContent: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: 16,
      fontWeight: '600',
    },
    date: {
      fontSize: 12,
      opacity: 0.7,
      marginTop: 4,
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    rightAction: {
      // backgroundColor: theme.ERROR,
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      height: '100%',
      borderRadius: 8,
      marginVertical: 4,
      // opacity: 0.5,
    },
    deleteText: {
      color: theme.ERROR,
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 4,
    },
  });
};
