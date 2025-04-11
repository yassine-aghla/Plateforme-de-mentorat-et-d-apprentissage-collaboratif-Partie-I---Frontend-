import React from 'react';

const CategoryCard = ({tag}) => {


return (
    <div className="category-card">
    <h3>{tag.name}</h3>
    
  </div>
);
};

export default CategoryCard;