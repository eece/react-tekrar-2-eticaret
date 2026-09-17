import { AppBar, Box, Button, Chip, Container, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    return (
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
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Button color="inherit" component={RouterLink} to="/">
                            Ana Sayfa
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/about">
                            Hakkımızda
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/contact">
                            İletişim
                        </Button>

                        {isAuthenticated ? (
                            <>
                                <Chip
                                    label={user?.name || user?.email}
                                    color="secondary"
                                    size="small"
                                    sx={{ color: 'white', fontWeight: 500 }}
                                />
                                <Button color="inherit" onClick={logout}>
                                    Çıkış Yap
                                </Button>
                            </>
                        ) : (
                            <Button color="inherit" component={RouterLink} to="/login" variant="outlined">
                                Giriş Yap
                            </Button>
                        )}



                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;