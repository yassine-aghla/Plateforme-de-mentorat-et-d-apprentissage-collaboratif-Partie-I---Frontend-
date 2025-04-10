import React from 'react';

const CategoryCard = ({category}) => {


return (
    <div className="category-card">
    <h3>{category.name}</h3>
    {category.description && (
      <p className="description">{category.description}</p>
    )}
  </div>
);
};

export default CategoryCard;

