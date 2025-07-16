// import React from 'react';



// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;


//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;









import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Adjust the path as needed

const Modal = ({ isOpen, onClose, title, children }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`rounded-lg p-6 w-full max-w-md mx-4 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className={`transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
