import React from 'react';
import {View, ScrollView} from 'react-native';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import {createStyles} from './styles';
import {AddCategory, Category} from '../../../../components/CategoryComponent';
import AuthHeader from '../../../../components/core/AuthHeader';

const Categories = ({navigation}: any) => {
  const styles = createStyles();

  const handleAddCategory = () => {
    // Implement add category logic
    navigation.navigate('AddCategoryForm');
  };

  const categories = [
    {id: '1', title: 'Shopping'},
    {id: '2', title: 'Transport'},
    {id: '3', title: 'Food'},
    {id: '4', title: 'Entertainment'},
  ];

  return (
    <BackgroundWrapper>
      <AuthHeader title="Category List" />
      <AddCategory onPress={handleAddCategory} />
      <ScrollView style={styles.container}>
        {categories.map(category => (
          <Category
            key={category.id}
            title={category.title}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Categories;
