import { useState, useEffect } from "react";
import { getExperience, createExperience, updateExperience, deleteExperience } from "@/services/api";

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: ""
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await getExperience();
      setExperiences(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch experiences' });
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);
    setFormData({
      title: experience.title,
      company: experience.company,
      start_date: experience.start_date,
      end_date: experience.end_date || "",
      description: experience.description || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id);
        setMessage({ type: 'success', text: 'Experience deleted successfully!' });
        await fetchExperiences();
      } catch (error) {
        console.error('Error deleting experience:', error);
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.error || 'Failed to delete experience' 
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      // Validate required fields
      if (!formData.title || !formData.company || !formData.start_date) {
        setMessage({ 
          type: 'error', 
          text: 'Title, company, and start date are required' 
        });
        return;
      }

      const payload = {
        ...formData,
        // Ensure end_date is null/empty if not provided
        end_date: formData.end_date || null
      };

      if (editingId) {
        await updateExperience(editingId, payload);
        setMessage({ type: 'success', text: 'Experience updated successfully!' });
      } else {
        await createExperience(payload);
        setMessage({ type: 'success', text: 'Experience created successfully!' });
      }

      // Reset form and refresh experiences
      setFormData({
        title: "",
        company: "",
        start_date: "",
        end_date: "",
        description: ""
      });
      setEditingId(null);
      await fetchExperiences();

    } catch (error) {
      console.error('Error saving experience:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to save experience' 
      });
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {editingId ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>

      {/* Display existing experiences */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Experiences</h3>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-gray-700 p-4 rounded flex justify-between items-start">
              <div>
                <h4 className="font-bold">{exp.title}</h4>
                <p className="text-sm text-gray-300">{exp.company}</p>
                <p className="text-sm text-gray-400">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-400 mt-2">{exp.description}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;