// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';

// const TaskForm = ({ task, onSubmit, onCancel }) => {
//   const { setCeleberate } = useAuth();
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'pending',
//   });

//   useEffect(() => {
//     if (task) {
//       setFormData({
//         title: task.title || '',
//         description: task.description || '',
//         status: task.status || 'pending',
//       });
//     }
//   }, [task]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title.trim()) return;
//     if (formData.status === "completed"){
//       setCeleberate(true);
//     }
//     onSubmit(formData);
//   };

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Title *
//         </label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter task title"
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Description
//         </label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows="3"
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter task description"
//         />
//       </div>

//       {task && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Status
//           </label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="pending">Pending</option>
//             <option value="completed">Completed</option>
//           </select>
//         </div>
//       )}

//       <div className="flex justify-end space-x-3">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           {task ? 'Update' : 'Create'} Task
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TaskForm;






import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // 👈 Import ThemeContext

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const { setCeleberate } = useAuth();
  const { theme } = useTheme(); // 👈 Destructure theme
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pending',
      });
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    if (formData.status === 'completed') {
      setCeleberate(true);
    }
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses = `w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400'
      : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'
  }`;

  const labelClasses = `block text-sm font-medium mb-1 ${
    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
  }`;

  const cancelBtnClasses = `px-4 py-2 border rounded-md hover:bg-opacity-80 transition-colors duration-300 ${
    theme === 'dark'
      ? 'text-gray-300 border-gray-600 bg-gray-800 hover:bg-gray-700'
      : 'text-gray-600 border-gray-300 hover:bg-gray-50'
  }`;

  const submitBtnClasses = `px-4 py-2 text-white rounded-md transition-colors duration-300 ${
    theme === 'dark'
      ? 'bg-blue-600 hover:bg-blue-700'
      : 'bg-blue-600 hover:bg-blue-700'
  }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 transition-colors duration-500"
    >
      <div>
        <label className={labelClasses}>Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Enter task title"
          required
        />
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className={inputClasses}
          placeholder="Enter task description"
        />
      </div>

      {task && (
        <div>
          <label className={labelClasses}>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      )}

      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className={cancelBtnClasses}>
          Cancel
        </button>
        <button type="submit" className={submitBtnClasses}>
          {task ? 'Update' : 'Create'} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
