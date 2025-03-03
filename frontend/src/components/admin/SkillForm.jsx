import { useState, useEffect } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/services/api";

const SkillForm = () => {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' }); // Add this for feedback
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon_name: "",
    level: "",
    description: ""
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await getSkills();
      setSkills(response.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to fetch skills' });
      console.error('Fetch error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      // Log the form data being sent
      console.log('Sending form data:', formData);

      if (editingId) {
        await updateSkill(editingId, formData);
        setMessage({ type: 'success', text: 'Skill updated successfully!' });
      } else {
        const response = await createSkill(formData);
        console.log('Server response:', response); // Log the response
        setMessage({ type: 'success', text: 'Skill created successfully!' });
      }

      // Reset form and refresh skills
      setFormData({
        name: "",
        category: "",
        icon_name: "",
        level: "",
        description: ""
      });
      setEditingId(null);
      await fetchSkills();

    } catch (error) {
      // Log the detailed error
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to save skill' 
      });
    }
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon_name: skill.icon_name,
      level: skill.level,
      description: skill.description
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        setMessage({ type: 'success', text: 'Skill deleted successfully!' });
        await fetchSkills();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete skill' });
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Message display */}
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Icon Name</label>
          <input
            type="text"
            value={formData.icon_name}
            onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            value={formData.level}
            onChange={(e) => setFormData({ ...formData, level: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600"
            rows="3"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingId ? 'Update Skill' : 'Add Skill'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: "",
                  category: "",
                  icon_name: "",
                  level: "",
                  description: ""
                });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Existing Skills List */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-gray-700 p-4 rounded flex justify-between items-start">
              <div>
                <h4 className="font-bold">{skill.name}</h4>
                <p className="text-sm text-gray-300">{skill.category}</p>
                {skill.level && (
                  <p className="text-sm text-blue-400">{skill.level}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
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

export default SkillForm;