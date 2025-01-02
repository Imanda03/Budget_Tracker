import {StyleSheet} from 'react-native';

export const createStyles = () => {
  return StyleSheet.create({
    container: {
      flexGrow: 1,
      // paddingHorizontal: 16,
      // paddingBottom: 16,
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
