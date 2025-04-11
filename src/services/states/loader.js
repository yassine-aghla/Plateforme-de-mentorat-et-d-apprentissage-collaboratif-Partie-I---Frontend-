import { getCourseStats, getCategoryStats, getTagStats } from '../api';

export const statsLoader = async () => {
  const [courses, categories, tags] = await Promise.all([
    getCourseStats(),
    getCategoryStats(),
    getTagStats()
  ]);
  
  return {
    courses: courses.data.stats,
    categories: categories.data.stats,
    tags: tags.data.stats
  };
};