// import React, { useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
 
//  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const CreateRoom = () => {
//   const [link, setLink] = useState('')
//   const [loading, setLoading] = useState(false)
// const navigate = useNavigate();
// const createroom = () => {
//   setLoading(true);

//   navigator.geolocation.getCurrentPosition(
//     async ({ coords }) => {
//       try {
//         const res = await axios.post(
//           `${BACKEND_URL}/room/create`,
//           {
//             lat: coords.latitude,
//             long: coords.longitude,
//           }
//         );

//         navigate(`/room/join/${res.data.room.roomId}`);
//         setLink(res.data.link);
//       }  
//       catch (err) {
//       console.error("AXIOS ERROR 👉", err);
//           console.error("RESPONSE 👉", err?.response);
//         alert(err?.response?.data?.message || "Failed to create room");
//           }

//     },
//     () => {
//       alert("Location permission denied");
//       setLoading(false);
//     }
//   );
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">

//         <h1 className="text-2xl font-bold text-gray-800 mb-2">
//           Create a Live Room
//         </h1>
//         <p className="text-sm text-gray-500 mb-6">
//           Start a location-based chat room instantly
//         </p>

//         <button
//           onClick={createroom}
//           disabled={loading}
//           className={`w-full py-3 rounded-full text-white font-semibold transition
//             ${loading
//               ? 'bg-gray-400 cursor-not-allowed'
//               : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
//             }`}
//         >
//           {loading ? 'Creating room...' : 'Create Room'}
//         </button>

//         {link && (
//           <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
//             <p className="text-xs text-gray-500 mb-2">
//               Share this link to join
//             </p>

//             <a href={link} target="_blank" rel="noopener noreferrer">
//   {link}
// </a>

//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CreateRoom
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateRoom = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createRoom = () => {
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await axios.post(`${BACKEND_URL}/room/create`, {
            lat: coords.latitude,
            long: coords.longitude,
          });

          // Save shareable link
          // setLink(res.data.link);

          // setLoading(false);

          // // Navigate to room automatically if desired
          // navigate(`/room/join/${res.data.room.roomId}`);
          const roomId = res.data.room.roomId;

const shareLink = `${window.location.origin}/room/join/${roomId}`;
setLink(shareLink);
setTimeout(() => {
  navigate(`/room/join/${res.data.room.roomId}`);
}, 2000); // wait 2 seconds to show link
        } catch (err) {
          console.error(err);
          alert(err?.response?.data?.message || "Failed to create room");
          setLoading(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLoading(false);
      }
    );
  };

  const copyLink = () => {
    if (link) navigator.clipboard.writeText(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create a Live Room</h1>
        <p className="text-sm text-gray-500 mb-6">Start a location-based chat room instantly</p>

        <button
          onClick={createRoom}
          disabled={loading}
          className={`w-full py-3 rounded-full text-white font-semibold transition
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
        >
          {loading ? 'Creating room...' : 'Create Room'}
        </button>

        {link && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-gray-500 mb-2">Share this link to join:</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-indigo-700 break-all">
              {link}
            </a>
            <button
              onClick={copyLink}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-full text-sm"
            >
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;