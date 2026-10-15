import { Avatar, Box, Button, ButtonGroup, Card, CardContent, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

import React from "react";
const CartPage = () => {
    const { cartItems, handleClearCart, updateQuantity, removeFromCart, totalPrice } = useCart();

    if (cartItems.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 8,
                    textAlign: 'center'
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: 'grey.100',
                        color: 'text.secondary',
                        width: 80,
                        height: 80,
                        mb: 2
                    }}
                >
                    <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                    Sepetiniz Boş
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Görünüşe göre sepetinize henüz bir ürün eklemediniz.
                </Typography>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                >
                    Alışverişe Başla
                </Button>
            </Box>
        )
    }
    // Sepet Dolu İken
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" fontWeight={700}>
                    Sepetim ({cartItems.length} Farklı Ürün)
                </Typography>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    startIcon={<DeleteOutlined />}
                    onClick={handleClearCart}
                >
                    Sepeti Temizle
                </Button>
            </Box>
            <Grid container spacing={4}>
                {/* Sol Taraf: Ürün Listesi */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <List disablePadding>
                            {
                                cartItems.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <ListItem
                                            sx={{
                                                py: 2,
                                                px: 3,
                                                flexDirection: { xs: 'column', sm: 'row' },
                                                alignItems: { xs: 'flex-start', sm: 'center' },
                                                gap: 2
                                            }}
                                        >
                                            {/* Ürün Görseli */}
                                            <ListItemAvatar>
                                            <Avatar
                                                src={item.image}
                                                alt={item.title}
                                                variant="rounded"
                                                sx={{ width: 80, height: 80, objectFit: 'cover' }}
                                            />
                                            </ListItemAvatar>
                                            {/* Başlık ve Birim Fiyat */}
                                            <ListItemText
                                                secondary={
                                                    <Typography variant="subtitle1" fontWeight={600}>
                                                    {item.title}
                                                    </Typography>
                                                }
                                                primary={
                                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                    Birim Fiyat:{' '}
                                                    {item.price.toLocaleString('tr-TR', {
                                                        style: 'currency',
                                                        currency: 'TRY'
                                                    })}
                                                    </Typography>
                                                }
                                                sx={{ flexGrow: 1 }}
                                                />
                                                <ButtonGroup size="small" variant="outlined">
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Button sx={{ cursor: 'default', pointerEvents: 'none', px: 2 }}>
                                                        {item.quantity}
                                                    </Button>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </ButtonGroup>
                                                {/* Toplam Tutar ve Sil Butonu */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        width: { xs: '100%', sm: 'auto' },
                                                        gap: 2,
                                                        minWidth: 120
                                                    }}
                                                    >
                                                    <Typography variant="subtitle1" fontWeight={700} color="primary">
                                                        {(item.price * item.quantity).toLocaleString('tr-TR', {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                        })}
                                                    </Typography>
                                                    <IconButton
                                                        edge="end"
                                                        color="error"
                                                        onClick={() => removeFromCart(item.id)}
                                                    >
                                                        <DeleteOutlined />
                                                    </IconButton>
                                                </Box>
                                        </ListItem>
                                    </React.Fragment>
                                ))
                            }
                        </List>
                    </Paper>
                </Grid>
                {/* Sağ Taraf: Sipariş Özeti */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card elevation={3} sx={{ borderRadius: 2 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" fontWeight={700} gutterBottom>
                                Sipariş Özeti
                            </Typography>

                            {/* Ara Toplam */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
                                <Typography variant="body2" color="text.secondary">
                                Ara Toplam
                                </Typography>
                                <Typography variant="body2" fontWeight={600}>
                                {totalPrice.toLocaleString('tr-TR', {
                                    style: 'currency',
                                    currency: 'TRY'
                                })}
                                </Typography>
                            </Box>
                            {/* Siparişi Tamamla */ }
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}
                                onClick={() => console.log('Ödeme adımına geçildi, tutar:', totalPrice)}
                            >
                                Siparişi Tamamla
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CartPage;