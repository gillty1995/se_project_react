import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { getWeather, processWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  likeCard,
  dislikeCard,
} from "../../utils/api";
import { registUser, loginUser, checkToken } from "../../utils/auth";
import AuthContext from "../../contexts/AuthContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { login, logout } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((res) => {
        const processWeather = processWeatherData(res);
        setWeatherData(processWeather);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Fetched clothing items:", data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setIsAuthenticated(true);
          setCurrentUser(userData);
          login();
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          setCurrentUser(null);
          setIsLoggedIn(false);
          logout();
        });
    }
  }, [login, logout]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteItem = (card) => {
    const itemId = card._id;
    const token = localStorage.getItem("jwt");

    deleteItem(itemId, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const onAddItem = (item, onDone) => {
    console.log("Adding item:", item);
    const token = localStorage.getItem("jwt");

    addItem(item, token)
      .then((newItem) => {
        console.log("New item from API:", newItem);
        setClothingItems((prevItems) => {
          const updatedItems = [newItem, ...prevItems];
          console.log("Updated clothing items:", updatedItems);
          return updatedItems;
        });
        if (onDone) onDone();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      })
      .finally(() => {
        closeActiveModal();
      });
  };

  const handleRegister = ({ email, password, name, avatar }) => {
    registUser({ email, password, name, avatar })
      .then((data) => {
        console.log("Registration successful:", data);
        handleLogin({ email, password });
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then((data) => {
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          setIsAuthenticated(true);

          checkToken(data.token)
            .then((userData) => {
              setCurrentUser(userData);
            })
            .catch((err) => {
              console.error("Error fetching user data:", err);
              setCurrentUser(null);
            });

          login();
          closeActiveModal();
          navigate("/");
        } else {
          console.error("Invalid login response:", data);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!isLiked) {
      likeCard(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log("Error adding like:", err));
    } else {
      dislikeCard(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item))
          );
        })
        .catch((err) => console.log("Error removing like:", err));
    }
  };

  const openLoginModal = () => setActiveModal("login");
  const openRegisterModal = () => setActiveModal("register");

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              openLoginModal={openLoginModal}
              openRegisterModal={openRegisterModal}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    currentUser={currentUser}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    element={
                      <Profile
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                      />
                    }
                    isAuthenticated={isAuthenticated}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
          {activeModal === "login" && (
            <LoginModal
              isOpen={true}
              onClose={closeActiveModal}
              openRegisterModal={openRegisterModal}
              handleLogin={handleLogin}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              isOpen={true}
              onClose={closeActiveModal}
              openLoginModal={openLoginModal}
              handleRegister={handleRegister}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
