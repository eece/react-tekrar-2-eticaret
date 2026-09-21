import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CssBaseline, Typography } from '@mui/material';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import { CartProvider } from './context/CartContext';
import { SnackbarProvider } from './context/SnackBarContext';
function App() {

  const About = () => <Typography variant="h4">Hakkımızda İçeriği</Typography>;
  const Contact = () => <Typography variant="h4">İletişim İçeriği</Typography>;

  return (
    <BrowserRouter>
    <CssBaseline /> 
      <AuthProvider>
        <SnackbarProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<Typography variant="h4">404 - Sayfa Bulunamadı</Typography>} />
            </Route>
          </Routes>
          </CartProvider>
          </SnackbarProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
