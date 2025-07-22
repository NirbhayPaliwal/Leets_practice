import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Participate = () => {
  const navigate=useNavigate();
  const { id } = useParams();
  const [config, setConfig] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("currentContest"));
    if (data && data.endTime) {
      setConfig(data);
      const end = new Date(data.endTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(Math.floor((end - now) / 1000), 0);
      setTimeLeft(diff);
    }
  }, []);
const [hasEnded, setHasEnded] = useState(false);



useEffect(() => {
  if (!timeLeft || hasEnded) return;

  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 55) { // change it to <=1 for normal use
        clearInterval(interval);

        if (!hasEnded) {
          setHasEnded(true);
          toast.info("Contest has ended!");

          setTimeout(() => {
            navigate("/thankyou");
          }, 1100);
        }

        return 0;
      }
      return prev - 1;
    });
  }, 800);

  return () => clearInterval(interval);
}, [timeLeft, hasEnded]);



  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/participate/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  const toSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };
   const generateFakeQuestions = (count, difficulty) => {
  const baseQuestions = {
    easy: [
      { title: "Two Sum", slug: "two-sum" },
      { title: "Palindrome Number", slug: "palindrome-number" },
      { title: "Merge Sorted Array", slug: "merge-sorted-array" }
    ],
    medium: [
      { title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters" },
      { title: "Add Two Numbers", slug: "add-two-numbers" },
      { title: "Group Anagrams", slug: "group-anagrams" }
    ],
    hard: [
      { title: "N-Queens", slug: "n-queens" },
      { title: "Word Ladder", slug: "word-ladder" },
      { title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays" }
    ]
  };

  const pool = baseQuestions[difficulty];
  return Array.from({ length: count }).map((_, i) => {
    const { title, slug } = pool[i % pool.length];
    return {
      title,
      difficulty,
      url: `https://leetcode.com/problems/${slug}/description/`
    };
  });
};

  if (!config) return <p className="p-10 text-lg text-white">Loading contest...</p>;

  const allQuestions = [
    ...generateFakeQuestions(config.easy, "easy"),
    ...generateFakeQuestions(config.medium, "medium"),
    ...generateFakeQuestions(config.hard, "hard"),
  ];

  const getBadgeColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "bg-green-600";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-600";
      default: return "bg-gray-500";
    }
  };

  const getTimeColor = () => {
    return timeLeft < 180 ? 'text-red-500' : 'text-green-400';
  };

  return (
    <section className="min-h-screen bg-darker flex items-center justify-center px-4 py-10">
      <ToastContainer />
      <div className="w-full max-w-4xl bg-darkest text-white rounded-xl shadow-lg p-10 flex flex-col justify-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-accent">Virtual Coding Contest</h1>
          {/* <p className="text-lg">Contest ID: <span className="font-mono text-yellow-300">{id}</span></p> */}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xl font-semibold">⏳ Time Remaining:</p>
            <p className={`text-3xl font-mono ${getTimeColor()}`}>{formatTime(timeLeft)}</p>
          </div>

          {/* <button
            onClick={handleCopyLink}
            className="btn btn-outline btn-accent border-white text-white hover:bg-accent hover:text-black"
          >
            🔗 Copy Contest Link
          </button> */}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold underline underline-offset-4 mb-4 text-center">📚 Problems</h2>
          <ul className={`space-y-3 w-full ${allQuestions.length <= 3 ? "flex flex-col items-center" : ""}`}>
            {allQuestions.length === 0 ? (
              <p className="text-center text-gray-400">No questions selected.</p>
            ) : (
              allQuestions.map((q, index) => (
                <li
                  key={index}
                  onClick={() => window.open(q.url, "_blank")}
                  className="flex w-full justify-between px-4 py-3 mx-auto bg-dark rounded-lg shadow cursor-pointer hover:bg-dark transition-all duration-200"
                >
                  <span className="text-lg">{index + 1}. {q.title}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(q.difficulty)}`}>
                    {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Participate;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Participate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [config, setConfig] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [hasEnded, setHasEnded] = useState(false);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("currentContest"));
//     if (data && data.endTime) {
//       setConfig(data);
//       const end = new Date(data.endTime).getTime();
//       const now = new Date().getTime();
//       const diff = Math.max(Math.floor((end - now) / 1000), 0);
//       setTimeLeft(diff);
//     }
//   }, []);

//   useEffect(() => {
//     if (!timeLeft || hasEnded) return;

//     const interval = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 55) {
//           clearInterval(interval);
//           if (!hasEnded) {
//             setHasEnded(true);
//             toast.info("Contest has ended!");
//             setTimeout(() => {
//               navigate("/thankyou");
//             }, 1100);
//           }
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timeLeft, hasEnded]);

//   const formatTime = (seconds) => {
//     const min = Math.floor(seconds / 60);
//     const sec = seconds % 60;
//     return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
//   };

//   const handleCopyLink = () => {
//     const link = `${window.location.origin}/participate/${id}`;
//     navigator.clipboard.writeText(link).then(() => {
//       toast.success("Link copied to clipboard!");
//     });
//   };

//   const generateFakeQuestions = (count, difficulty) => {
//     const baseQuestions = {
//       easy: [
//         { title: "Two Sum", slug: "two-sum" },
//         { title: "Palindrome Number", slug: "palindrome-number" },
//         { title: "Merge Sorted Array", slug: "merge-sorted-array" }
//       ],
//       medium: [
//         { title: "Longest Substring Without Repeating Characters", slug: "longest-substring-without-repeating-characters" },
//         { title: "Add Two Numbers", slug: "add-two-numbers" },
//         { title: "Group Anagrams", slug: "group-anagrams" }
//       ],
//       hard: [
//         { title: "N-Queens", slug: "n-queens" },
//         { title: "Word Ladder", slug: "word-ladder" },
//         { title: "Median of Two Sorted Arrays", slug: "median-of-two-sorted-arrays" }
//       ]
//     };

//     const pool = baseQuestions[difficulty];
//     return Array.from({ length: count }).map((_, i) => {
//       const { title, slug } = pool[i % pool.length];
//       return {
//         title,
//         difficulty,
//         url: `https://leetcode.com/problems/${slug}/description/`
//       };
//     });
//   };

//   if (!config) return <p className="p-10 text-lg text-white">Loading contest...</p>;

//   const allQuestions = [
//     ...generateFakeQuestions(config.easy, "easy"),
//     ...generateFakeQuestions(config.medium, "medium"),
//     ...generateFakeQuestions(config.hard, "hard"),
//   ];

//   const getBadgeColor = (difficulty) => {
//     switch (difficulty) {
//       case "easy": return "bg-green-600";
//       case "medium": return "bg-yellow-500";
//       case "hard": return "bg-red-600";
//       default: return "bg-gray-500";
//     }
//   };

//   const getTimeColor = () => {
//     return timeLeft < 180 ? 'text-red-500' : 'text-green-400';
//   };

//   return (
//     <section className="min-h-screen bg-darker flex items-center justify-center px-4 py-10">
//       <ToastContainer />
//       <div className="w-full max-w-4xl bg-darkest text-white rounded-xl shadow-lg p-10 flex flex-col justify-center">
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold mb-2 text-accent">Virtual Coding Contest</h1>
//           <p className="text-lg">Contest ID: <span className="font-mono text-yellow-300">{id}</span></p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
//           <div className="text-center sm:text-left">
//             <p className="text-xl font-semibold">⏳ Time Remaining:</p>
//             <p className={`text-3xl font-mono ${getTimeColor()}`}>{formatTime(timeLeft)}</p>
//           </div>

//           <button
//             onClick={handleCopyLink}
//             className="btn btn-outline btn-accent border-white text-white hover:bg-accent hover:text-black"
//           >
//             🔗 Copy Contest Link
//           </button>
//         </div>

//         <div className="space-y-6">
//           <h2 className="text-2xl font-bold underline underline-offset-4 mb-4 text-center">📚 Problems</h2>
//           <ul className={`space-y-3 w-full ${allQuestions.length <= 3 ? "flex flex-col items-center" : ""}`}>
//             {allQuestions.length === 0 ? (
//               <p className="text-center text-gray-400">No questions selected.</p>
//             ) : (
//               allQuestions.map((q, index) => (
//                 <li
//                   key={index}
//                   onClick={() => window.open(q.url, "_blank")}
//                   className="flex w-full justify-between px-4 py-3 mx-auto bg-dark rounded-lg shadow cursor-pointer hover:bg-dark transition-all duration-200"
//                 >
//                   <span className="text-lg">{index + 1}. {q.title}</span>
//                   <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeColor(q.difficulty)}`}>
//                     {q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)}
//                   </span>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Participate;
