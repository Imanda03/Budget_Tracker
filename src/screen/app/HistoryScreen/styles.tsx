import {StyleSheet} from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      //   padding: 16,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '50%',
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '500',
      marginTop: 16,
    },
  });
};
