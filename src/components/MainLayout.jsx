import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, Link as RouterLink } from 'react-router-dom';
const MainLayout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* --- HEADER --- */}
            <AppBar position="static">
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                flexGrow: 1,
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 700
                            }}
                        >
                            My ECommerce Site
                        </Typography>
                        {/* Navigasyon Butonları */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button color="inherit" component={RouterLink} to="/">
                                Ana Sayfa
                            </Button>
                            <Button color="inherit" component={RouterLink} to="/about">
                                Hakkımızda
                            </Button>
                            <Button color="inherit" component={RouterLink} to="/contact">
                                İletişim
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* --- CONTENT (ORTA KISIM) --- */}
            {/* flexGrow: 1 sayesinde içeriğin boş alanı kaplaması sağlanır */}
            <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            {/* --- FOOTER --- */}
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) => theme.palette.grey[200]
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        {'Tüm hakları saklıdır © '}
                        <Link color="inherit" href="https://example.com/">
                            Uygulama Adı
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default MainLayout;