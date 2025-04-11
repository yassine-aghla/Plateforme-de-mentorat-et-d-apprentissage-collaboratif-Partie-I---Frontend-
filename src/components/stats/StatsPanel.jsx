import React, { useEffect, useState } from 'react';
import { getCourseStats, getCategoryStats, getTagStats } from '../../services/api';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import StatCard from './StatCard';

const StatsPanel = () => {
  const [stats, setStats] = useState({
    courses: null,
    categories: null,
    tags: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [courses, categories, tags] = await Promise.all([
          getCourseStats(),
          getCategoryStats(),
          getTagStats()
        ]);

        setStats({
          courses: courses.data.stats,
          categories: categories.data.stats,
          tags: tags.data.stats
        });
      } catch (err) {
        console.error("Erreur lors du chargement des stats:", err);
        setError(err.message || "Erreur de chargement des statistiques");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!stats.courses || !stats.categories || !stats.tags) {
    return <div>Aucune donnée statistique disponible</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Cours" stats={stats.courses} />
      <StatCard title="Catégories" stats={stats.categories} />
      <StatCard title="Tags" stats={stats.tags} />
    </div>
  );
};

export default StatsPanel;