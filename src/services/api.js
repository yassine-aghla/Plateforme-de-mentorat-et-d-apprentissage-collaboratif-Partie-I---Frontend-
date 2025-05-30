import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getCourses = () => api.get('/courses');

export const getCourse = (id) => api.get(`/courses/${id}`);
// export const createCourse = (data) => api.post('/courses', data);
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
// export const getCourseById = (id) => axios.get(`/api/courses/${id}`);
export const getCourseById = (id) => api.get(`/courses/${id}`);


export const getCourseStats = () => api.get('/stats/courses');
export const getCategoryStats = () => api.get('/stats/categories');
export const getTagStats = () => api.get('/stats/tags');


export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};


// Fonction pour récupérer les catégories
export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data; 
  } catch (error) {
    console.error("Erreur dans getCategories:", error);
    throw error;
  }
};

// Fonction pour récupérer les tags
export const getTags = async () => {
  try {
    const response = await api.get('/tags');
    return response.data;
  } catch (error) {
    console.error("Erreur dans getTags:", error);
    throw error;
  }
};


export default api;