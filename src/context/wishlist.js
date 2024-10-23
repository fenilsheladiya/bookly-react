import { useState, useContext, createContext, useEffect } from "react";

const WishContext = createContext();
const WishProvider = ({ children }) => {
  const [wish, setWish] = useState([]);

  useEffect(() => {
    let existingCartItem = localStorage.getItem("wish");
    if (existingCartItem) setWish(JSON.parse(existingCartItem));
  }, []);

  return (
    <WishContext.Provider value={[wish, setWish]}>
      {children}
    </WishContext.Provider>
  );
};

// custom hook
const useWish = () => useContext(WishContext);

export { useWish, WishProvider };
