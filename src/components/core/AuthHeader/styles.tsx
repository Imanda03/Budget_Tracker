import {StyleSheet} from 'react-native';
import {useTheme} from '../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      // backgroundColor: theme.BACKGROUND,
      height: '8%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      // flexGrow: 1,
    },
    title: {
      color: theme.TEXT,
      fontWeight: 'bold',
      fontSize: 22,
    },
  });
};
