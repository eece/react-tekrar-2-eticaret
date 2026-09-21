import { AppBar, Badge, Box, Button, Chip, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, Outlet, Link as RouterLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../context/CartContext";

const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItemsCount } = useCart();
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

                        <IconButton color="inherit" component={RouterLink} to="/cart">
                            <Badge badgeContent={totalItemsCount} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
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