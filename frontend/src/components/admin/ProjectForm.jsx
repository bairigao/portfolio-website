import { useState, useEffect } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "@/services/api";

const ProjectForm = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech_stack: "",
    date: "",
    github_url: "",
    live_url: "",
    image_url: ""
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateProject(editingId, formData);
      } else {
        await createProject(formData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      tech_stack: "",
      date: "",
      github_url: "",
      live_url: "",
      image_url: ""
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full p-2 rounded bg-gray-700"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
          />
        </div>

        <div>
          <label className="block mb-1">Tech Stack</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.tech_stack}
            onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Date finished</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">GitHub URL</label>
          <input
            type="url"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.github_url}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Live URL</label>
          <input
            type="url"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.live_url}
            onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="url"
            className="w-full p-2 rounded bg-gray-700"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-700 p-4 rounded flex justify-between items-start">
              <div>
                <h4 className="font-bold">{project.title}</h4>
                <p className="text-sm text-gray-300">{project.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default ProjectForm;