"use client";

import Footer from "@/app/components/footer/footer";
import { faChevronDown, faChevronUp, faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import helpers from "../../../../services/helpers";
import ReplaceItems from "../../addItem/[dishID]/confirmReplaceItems/page";
import AddItem from "../../addItem/[dishID]/page";
import Item from "./item/page";
import "./restaurantPage.css";

const SingleRestaurantPage = ({ params, replace }) => {
  const { restaurantID } = useParams();
  const [restaurantState, setRestaurantState] = useState({});
  const [categorisWithDishesState, setCategorisWithDishesState] = useState([]);
  const [closedCategoryState, setClosedCategoryState] = useState([]);
  const [dishesResponseState, setDishesResponseState] = useState({});
  const [selectedBtnState, setSelectedBtnState] = useState(1);
  const [dishId, setDishId] = useState(null);
  const [showDish, setShowDish] = useState(false);
  const [count, setCount] = useState(1);
  const [showReplaceItemsPopup, setShowReplaceItemsPopup] = useState(false);
  const [cartItemsChangedState, setCartItemsChangedState] = useState(true);
  const [pendingAddition, setPendingAddition] = useState(null);

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
        `http://localhost:3001/customer/restaurant/${params.restaurantID}`, {
        headers: {
          //"authorization": "Bearer "+ helpers.getCookie("token"),
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
      }
      );
      setRestaurantState(response.data);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customer/dishes/restaurant/${params.restaurantID}`, {
        headers: {
          //"authorization": "Bearer "+ helpers.getCookie("token"),
          "authorization": "Bearer " + localStorage.getItem("token"),
        },
      }
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
    return LoadingAnimation;
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


  const resetAndClose = () => {

    setCount(1);
    setShowDish(false);
  };



  // Triggered when the user attempts to add an item to the cart
  const handleAddToCart = (addedItem, itemCount, note) => {
    const userID = localStorage.getItem('userID');
    const currentCart = JSON.parse(localStorage.getItem(`cart_${userID}`) || '[]');
    const differentRestaurantExists = currentCart.some(item => item.restaurantId !== params.restaurantID);
    if (differentRestaurantExists) {
      // Store the pending addition and show the replace confirmation popup
      setPendingAddition({ addedItem, itemCount, note });
      setShowReplaceItemsPopup(true);
    } else {
      // No conflicting restaurant, proceed to add to cart
      addToCartDirectly(addedItem, itemCount, note, currentCart, userID, restaurantState.deliveryFee);
    }

    setShowDish(false);
  };

  
  // Directly add to cart (used for initial add and after confirmation)
  const addToCartDirectly = (addedItem, itemCount, note, currentCart, userID, deliveryFee) => {
    const itemIndex = currentCart.findIndex(cartItem => cartItem.dishId === addedItem._id);

    if (itemIndex > -1) {
      currentCart[itemIndex].count += itemCount;
      currentCart[itemIndex].totalPrice = ((currentCart[itemIndex].price * currentCart[itemIndex].count)+restaurantState.deliveryFee).toFixed(2);
      currentCart[itemIndex].note = note;
    } else {
      currentCart.push({
        restaurantId: params.restaurantID,
        dishId: addedItem._id,
        title: addedItem.title,
        count: itemCount,
        price: addedItem.price,
        description: addedItem.description,
        image: addedItem.image,
        totalPrice: (addedItem.price * itemCount).toFixed(2),
        note: note,
        deliveryFee:restaurantState.deliveryFee
      });
    }
    localStorage.setItem(`deliveryFee`, deliveryFee);
    localStorage.setItem(`cart_${userID}`, JSON.stringify(currentCart));
    setCartItemsChangedState(false);
    setTimeout(() => {
      setCartItemsChangedState(true);
    }, 100);
  };

  // This should be called after the user confirms replacement in the ReplaceItems component
  const handleReplaceConfirm = (replaceConfirmed) => {
    if (replaceConfirmed && pendingAddition) {
      const { addedItem, itemCount, note } = pendingAddition;
      const userID = localStorage.getItem('userID');
      const newCart = []; // Start with an empty cart for the new restaurant

      addToCartDirectly(addedItem, itemCount, note, newCart, userID, restaurantState.deliveryFee);
      setPendingAddition(null); // Clear the pending addition after handling
    }
    setShowReplaceItemsPopup(false);
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
                    <div className="categoryCardContent hover:bg-[#F8F8F8]">
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
                            <h6 className="flex dishDescription pr-[3rem]">{dish.description}</h6>
                          </div>
                        </div>
                        <div className="priceAndBTNContainer">
                          <p className="dishPrice font-bold text-xl w-20 pl-2">{dish.price} JOD</p>
                          <button className="addToCartBTN" color="primary" onClick={() => {
                            setDishId(dish._id);
                            setShowDish(true);
                          }}>
                            <FontAwesomeIcon className="faPlus" icon={faPlus} />
                          </button>
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
    <div>
      <div className="mainPageContainer pt-[2rem] flex justify-end flex-row">
        <div className="restaurantCard w-[1000px] rounded-3xl mr-[26rem] ml-[2rem]">
          <div className="breadcrumbContainer">
            <Link className="breadcrumpTextActive hover:text-[#FFC245]" href="/">
              Home
            </Link>
            <p className="angularbrackets">{">"}</p>
            <Link
              className="breadcrumpTextActive hover:text-[#FFC245]"
              href="/pages/customer/restaurantList"
            >
              Restaurants
            </Link>
            <p className="angularbrackets">{">"}</p>
            <span className="breadcrumpTextInactive">
              {restaurantState.title}
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center my-4">
              <img
                className="object-contain w-[200px] h-[160px] rounded-[2rem]"
                src={restaurantState.image ? restaurantState.image : "/placeholder.png"}
                alt={restaurantState.title}
              />
            </div>
            <div className="restaurantCardHeaderContent ml-4"> {/* Add some left margin if needed */}
              <h1 className="restaurantName">{restaurantState.title}</h1>
              <p className="restaurantLocation">
                {restaurantState.buildingNo}, {restaurantState.street}, {restaurantState.area}
              </p>
              <p className="restaurantInfo">
                {restaurantState?.cuisine ? restaurantState?.cuisine.join(", ") : ""}
              </p>
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
          {selectedBtnState === 1 && (
            <div>
              {categorisWithDishesState}
              {/* {showItem && <AddItem dishId={selectedDishId} />} */}

            </div>
          )}

          {selectedBtnState === 2 && (
            <div className="infoContainer">
              <h3 className="infoContainerRestaurantName">
                {restaurantState.title}
              </h3>
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
                <p className="infoContainerDetailValue">
                  {restaurantState.deliveryTime} min
                </p>
              </div>
              <div className="infoContainerDetail">
                <p className="infoContainerDetailKey">Delivery fee</p>
                <p className="infoContainerDetailValue">
                  {restaurantState.deliveryFee} JOD
                </p>
              </div>
              <div className="infoContainerDetail">
                <p className="infoContainerDetailKey">Rating</p>
                <p className="infoContainerDetailValue">
                  {helpers.converteRates(restaurantState.rate)}
                </p>
              </div>
              <div className="infoContainerDetail">
                <p className="infoContainerDetailKey">Cuisines</p>
                <p className="infoContainerDetailValue">
                  {restaurantState?.cuisine
                    ? restaurantState?.cuisine?.join(", ")
                    : ""}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="cartItem rounded-2xl w-[350px] z-20 top-0 mr-[2rem] fixed mt-[9.5rem] mb-[10rem]">
          {cartItemsChangedState && <Item />}
        </div>

      </div>
      {showDish && (
        <AddItem
          dishId={dishId}
          count={count}
          onAddToCart={handleAddToCart}
          onCountChange={setCount}
          resetAndClose={resetAndClose}
          deliveryFee={restaurantState.deliveryFee}
        />
      )}
      <Footer />
      {showReplaceItemsPopup && (
        <ReplaceItems
          closePopup={() => setShowReplaceItemsPopup(false)}
          onConfirmReplace={(confirm) => handleReplaceConfirm(confirm)} // Assuming ReplaceItems calls this with true/false
          restaurantName={restaurantState.title} // Or any other restaurant name you wish to display
        />
      )}
    </div>
  );
};

export default SingleRestaurantPage;