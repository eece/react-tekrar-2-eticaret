import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Typography } from '@mui/material';
import MainLayout from './components/MainLayout';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
function App() {

  const Home = () => <Typography variant="h4">Ana Sayfa İçeriği</Typography>;
  const About = () => <Typography variant="h4">Hakkımızda İçeriği</Typography>;
  const Contact = () => <Typography variant="h4">İletişim İçeriği</Typography>;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<Typography variant="h4">404 - Sayfa Bulunamadı</Typography>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
