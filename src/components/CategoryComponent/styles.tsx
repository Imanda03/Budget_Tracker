import {StyleSheet} from 'react-native';
import {useTheme} from '../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      marginVertical: 8,
      borderRadius: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButton: {
      marginLeft: 16,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 12,
      marginVertical: 8,
    },
    addText: {
      marginLeft: 8,
      fontSize: 16,
      fontWeight: '500',
    },
  });
};
