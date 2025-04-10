import React from 'react';
import CourseList from '../components/courses/CourseList';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Course Platform</h1>
      <CourseList />
    </div>
  );
};

export default Home;