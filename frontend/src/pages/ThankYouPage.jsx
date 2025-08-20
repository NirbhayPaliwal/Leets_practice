
// VERSION-1

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";


const ThankYouPage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const confettiRef = useRef(null);

  const fire = () => {
    if (confettiRef.current) {
      const makeShot = (particleRatio, opts) => {
        confettiRef.current({
          ...opts,
          origin: { y: 0.7 },
          particleCount: Math.floor(200 * particleRatio),
        });
      };

      makeShot(0.25, {
        spread: 26,
        startVelocity: 55,
      });

      makeShot(0.2, {
        spread: 60,
      });

      makeShot(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });

      makeShot(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });

      makeShot(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    fire(); // launch fireworks once
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-darker text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Falling confetti */}
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      {/* Firework Confetti */}
      <ReactCanvasConfetti refConfetti={(instance) => (confettiRef.current = instance)} style={{
        position: "fixed",
        pointerEvents: "none",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }} />

      {/* 🎉 Thank You Block */}
      <div className="z-20 text-center bg-darkest/90 p-6 rounded-lg shadow-lg animate-fade-in">
        {/* 🎉 Bouncing and Sparkling Icon */}
        <div className="sparkle-wrapper text-5xl mb-2 animate-sprinkle">🎉</div>

        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-lg mb-6">Your contest submission has been received.</p>

        <button
          onClick={() => navigate("/")}
          className="bg-darker hover:bg-dark text-white px-6 py-3 rounded-md transition-all"
        >
          Back to Home
        </button>
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes sprinkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(-10deg); }
          50% { transform: scale(1) rotate(10deg); }
          75% { transform: scale(1.1) rotate(-5deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes sparkle-blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        .animate-sprinkle {
          animation: sprinkle 1.5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }

        .sparkle-wrapper {
          position: relative;
        }

        .sparkle-wrapper::after {
          content: "✨✨";
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          animation: sparkle-blink 1.5s infinite;
          font-size: 1.5rem;
        }
      `}</style>
      
    </div>
   
  );
  
};

export default ThankYouPage;



// VERSION-2
// THIS IS THE SECOND MODIFICATION WHICH CAN ALSO BE LOVED ASK OTHER WHICH SUTES BEST


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";

// const ThankYouPage = () => {
//   const navigate = useNavigate();
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [dimensions, setDimensions] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfetti(false), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
//       {/* 🎊 Confetti */}
//       {showConfetti && (
//         <Confetti
//           width={dimensions.width}
//           height={dimensions.height}
//           numberOfPieces={250}
//           recycle={false}
//         />
//       )}

//       {/* 🎉 Modal-style Thank You Card */}
//       <div className="z-20 text-center bg-darkest p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
//         <div className="text-6xl mb-4 animate-bounce">🏆</div>
//         <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
//         <p className="text-lg text-gray-300 mb-6">
//           Your contest has been submitted successfully.
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={() => navigate("/")}
//             className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full transition-all"
//           >
//             Back to Home
//           </button>

//           <button
//             onClick={() => alert("🎉 Certificate download coming soon!")}
//             className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full transition-all"
//           >
//             Get Certificate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYouPage;



// // version -3


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";

// const ThankYouPage = () => {
//   const navigate = useNavigate();
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [dimensions, setDimensions] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfetti(false), 10000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 animated-bg">
//       {showConfetti && (
//         <Confetti
//           width={dimensions.width}
//           height={dimensions.height}
//           numberOfPieces={300}
//           recycle={false}
//         />
//       )}

//       <div className="z-20 text-center bg-black/70 text-white p-8 rounded-lg shadow-xl animate-fade-in backdrop-blur-md">
//         <div className="text-5xl mb-2 animate-sprinkle">🎉</div>
//         <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
//         <p className="text-lg mb-6">Your contest submission has been received.</p>

//         <button
//           onClick={() => navigate("/")}
//           className="bg-white text-black px-6 py-3 rounded hover:bg-red-600 hover:text-white transition-all"
//         >
//           Back to Home
//         </button>
//       </div>

//       {/* ✨ Custom Animations */}
//       <style>{`
//         .animated-bg {
//           background: linear-gradient(-45deg, #1e293b, #334155, #0f172a, #1f2937);
//           background-size: 400% 400%;
//           animation: gradientShift 10s ease infinite;
//         }

//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes sprinkle {
//           0%, 100% { transform: scale(1) rotate(0deg); }
//           25% { transform: scale(1.2) rotate(-10deg); }
//           50% { transform: scale(1) rotate(10deg); }
//           75% { transform: scale(1.1) rotate(-5deg); }
//         }

//         @keyframes fade-in {
//           from { opacity: 0; transform: scale(0.95); }
//           to { opacity: 1; transform: scale(1); }
//         }

//         .animate-sprinkle {
//           animation: sprinkle 1.5s ease-in-out infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ThankYouPage;


// VERSION -4

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";

// const ThankYouPage = () => {
//   const navigate = useNavigate();
//   const [showConfetti, setShowConfetti] = useState(true);
//   const [dimensions, setDimensions] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   useEffect(() => {
//     const timer = setTimeout(() => setShowConfetti(false), 10000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setDimensions({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <div className="thankyou-page w-screen h-screen overflow-hidden">
//       {showConfetti && (
//         <Confetti
//           width={dimensions.width}
//           height={dimensions.height}
//           numberOfPieces={300}
//           recycle={false}
//         />
//       )}

//       <div className="content text-center text-white">
//         <div className="text-6xl animate-bounce">🎉</div>
//         <h1 className="text-4xl font-bold mt-4 mb-2 animate-fade-in">Thank You!</h1>
//         <p className="text-lg mb-6 text-gray-300 animate-fade-in-delay">Your contest submission has been received.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-red-500 hover:text-white transition-all glow"
//         >
//           Back to Home
//         </button>
//       </div>

//       <style>{`
//         .thankyou-page {
//           position: relative;
//           background: linear-gradient(-45deg, #6e7072ff, #525558ff, #393a3eff, #343536ff);
//           background-size: 400% 400%;
//           animation: gradientShift 10s ease infinite, pulse 6s ease-in-out infinite;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .content {
//           z-index: 10;
//           padding: 2rem;
//           border-radius: 1rem;
//           background-color: rgba(0, 0, 0, 0.5);
//           backdrop-filter: blur(6px);
//         }

//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }

//         @keyframes pulse {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.02); }
//         }

//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-fade-in {
//           animation: fade-in 1s ease forwards;
//         }

//         .animate-fade-in-delay {
//           animation: fade-in 1.5s ease forwards;
//         }

//         .glow {
//           box-shadow: 0 0 12px #ffffff90, 0 0 24px #ffffff50;
//         }

//         .animate-bounce {
//           animation: bounce 1.5s infinite;
//         }

//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-12px); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ThankYouPage;
