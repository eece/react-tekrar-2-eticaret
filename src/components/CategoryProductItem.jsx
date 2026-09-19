import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CategoryProductItem = ({ product }) => {
    return (<Card
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
            }
        }}
    >
        <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" noWrap>
                {product.title}
            </Typography>
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 2
                }}
            >
                {product.description}
            </Typography>
            <Typography variant="h6" color="primary" fontWeight={700}>
                {product.price.toLocaleString('tr-TR', {
                    style: 'currency',
                    currency: 'TRY'
                })}
            </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
                fullWidth
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={() => handleAddToCart(product)}
            >
                Sepete Ekle
            </Button>
        </CardActions>
    </Card>)
}

export default CategoryProductItem;