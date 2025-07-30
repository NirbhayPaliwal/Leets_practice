import React from "react";
import Navbar from "../components/Navbar.jsx";

const Profile = () => {
  const data = {
    allQuestionsCount: [
      { difficulty: "All", count: 3631 },
      { difficulty: "Easy", count: 886 },
      { difficulty: "Medium", count: 1889 },
      { difficulty: "Hard", count: 856 },
    ],
    matchedUser: {
      username: "NirbhayPaliwal",
      socialAccounts: null,
      githubUrl: null,
      contributions: { points: 1641, questionCount: 0, testcaseCount: 0 },
      profile: {
        realName: "NirbhayPaliwal",
        websites: [],
        countryName: "India",
        skillTags: [],
        company: null,
        school: null,
        starRating: 2.5,
        aboutMe: "",
        userAvatar:
          "https://assets.leetcode.com/users/avatars/avatar_1691158639.png",
        reputation: 0,
        ranking: 371328,
      }
     
    },
  };

  const { matchedUser, allQuestionsCount } = data;
  const { profile, contributions, badges, upcomingBadges } = matchedUser;

  return (
    <div className="min-h-screen bg-gradient-to-r from-darkest via-dark to-darkest text-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        {/* Profile Section */}
       <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-dark p-6 rounded-2xl shadow-xl">
  {/* Avatar */}
  <a
    href={`https://leetcode.com/${matchedUser.username}`}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src={profile.userAvatar}
      alt="avatar"
      className="w-40 h-40 rounded-full border-4 border-darker hover:scale-105 transition-transform duration-300"
    />
  </a>

  {/* Profile Info */}
  <div className="space-y-2">
    <h1 className="text-3xl font-bold text-white">{profile.realName}</h1>

    <p className="text-sm text-gray-300">
      <span className="font-semibold text-white">Username:</span> {matchedUser.username}
    </p>

    <p className="text-sm text-gray-300">
      <span className="font-semibold text-white">Country:</span> {profile.countryName}
    </p>

    <p className="text-sm text-gray-300">
      <span className="font-semibold text-white">Ranking:</span> {profile.ranking}
    </p>

    <p className="text-sm text-gray-300">
      <span className="font-semibold text-white">Star Rating:</span> ⭐ {profile.starRating}
    </p>
  </div>
</div>


        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {allQuestionsCount.map((q) => (
            <div
              key={q.difficulty}
              className="bg-dark rounded-xl shadow-md p-5 hover:scale-105 transition transform duration-300"
            >
              <h3 className="text-xl font-bold">{q.difficulty}</h3>
              <p className="text-3xl font-extrabold">{q.count}</p>
              <p className="text-sm text-gray-200">Questions Solved</p>
            </div>
          ))}
        </div>

        {/* Contributions Section */}
        <div className="mt-10 bg-dark rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4 border-b border-darkest pb-2">
            Contributions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-semibold">Points</p>
              <p className="text-xl">{contributions.points}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Question Count</p>
              <p className="text-xl">{contributions.questionCount}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">Testcase Count</p>
              <p className="text-xl">{contributions.testcaseCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// This is the purple effect of profile page 


// import React from "react";
// import Navbar from "../components/Navbar.jsx";

// const Profile = () => {
//   const data = {
//     allQuestionsCount: [
//       { difficulty: "All", count: 3631 },
//       { difficulty: "Easy", count: 886 },
//       { difficulty: "Medium", count: 1889 },
//       { difficulty: "Hard", count: 856 },
//     ],
//     matchedUser: {
//       username: "NirbhayPaliwal",
//       socialAccounts: null,
//       githubUrl: null,
//       contributions: { points: 1641, questionCount: 0, testcaseCount: 0 },
//       profile: {
//         realName: "NirbhayPaliwal",
//         websites: [],
//         countryName: "India",
//         skillTags: [],
//         company: null,
//         school: null,
//         starRating: 2.5,
//         aboutMe: "",
//         userAvatar:
//           "https://assets.leetcode.com/users/avatars/avatar_1691158639.png",
//         reputation: 0,
//         ranking: 371328,
//       },
//       badges: [
//         { displayName: "Knight", icon: "https://assets.leetcode.com/static_assets/public/images/badges/knight.png" },
//         { displayName: "Explorer", icon: "https://assets.leetcode.com/static_assets/public/images/badges/explorer.png" }
//       ],
//       upcomingBadges: [
//         { displayName: "Speedster", icon: "https://assets.leetcode.com/static_assets/public/images/badges/speedster.png" },
//         { displayName: "Legend", icon: "https://assets.leetcode.com/static_assets/public/images/badges/legend.png" },
//         { displayName: "Guru", icon: "https://assets.leetcode.com/static_assets/public/images/badges/guru.png" },
//         { displayName: "Mastermind", icon: "https://assets.leetcode.com/static_assets/public/images/badges/mastermind.png" }
//       ]
//     },
//   };

//   const { matchedUser, allQuestionsCount } = data;
//   const { profile, contributions, badges, upcomingBadges } = matchedUser;

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white font-sans">
//       <Navbar />
//       <div className="max-w-6xl mx-auto py-10 px-4">
//         {/* Profile Section */}
//         <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-800 p-6 rounded-2xl shadow-xl">
//           <img
//             src={profile.userAvatar}
//             alt="avatar"
//             className="w-40 h-40 rounded-full border-4 border-purple-500"
//           />
//           <div>
//             <h1 className="text-3xl font-bold">{profile.realName}</h1>
//             <p className="text-sm text-gray-300">Username: {matchedUser.username}</p>
//             <p className="text-sm text-gray-300">Country: {profile.countryName}</p>
//             <p className="text-sm text-gray-300">Ranking: #{profile.ranking}</p>
//             <p className="text-sm text-gray-300">Star Rating: ⭐ {profile.starRating}</p>
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//           {allQuestionsCount.map((q) => (
//             <div
//               key={q.difficulty}
//               className="bg-purple-700 rounded-xl shadow-md p-5 hover:scale-105 transition transform duration-300"
//             >
//               <h3 className="text-xl font-bold">{q.difficulty}</h3>
//               <p className="text-3xl font-extrabold">{q.count}</p>
//               <p className="text-sm text-gray-200">Questions Solved</p>
//             </div>
//           ))}
//         </div>

//         {/* Contributions Section */}
//         <div className="mt-10 bg-gray-800 rounded-xl p-6">
//           <h2 className="text-2xl font-bold mb-4 border-b border-purple-400 pb-2">
//             Contributions
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//             <div>
//               <p className="text-lg font-semibold">Points</p>
//               <p className="text-xl">{contributions.points}</p>
//             </div>
//             <div>
//               <p className="text-lg font-semibold">Question Count</p>
//               <p className="text-xl">{contributions.questionCount}</p>
//             </div>
//             <div>
//               <p className="text-lg font-semibold">Testcase Count</p>
//               <p className="text-xl">{contributions.testcaseCount}</p>
//             </div>
//           </div>
//         </div>

//         {/* Badges Section */}
//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Earned Badges */}
//           <div className="bg-gray-800 rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 border-b border-yellow-500 pb-2">Badges</h2>
//             <div className="flex flex-wrap gap-4">
//               {badges.map((badge, idx) => (
//                 <div key={idx} className="flex flex-col items-center">
//                   <img src={badge.icon} alt={badge.displayName} className="w-14 h-14" />
//                   <p className="text-sm mt-1">{badge.displayName}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Upcoming Badges */}
//           <div className="bg-gray-800 rounded-xl p-6">
//             <h2 className="text-2xl font-bold mb-4 border-b border-pink-500 pb-2">Upcoming Badges</h2>
//             <div className="flex flex-wrap gap-4">
//               {upcomingBadges.map((badge, idx) => (
//                 <div key={idx} className="flex flex-col items-center opacity-70">
//                   <img src={badge.icon} alt={badge.displayName} className="w-14 h-14 grayscale" />
//                   <p className="text-sm mt-1">{badge.displayName}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
