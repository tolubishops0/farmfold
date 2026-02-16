import { createContext, useContext } from "react";
import { products } from "./db";

const ProductsContext = createContext([]);

export const ProductsProvider = ({ children }) => {
  return (
    <ProductsContext.Provider value={products}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    console.error("useProducts must be used within ProductsProvider");
    return [];
  }

  return context;
};
