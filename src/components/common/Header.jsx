import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/courses/id">CoursesDetail</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/stats">Stats</Link>
      </nav>
    </header>
  );
};

export default Header;