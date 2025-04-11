import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Courses from './components/courses/CourseList';
import CourseDetail from './pages/CourseDetail';
import Categories from './pages/Categories';
import CourseForm from './components/courses/CourseForm';
import Tags from './pages/Tags';
import Stats from './pages/Stats';





const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/formulaire" element={<CourseForm />} />
            <Route path="/tags" element={<Tags />} />

<Route  path="/stats" element={<Stats />}
/>
           

          
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;