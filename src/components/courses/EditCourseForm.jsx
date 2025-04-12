import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById, updateCourse, getCategories } from "@/services/api";

const EditCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    video: "",
    cover: "",
    duration: 0,
    level: "beginner",
    category_id: "",
    status: "draft",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, categoriesRes] = await Promise.all([
          getCourseById(id),
          getCategories(),
        ]);

        // Debug: Affichez la réponse de l'API
        console.log("Course data:", courseRes.data);

        // Ajustez selon la structure de votre API
        setFormData(courseRes.data.data || courseRes.data);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        setError("Erreur lors du chargement des données.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "duration" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateCourse(id, formData);
      navigate("/courses");
    } catch (err) {
      setError("Erreur lors de la mise à jour du cours.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-form-container">
      <h2 className="text-xl font-semibold mb-4">Modifier un cours</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="edit-form-group">
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="edit-form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="edit-form-group">
          <label>Contenu</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>

        <div className="edit-form-group">
          <label>Vidéo (URL)</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="edit-form-group">
          <label>Image de couverture (URL)</label>
          <input
            type="text"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="edit-form-group">
          <label>Durée </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="edit-form-group">
          <label>Niveau</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>

        <div className="edit-form-group">
          <label>Catégorie</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-form-group">
          <label>Statut</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
          </select>
        </div>
        <div className="form-actions">
        <button className="update-button"
          type="submit"
          disabled={isSubmitting}
          
        >
          {isSubmitting ? "Mise à jour en cours..." : "Mettre à jour le cours"}
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourseForm;
