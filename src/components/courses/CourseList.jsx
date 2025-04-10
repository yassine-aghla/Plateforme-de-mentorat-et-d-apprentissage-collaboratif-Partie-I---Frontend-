import React, { useState, useEffect } from 'react';
import { getCourses } from '../../services/api';
import CourseCard from './CourseCard';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data.data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="course-header">
        <h2>Liste des Cours</h2>
        <button
              onClick={() => navigate("/formulaire")}
              className="go-to-form-button"
            >
              Ajouter Un Course 
            </button>
      
      </div>
    <div className="course-list">
        <CourseCard course={courses} />
    </div>
    </div>


  );
};





export default CourseList;