import React from "react";
import "./restaurantFilter.css";

const RestaurantFilter = ({ cuisines, selectedCuisine, onFilterChange }) => {
  return (
    <div className="filter">
      <h3 className="restaurantFilter">Popular filters</h3>
      <div className="filterList">
        <div className="filterItem">
          <img
            src="https://images.deliveryhero.io/image/customer-assets-glovo/search_filters/06b4b4bd2dd1d4916657b6fc97e604518b68888b29f6f210a1c6c0751f3ba39e?t=W3siYXV0byI6eyJxIjoibG93In19XQ=="
            width="22"
            height="22"
            loading="lazy"
            class="filter-option__icon"
          />
          <button
            onClick={() => onFilterChange("")}
            className={"filterBTN" + (selectedCuisine === "" ? "active" : "")}
          >
            All
          </button>
        </div>
        {cuisines.map((cuisine) => (
          <div className="filterItem">
            <img
              src="https://images.deliveryhero.io/image/customer-assets-glovo/search_filters/b9b0684ef29486670ac207c3f593ae8a952fcc024049c6d992c3864da1de77d4?t=W3siYXV0byI6eyJxIjoibG93In19XQ=="
              width="22"
              height="22"
              loading="lazy"
              class="filter-option__icon"
            />
            <button
              key={cuisine}
              onClick={() => onFilterChange(cuisine)}
              className={
                "filterBTN" + (selectedCuisine === cuisine ? "active" : "")
              }
            >
              {cuisine}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantFilter;
