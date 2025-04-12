import React from "react";
import { Link } from "react-router-dom";
import { deleteCourse } from "@/services/api";


const CourseCard = ({ course, onCourseDeleted }) => {
  const handleDelete = async (courseId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce cours ?")) {
      try {
        await deleteCourse(courseId);
        onCourseDeleted(courseId); 
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression du cours");
      }
    }
  };
  return (
    <>
   
     
        {" "}
        {course.map((course) => (
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
            <div className="course-actions">
          <Link to={`/edit-course/${course.id}`}>
       <button className="edit-btn">
    Modifier
  </button>
</Link>
<button
              onClick={() => handleDelete(course.id)}
              className="delete-btn"
            >
              Supprimer
            </button>
            </div>
          </div>
        ))}
   
    </>
  );
};

export default CourseCard;

