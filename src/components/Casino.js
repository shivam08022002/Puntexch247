// import React from 'react';
// import './Casino.css';
// import SportBanner from '../components/SportBanner';

// const Casino = () => {
//   const casinoData = [
//     {
//       name: "Ezugi",
//       image: "https://i.imgur.com/1234567.jpg",
//       bgColor: "linear-gradient(135deg, #2C3E50, #3498DB)"
//     },
//     {
//       name: "Evolution",
//       image: "https://i.imgur.com/2345678.jpg",
//       bgColor: "linear-gradient(135deg, #006064, #00ACC1)"
//     },
//     {
//       name: "Vivo Gaming",
//       image: "https://i.imgur.com/3456789.jpg",
//       bgColor: "linear-gradient(135deg, #4A148C, #7B1FA2)"
//     },
//     {
//       name: "Super Spade",
//       image: "https://i.imgur.com/4567890.jpg",
//       bgColor: "linear-gradient(135deg, #880E4F, #C2185B)"
//     },
//     {
//       name: "World Casino",
//       image: "https://i.imgur.com/5678901.jpg",
//       bgColor: "linear-gradient(135deg, #E65100, #F57C00)"
//     },
//     {
//       name: "XPG",
//       image: "https://i.imgur.com/6789012.jpg",
//       bgColor: "linear-gradient(135deg, #BF360C, #D84315)"
//     }
//   ];

//   return (
//     <div className="casino-section">
//       { <div className="casino-banner">
//         <SportBanner/>
//       </div> }
//       <div className="casino-grid">
//         {casinoData.map((casino, index) => (
//           <div 
//             key={index} 
//             className="casino-card"
//             style={{ background: casino.bgColor }}
//           >
//             <div className="casino-card-inner">
//               <img 
//                 src={casino.image} 
//                 alt={casino.name} 
//                 className="casino-card-image"
//                 onError={(e) => e.target.src = "https://via.placeholder.com/300x250"}
//               />
//               <h3 className="casino-card-title">{casino.name}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Casino;
