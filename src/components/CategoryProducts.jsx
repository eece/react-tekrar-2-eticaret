import { Alert, Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CategoryProductItem from './CategoryProductItem';

const CategoryProducts = ({categoryId}) => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Category ID değiştiğinde ürünleri ve kategori adını güncellemek 
    // için useEffect kullanabilirsiniz
    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                // public altındaki dosyalara doğrudan /data/cat-{id}.json ile erişilir
                const response = await axios.get(`/data/cat-${categoryId}.json`);
                setProducts(response.data.products || []); // Eğer products yoksa boş dizi döndür
                setCategoryName(response.data.name || ''); // Eğer categoryName yoksa boş string döndür
            } catch (err) {
                console.error('Ürünler yüklenirken hata oluştu:', err);
                setError('Ürünler yüklenirken bir problem oluştu.');
            } finally {
                setLoading(false);
            }
        }

        if(categoryId) {
            fetchProducts();
        }

    }, [categoryId]);

    useEffect(() => {
        console.log('Category Name:', categoryName);
    }, [categoryName]);

    return (
        <Box sx={{ my:4}}>
           <Typography
                variant="h5"
                component="h2"
                sx={{
                fontWeight: 700,
                mb: 3,
                borderLeft: 4,
                borderColor: 'primary.main',
                pl: 1.5
                }}
            >
                { categoryName || ''}
            </Typography>

            {/* Hata Durumu */}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                {error}
                </Alert>
            )}

            <Grid container spacing={3}>
                {
                    loading
                    ? // Yüklenirken gösterilecek iskelet (skeleton) kartları (6 adet)
                        Array.from(new Array(6)).map((_, index) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <Skeleton variant="rectangular" height={200} />
                                <CardContent>
                                    <Skeleton variant="text" height={32} />
                                    <Skeleton variant="text" width="100%" height={20} />
                                    <Skeleton variant="text" width="100%" height={20} />
                                </CardContent>
                            </Card>
                        </Grid>
                        ))
                    : products.map((product) => (
                        <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                            <CategoryProductItem product={product} />
                        </Grid>
                    ))
                }
            </Grid>

        </Box>
    );
}

export default CategoryProducts;