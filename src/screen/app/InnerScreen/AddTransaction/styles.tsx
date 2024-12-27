import {StyleSheet, Dimensions} from 'react-native';
import {useTheme} from '../../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  const windowHeight = Dimensions.get('window').height;

  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: '-5%',
      // height: windowHeight - 100, // Adjust this value based on your needs
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.BACKGROUND_LIGHT,
      elevation: 14,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 20,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 20,
      marginVertical: 10,
      zIndex: 1,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
      position: 'relative',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    tabItemBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 20,
    },
    tabItemText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.TEXT,
    },
  });
};
