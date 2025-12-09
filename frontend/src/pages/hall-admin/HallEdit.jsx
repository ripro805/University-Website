import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { hallsData } from './adminData';

const HallEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Male',
    capacity: '',
    description: '',
    established: '',
    image: ''
  });

  useEffect(() => {
    // Load hall data
    const hall = hallsData.find(h => h.id === parseInt(id));
    if (hall) {
      setFormData({
        name: hall.name,
        type: hall.type,
        capacity: hall.capacity,
        description: hall.description,
        established: hall.established,
        image: hall.image
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data to backend API
    console.log('Hall Updated:', formData);
    alert('Hall updated successfully!');
    navigate('/admin/halls');
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Edit Hall</h2>
          <button
            onClick={() => navigate('/admin/halls')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft />
            <span>Back to List</span>
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hall Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Hall Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter hall name"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Hall Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Hall Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Capacity */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              min="1"
              placeholder="Enter total capacity"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Established Year */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Established Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="established"
              value={formData.established}
              onChange={handleChange}
              required
              placeholder="e.g., 2020"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter hall description"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
            >
              <FaSave />
              <span>Update Hall</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/halls')}
              className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HallEdit;






