import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Typography } from '@mui/material';
import MainLayout from './components/MainLayout';

function App() {

const Home = () => <Typography variant="h4">Ana Sayfa İçeriği</Typography>;
const About = () => <Typography variant="h4">Hakkımızda İçeriği</Typography>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
