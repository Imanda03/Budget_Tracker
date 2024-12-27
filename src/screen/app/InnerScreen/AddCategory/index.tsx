import React, {useState} from 'react';
import {View} from 'react-native';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import {createStyles} from './styles';
import AddCategoryForm from '../../../../components/CategoryForm';
import AuthHeader from '../../../../components/core/AuthHeader';

const AddCategories = () => {
  const styles = createStyles();
  return (
    <BackgroundWrapper>
      <AuthHeader title="Add Category" />
      <View style={styles.container}>
        <AddCategoryForm />
      </View>
    </BackgroundWrapper>
  );
};

export default AddCategories;
