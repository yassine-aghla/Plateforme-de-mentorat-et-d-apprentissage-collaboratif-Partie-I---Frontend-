import React, { useEffect, useState } from 'react'
import {getCategories} from '../../services/api';
import  CategoryCard  from './CategoryCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';


const CategoryList = () => {

const [categories, setCategory]=useState([]);
const [loading, setLoading]= useState(true);
const [error,setError]=useState(null);

useEffect(()=>{

  const fetchCategory = async () => {
    try {
      const response = await getCategories();
      setCategory(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCategory();
},[]);


if(loading)return <Loader/>;
if (error) return <ErrorMessage/>;







  return (
    <div className="categories-grid">
    {categories.map((category) => (
      <CategoryCard key={category.id} category={category} />
    ))}
  </div>
  );
};

export default CategoryList;