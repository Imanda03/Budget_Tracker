import React from 'react';
import {View, ScrollView} from 'react-native';
import BackgroundWrapper from '../../../../components/BackgroundWrapper';
import {createStyles} from './styles';
import {AddCategory, Category} from '../../../../components/CategoryComponent';
import AuthHeader from '../../../../components/core/AuthHeader';
import {useQuery} from 'react-query';
import {getCategory} from '../../../../services/CategoryService';
import {CategoryFormData} from '../../../../utils/types';

const Categories = ({navigation}: any) => {
  const styles = createStyles();

  const handleAddCategory = () => {
    // Implement add category logic
    navigation.navigate('AddCategoryForm');
  };

  const {data: categories} = useQuery(['CategoryList'], () => getCategory());

  return (
    <BackgroundWrapper>
      <AuthHeader title="Category List" />
      <AddCategory onPress={handleAddCategory} />
      <ScrollView style={styles.container}>
        {categories?.map((category: CategoryFormData) => (
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            icon={category.icon}
            type={category.type}
            onEdit={() => {}}
          />
        ))}
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default Categories;
