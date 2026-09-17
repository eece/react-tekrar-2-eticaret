import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, Link as RouterLink } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {/* --- CONTENT (ORTA KISIM) --- */}
            {/* flexGrow: 1 sayesinde içeriğin boş alanı kaplaması sağlanır */}
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

          <Footer />        
        </Box>
    );
}

export default MainLayout;