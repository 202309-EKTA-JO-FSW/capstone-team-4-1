"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Link from "next/link"; // Import Link from 'next/link'
import "./restaurantPage.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import  helpers  from "../../../../services/helpers";

const SingleRestaurantPage = ({ params }) => {
  const { restaurantID } = useParams();
  const [restaurantState, setRestaurantState] = useState({});
  const [categorisWithDishesState, setCategorisWithDishesState] = useState([]);
  const [closedCategoryState, setClosedCategoryState] = useState([]);
  const [dishesResponseState, setDishesResponseState] = useState({});
  const [selectedBtnState, setSelectedBtnState] = useState(1);

  useEffect(() => {
    fetchRestaurant();
    fetchDishes();
  }, [restaurantID]);

  useEffect(() => {
    renderDishes(dishesResponseState);
  }, [closedCategoryState]);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customer/restaurant/${params.restaurantID}`
      );
      setRestaurantState(response.data);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customer/dishes/restaurant/${params.restaurantID}`
      );
      if (response?.data) {
        setDishesResponseState(response);
        renderDishes(response);
      }
    } catch (error) {
      console.error("Error fetching categoris with dishes:", error);
    }
  };

  if (!restaurantState) {
    return <p>Loading...</p>;
  }
  const toggleCategory = async (categoryName) => {
    try {
      let closedCategoryArray = closedCategoryState;
      if (!closedCategoryState.includes(categoryName)) {
        closedCategoryArray.push(categoryName);
      } else {
        let index = closedCategoryArray.indexOf(categoryName);
        closedCategoryArray.splice(index, 1);
      }
      setClosedCategoryState([...closedCategoryArray]);
    } catch (error) {
      console.error("", error);
    }
  };
  const renderDishes = async (response) => {
    if (response?.data) {
      if (response?.data?.dishes) {
        let mappedCategorisWithDishes = {};
        response?.data?.dishes?.forEach((dish) => {
          if (!mappedCategorisWithDishes[dish.category]) {
            mappedCategorisWithDishes[dish.category] = [];
          }
          mappedCategorisWithDishes[dish.category].push(dish);
        });
        let categorisWithDishesState = Object.values(mappedCategorisWithDishes);
        let test = [];
        categorisWithDishesState.forEach((category) => {
          test.push(
            <div key={category[0]._id} className="categoryCard">
              <div
                onClick={() => {
                  toggleCategory(category[0].category);
                }}
                className="categoryToggleHeader"
              >
                <h3>{category[0].category}</h3>
                <FontAwesomeIcon
                  className="flagStyleIcon"
                  icon={
                    !closedCategoryState.includes(category[0].category)
                      ? faChevronUp
                      : faChevronDown
                  }
                />
              </div>
              {category.map((dish) => {
                return (
                  !closedCategoryState.includes(dish.category) && (
                    <div className="categoryCardContent">
                      <div className="dish">
                        <div className="dishContentLeftSection">
                          <img
                            className="dishImage"
                            src={dish.image ? dish.image : "/placeholder.png"}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = "/placeholder.png";
                            }}
                            alt={dish.title}
                          />
                          <div className="dishTitleAndDescription">
                            <h6 className="dishTitle">{dish.title}</h6>
                            <h6 className="dishDescription">{dish.title}</h6>
                          </div>
                        </div>
                        <div>
                          <p className="dishPrice">{dish.price}JOD</p>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          );
        });
        setCategorisWithDishesState(test);
      }
    } else {
      setCategorisWithDishesState([]);
    }
  };
  
  return (
    <div className="mainPageContainer">
      {/* <h2>{restaurantState.title}</h2>
      <p>Email: {restaurantState.email}</p> */}
      <div className="restaurantCard">
        <div className="breadcrumbContainer">
          <Link className="breadcrumpTextActive" href="/">
            Home
          </Link>
          <p className="angularbrackets">{">"}</p>
          <Link
            className="breadcrumpTextActive"
            href="/pages/customer/restaurantList"
          >
            Restaurants
          </Link>
          <p className="angularbrackets">{">"}</p>
          <span className="breadcrumpTextInactive">
            {restaurantState.title}
          </span>
        </div>
        <div className="restaurantCardHeader">
          <img
            className="restaurantCardHeaderImage"
            src={
              restaurantState.image ? restaurantState.image : "/placeholder.png"
            }
            alt={restaurantState.title}
          />
          <div className="restaurantCardHeaderContent">
            <h1 className="restaurantName">{restaurantState.title}</h1>
            <p className="restaurantLocation">
            {restaurantState.buildingNo}, {restaurantState.street}, {restaurantState.area}
            </p>
            <p className="restaurantInfo">{restaurantState?.cuisine ? restaurantState?.cuisine?.join(', ') : ''}</p>
            <p className="restaurantMinimumOrder">Min. order: JOD 2.00</p>
          </div>
        </div>
        <div className="flagStyle">
          <FontAwesomeIcon className="flagStyleIcon" icon={faInfoCircle} />
          <p className="flagStyleText">Delivered by us, with live tracking</p>
        </div>

        <ButtonGroup
          variant="text"
          className="buttonGroup"
          aria-label="Basic button group"
        >
          <Button
            className={selectedBtnState === 1 ? "activeBTN" : "notActiveBTN"}
            color={selectedBtnState === 1 ? "secondary" : "primary"}
            onClick={() => setSelectedBtnState(1)}
          >
            Menu
          </Button>
          <Button
            className={selectedBtnState === 2 ? "activeBTN" : "notActiveBTN"}
            color={selectedBtnState === 2 ? "secondary" : "primary"}
            onClick={() => setSelectedBtnState(2)}
          >
            Info
          </Button>
        </ButtonGroup>
        {selectedBtnState === 1 && <div>{categorisWithDishesState}</div>}
        {selectedBtnState === 2 && (
          <div className="infoContainer">
            <h3 className="infoContainerRestaurantName">{restaurantState.title}</h3>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Minimum Order Amount</p>
              <p className="infoContainerDetailValue">JOD 2.00</p>
            </div>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Working Hours</p>
              <p className="infoContainerDetailValue">7:00AM - 1:30AM</p>
            </div>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Delivery Time</p>
              <p className="infoContainerDetailValue">{restaurantState.deliveryTime} min</p>
            </div>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Delivery fee</p>
              <p className="infoContainerDetailValue">{restaurantState.deliveryFee} JOD</p>
            </div>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Rating</p>
              <p className="infoContainerDetailValue">{helpers.converteRates(restaurantState.rate)}</p>
            </div>
            <div className="infoContainerDetail">
              <p className="infoContainerDetailKey">Cuisines</p>
              <p className="infoContainerDetailValue">{restaurantState?.cuisine ? restaurantState?.cuisine?.join(', ') : ''}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRestaurantPage;
