import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {createStyles} from './styles';
import {AntDesignIcon} from '../../utils/Icon';
import EditableBox from '../core/EditableBox';
import ButtonIconComponent from '../core/ButtonIcon';
import {useTheme} from '../../utils/colors';

const ProfileInformation = () => {
  const styles = createStyles();
  const {theme} = useTheme();
  const [editing, setEditing] = useState<boolean>(false);
  const [values, setValues] = useState({
    name: 'Anish Sharma',
    email: 'asis03ktm@gmail.com',
    contact: '9803708637',
    address: 'Gongabu, Ktm',
  });

  const onEditPress = () => {
    setEditing(true);
  };
  const onChange = (key: string, value: string) => {
    setValues(prevValues => ({...prevValues, [key]: value}));
  };

  const onSave = () => {};

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
        onChangeText={(v: string) => onChange('name', v)}
        value={values.name}
        editable={editing}
      />
      <EditableBox
        label="Address"
        onChangeText={(v: string) => onChange('address', v)}
        value={values.address}
        editable={editing}
      />
      <EditableBox
        label="Contact Number"
        onChangeText={(v: string) => onChange('contact', v)}
        value={values.contact}
        editable={editing}
      />
      <EditableBox
        label="Email"
        onChangeText={(v: string) => onChange('email', v)}
        value={values.email}
        editable={editing}
      />
      {editing && <ButtonIconComponent title="Save" onPress={onSave} />}
    </>
  );
};

export default ProfileInformation;
