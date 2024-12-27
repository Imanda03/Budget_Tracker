import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      paddingVertical: 12,
      marginTop: 16,
    },
    sectionTitle: {
      fontWeight: '500',
      fontSize: 18,
      color: theme.TEXT,
      marginBottom: 16,
    },
  });
};
