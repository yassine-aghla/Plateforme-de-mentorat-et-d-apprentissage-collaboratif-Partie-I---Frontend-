 
import React, { useState, useEffect } from 'react';



import { useParams } from 'react-router-dom';


import { getCourse } from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourse(id);
        setCourse(response.data.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="course-card">
            <div className="course-header">
              <img
                src={course.cover}
                alt={course.title}
                className="course-cover"
              />
              <span className={`course-level ${course.level}`}>
                {course.level === "beginner"
                  ? "Débutant"
                  : course.level === "intermediate"
                  ? "Intermédiaire"
                   : course.level === "advanced"
                   ?
                    "Avancé"
                  :"Pas Level"}
              </span>
            </div>

            <div className="course-body">
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <span className="duration">
                  {parseFloat(course.duration)} heures
                </span>
                <span className="category">{course.category}</span>
              </div>
            </div>

            <div className="course-tags">
              {course.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
  );
};

export default CourseDetail;