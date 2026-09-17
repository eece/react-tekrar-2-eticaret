
import { useForm, Controller } from 'react-hook-form';
import { Avatar, Box, Button, Card, CardContent, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const {login } = useAuth(); // AuthContext'ten login metodunu alıyoruz
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        try {
            // Örnek API çağrısı simülasyonu (2 saniye bekleme)
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Gerçek senaryoda backend'den dönen response:
            const fakeApiResponse = {
                token: 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
                user: {
                    id: 1,
                    name: data.email.split('@')[0],
                    email: data.email,
                }
            };

            // Context'e ve dolayısıyla useLocalStorage'a yazıyoruz
            await login(fakeApiResponse.user, fakeApiResponse.token);

            // Ana sayfaya yönlendir
            navigate('/');
        } catch (error) {
            console.error('Giriş hatası:', error);
        }
    };

    return <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) =>
            theme.palette.grey[100],
        p: 2,
    }}>
        <Container maxWidth="xs">
            <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 64, height: 64 }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" fontWeight={600}>
                            Giriş Yap
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Hesabınıza erişmek için bilgilerinizi girin
                        </Typography>
                    </Box>
                    {/* Form */}
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        {/* E-posta Alanı */}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="E-posta Adresi"
                            autoComplete="email"
                            autoFocus
                            {...register('email', {
                                required: 'E-posta adresi zorunludur.',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Geçerli bir e-posta adresi giriniz.'
                                }
                            })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />

                        {/* Şifre Alanı */}
                        <TextField
                            margin="normal"
                            fullWidth
                            id="password"
                            label="Şifre"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', {
                                required: 'Şifre zorunludur.',
                                minLength: {
                                    value: 6,
                                    message: 'Şifre en az 6 karakter olmalıdır.'
                                }
                            })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />

                        {/* Submit Butonu */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isSubmitting}
                            sx={{ py: 1.2, fontWeight: 600, borderRadius: 2 }}
                        >
                            {isSubmitting ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                        </Button>

                    </Box>
                </CardContent>
            </Card>
        </Container>
    </Box>
}

export default Login;