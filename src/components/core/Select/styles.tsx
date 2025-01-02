import {StyleSheet} from 'react-native';
import {useTheme} from '../../../utils/colors';

export const createStyles = () => {
  const {theme} = useTheme();
  return StyleSheet.create({
    container: {
      marginVertical: 12,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.TEXT,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 60,
      borderRadius: 12,
      backgroundColor: theme.INPUT_BACKGROUND,
      paddingHorizontal: 16,
      //   borderWidth: 1.5,
      //   shadowColor: theme.TEXT,
      //   shadowOffset: {width: 0, height: 2},
      //   shadowOpacity: 0.1,
      //   shadowRadius: 4,
      //   elevation: 3,
    },
    input: {
      flex: 1,
      color: theme.TEXT,
      fontSize: 16,
      fontWeight: '500',
    },
    placeholderText: {
      flex: 1,
      color: theme.PLACEHOLDER_COLOR,
      fontSize: 16,
    },
    errorText: {
      color: theme.ERROR,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: theme.LIST_BG,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 20,
      maxHeight: '70%',
    },
    modalHeader: {
      paddingHorizontal: 20,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.BORDER_COLOR,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.TEXT,
      textAlign: 'center',
    },
    optionItem: {
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.BORDER_COLOR,
    },
    optionText: {
      fontSize: 16,
      color: theme.TEXT,
      fontWeight: '600',
    },
    selectedOption: {
      backgroundColor: `${theme.PRIMARY}20`,
    },
    selectedOptionText: {
      color: theme.PRIMARY,
      fontWeight: '500',
    },
    closeButton: {
      marginHorizontal: 20,
      marginVertical: 16,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: theme.PRIMARY,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });
};
