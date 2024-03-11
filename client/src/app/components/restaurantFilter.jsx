import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./restaurantFilter.css";

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
       
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFC245', 
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFC245', 
          },
        },
        input: {
          '&:focus': {
            color: 'black',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#FFC245',
          },
        },
      },
    },
  },
});

const RestaurantFilter = ({
  cuisines,
  selectedCuisine,
  onFilterChange,
  fetchRestaurants,
}) => {
  const [seacrhTitleInputState, setSeacrhTitleInputState] = useState("");
  const [seacrhRateInputState, setSeacrhRateInputState] = useState("");

  return (
    <div className="filter mr-[3.5rem] -ml-[1.5rem]">
      <h3 className="restaurantFilter">Popular filters</h3>
      <ThemeProvider theme={theme}>
      <div className="searchInputAndButton">
        <div className="py-3">
          <TextField
            className="searchInput"
            id="outlined-search-name"
            label="Search by name"
            type="search"
            onChange={(event) => {
              setSeacrhTitleInputState(event.target.value);
            }}
          />
        </div>
        <div className="py-3">
          <TextField
            className="searchInput"
            id="outlined-search-rate"
            label="Search by rate"
            type="search"
            onChange={(event) => {
              setSeacrhRateInputState(event.target.value);
            }}
          />
        </div>
      
    
        <button
          onClick={() => {
            fetchRestaurants(seacrhTitleInputState, seacrhRateInputState);
          }}
          className={"searchButton hover:text-[#FFC245]"}
        >
          Search
        </button>
      </div>
      </ThemeProvider>
      <div className="filterList">
        <div className="filterItem hover:text-[#FFC245]">
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
          <div className="filterItem hover:text-[#FFC245]">
            <img
              src="https://images.deliveryhero.io/image/customer-assets-glovo/search_filters/b9b0684ef29486670ac207c3f593ae8a952fcc024049c6d992c3864da1de77d4?t=W3siYXV0byI6eyJxIjoibG93In19XQ=="
              width="22"
              height="22"
              loading="lazy"
              className="filter-option__icon"
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
