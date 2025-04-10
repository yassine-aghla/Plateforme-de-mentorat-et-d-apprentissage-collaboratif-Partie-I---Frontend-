import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse, getCategories } from '@/services/api';

const Formulaire = () => {
  const navigate = useNavigate();
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
    // tags: []
  });

  const [categories, setCategories] = useState([]);
  // const [allTags, setAllTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Charger les catégories et tags au montage du composant
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Début du chargement des catégories...");
        const catResponse = await getCategories();
        console.log("Réponse reçue:", catResponse);
        setCategories(catResponse.data);
      } catch (err) {
        console.error("Erreur complète:", err);
        console.error("Message d'erreur:", err.message);
        console.error("Réponse d'erreur:", err.response);
        setError("Erreur lors du chargement des données: " + (err.message || "Erreur inconnue"));
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleTagChange = (tagId) => {
  //   setFormData(prev => {
  //     const newTags = prev.tags.includes(tagId)
  //       ? prev.tags.filter(id => id !== tagId)
  //       : [...prev.tags, tagId];
  //     return { ...prev, tags: newTags };
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await createCourse(formData);
      navigate("/courses"); // Rediriger vers la liste des cours après création
    } catch (err) {
      console.error("Erreur complète:", err);
      console.error("Réponse serveur:", err.response);
      setError(err.response?.data?.message || 
              err.message || 
              "Erreur technique lors de la création du cours");
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Créer un nouveau cours</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Titre:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Contenu (HTML/Markdown):</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>URL de la vidéo:</label>
          <input
            type="url"
            name="video"
            value={formData.video}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>URL de l'image de couverture:</label>
          <input
            type="url"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Durée (heures):</label>
          <input
            type="number"
            step="0.01"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Niveau:</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>
        </div>

        <div className="form-group">
          <label>Catégorie:</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="form-group">
          <label>Tags:</label>
          <div className="tags-container">
            {allTags.map(tag => (
              <div key={tag.id} className="tag-option">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={formData.tags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div> */}

        <div className="form-group">
          <label>Statut:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="draft">Brouillon</option>
            <option value="published">Publié</option>
            <option value="archived">Archivé</option>
          </select>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Créer le cours"}
        </button>
      </form>
    </div>
  );
};

export default Formulaire;