import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createStyles} from './styles';
import {AntDesignIcon} from '../../utils/Icon';
import EditableBox from '../core/EditableBox';
import ButtonIconComponent from '../core/ButtonIcon';
import {useTheme} from '../../utils/colors';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {getUserDetails, updateProfile} from '../../services/AuthService';
import {useToast} from '../../context/ToastContext';
import {currentUserPayload} from '../../utils/types';

interface ProfileInformationProps {
  onProfileUpdate?: () => void;
}

const ProfileInformation = ({onProfileUpdate}: ProfileInformationProps) => {
  const styles = createStyles();
  const {theme} = useTheme();
  const {showToast} = useToast();
  const [editing, setEditing] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery(['UserProfile'], getUserDetails, {
    enabled: true,
  });
  console.log(data);
  const [values, setValues] = React.useState<currentUserPayload>(() => ({
    fullName: data?.fullName || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    address: data?.address || '',
  }));

  React.useEffect(() => {
    if (data) {
      setValues({
        fullName: data.fullName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
      });
    }
  }, [data]);

  const mutation = useMutation(updateProfile, {
    onSuccess: async response => {
      await queryClient.invalidateQueries(['UserProfile']);
      if (onProfileUpdate) {
        onProfileUpdate();
      }
      setEditing(false);
      showToast(response.message, 'success');
    },
    onError: error => {
      showToast('Unable to update profile', 'error');
    },
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const onEditPress = () => setEditing(!editing);
  const onChange = (key: string, value: string) => {
    setValues(prev => ({...prev, [key]: value}));
  };
  const onSave = () => mutation.mutate(values);

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TouchableOpacity onPress={onEditPress} activeOpacity={0.5}>
          <AntDesignIcon name="edit" color={theme.TEXT} size={24} />
        </TouchableOpacity>
      </View>

      <EditableBox
        label="Name"
        onChangeText={(v: string) => onChange('fullName', v)}
        value={values.fullName}
        editable={editing}
      />
      <EditableBox
        label="Address"
        onChangeText={(v: string) => onChange('address', v)}
        value={values.address}
        editable={editing}
      />
      <EditableBox
        label="Contact"
        onChangeText={(v: string) => onChange('phoneNumber', v)}
        value={String(values.phoneNumber)}
        editable={editing}
      />
      <EditableBox
        label="Email"
        onChangeText={(v: string) => onChange('email', v)}
        value={values.email}
        editable={editing}
      />
      {editing && (
        <ButtonIconComponent
          marginTop={14}
          title="Save"
          onPress={onSave}
          loading={mutation.isLoading}
        />
      )}
    </>
  );
};

export default ProfileInformation;
