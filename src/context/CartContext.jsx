import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems, clearCart] = useLocalStorage('shopping_cart', []);

    const addToCart = (product, quantity) => {
        setCartItems((prevItems) => {
            // Gönderilen ürün zaten sepette var mı kontrol et
            const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
            // Eğer ürün zaten sepette varsa miktarını artır
            if (existingItemIndex > -1) {
                // Ürün zaten sepette varsa miktarını artır
                return prevItems.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            // Ürün sepette yoksa yeni bir item olarak ekle
            return [...prevItems, { ...product, quantity }];
        })
    }

    // Sepetten tamamen çıkar
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    // Miktar güncelle
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Sepetteki toplam ürün sayısını hesapla
    const totalItemsCount = useMemo(
        () => cartItems.reduce((total, item) => total + item.quantity, 0),
        [cartItems]
    );

    // Toplam sepet tutarı
    const totalPrice = useMemo(
        () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        [cartItems]
    );

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        totalPrice
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};