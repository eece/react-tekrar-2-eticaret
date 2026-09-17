import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      // localStorage'da kayıtlıysa parse et, yoksa varsayılan değeri dön
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`"${key}" anahtarı localStorage'dan okunurken hata oluştu:`, error);
      return initialValue;
    }
  });

  // State'i ve localStorage'ı güncelleyen fonksiyon
  const setValue = (value) => {
    try {
      // useState gibi fonksiyon alabilir: setValue(prev => !prev)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`"${key}" anahtarı localStorage'a yazılırken hata oluştu:`, error);
    }
  };

  // İlgili anahtarı silmek için fonksiyon
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`"${key}" anahtarı silinirken hata oluştu:`, error);
    }
  };
  return [storedValue, setValue, removeValue];
}