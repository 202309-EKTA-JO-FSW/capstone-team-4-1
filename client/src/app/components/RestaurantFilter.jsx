import React from 'react';

const RestaurantFilter = ({ cuisines, selectedCuisine, onFilterChange }) => {
  return (
    <div>
      <h3>Filters</h3>
      <div>
        <button onClick={() => onFilterChange('')} style={{ marginRight: '10px' }} className={selectedCuisine === '' ? 'active' : ''}>All</button>
        {cuisines.map((cuisine) => (
          <button key={cuisine} onClick={() => onFilterChange(cuisine)} style={{ marginRight: '10px' }} className={selectedCuisine === cuisine ? 'active' : ''}>{cuisine}</button>
        ))}
      </div>
    </div>
  );
};

// import React, { useState } from 'react';

// const RestaurantFilter = ({ cuisines, onFilterChange }) => {
//   const [selectedCuisine, setSelectedCuisine] = useState('');

//   const handleCuisineChange = (event) => {
//     setSelectedCuisine(event.target.value);
//     onFilterChange(event.target.value);
//   };

//   return (
//     <div>
//       <h3>Filter by Cuisine:</h3>
//       <select value={selectedCuisine} onChange={handleCuisineChange}>
//         <option value="">All</option>
//         {cuisines.map((cuisine) => (
//           <option key={cuisine} value={cuisine}>{cuisine}</option>
//         ))}
//       </select>
//     </div>
//   );
// };

export default RestaurantFilter;