import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, IconButton, Chip } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Mock Slider Verileri
const SLIDES = [
    {
        id: 1,
        badge: 'Yeni Sezon',
        title: 'Minimalist & Konforlu Koleksiyon',
        description: 'Doğal dokular ve zamansız parçalarla tarzınızı yeniden tanımlayın. Seçili ürünlerde %30 indirim.',
        buttonText: 'Koleksiyonu Keşfet',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
        link: '/kategori/yeni-sezon'
    },
    {
        id: 2,
        badge: 'Fırsat Ürünü',
        title: 'Yeni Nesil Teknolojik Ekipmanlar',
        description: 'Çalışma alanınızı profesyonel seviyeye taşıyacak ergonomik ve yüksek performanslı ürünler.',
        buttonText: 'Ürünleri İncele',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80',
        link: '/kategori/teknoloji'
    },
    {
        id: 3,
        badge: 'Sınırlı Stok',
        title: 'Şehirli Yaşam İçin Aksesuarlar',
        description: 'Günün temposuna ayak uyduran, dayanıklı ve fonksiyonel sırt çantaları stoklarda.',
        buttonText: 'Hemen Al',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=80',
        link: '/kategori/aksesuar'
    }
];

export default function HeroSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    // 5 saniyede bir otomatik geçiş (mouse üzerine gelince duraklar)
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(timer);
    }, [handleNext, isPaused]);

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: { xs: 460, sm: 540, md: 620 },
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: 2,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slide Öğeleri */}
            {SLIDES.map((slide, index) => {
                const isActive = index === currentIndex;
                return (
                    <Box
                        key={slide.id}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            opacity: isActive ? 1 : 0,
                            visibility: isActive ? 'visible' : 'hidden',
                            transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.75) 15%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%), url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            px: { xs: 3, sm: 6, md: 10 },
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: 620,
                                color: 'common.white',
                                transform: isActive ? 'translateY(0)' : 'translateY(24px)',
                                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                        >
                            {slide.badge && (
                                <Chip
                                    label={slide.badge}
                                    size="small"
                                    sx={{
                                        mb: 2,
                                        bgcolor: 'primary.main',
                                        color: 'primary.contrastText',
                                        fontWeight: 600,
                                        fontSize: '0.75rem',
                                        letterSpacing: 0.5,
                                        textTransform: 'uppercase',
                                    }}
                                />
                            )}
                            <Typography
                                variant="h3"
                                component="h2"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '1.85rem', sm: '2.5rem', md: '3.25rem' },
                                    lineHeight: 1.15,
                                    mb: 2,
                                }}
                            >
                                {slide.title}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 4,
                                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                                    color: 'grey.300',
                                    lineHeight: 1.6,
                                }}
                            >
                                {slide.description}
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                href={slide.link}
                                sx={{
                                    px: 4,
                                    py: 1.4,
                                    borderRadius: 1.5,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    bgcolor: '#ff9800', // veya Material UI turuncusu: 'warning.main'
                                    color: '#fff',
                                    boxShadow: '0 4px 14px 0 rgba(255, 152, 0, 0.35)',
                                    '&:hover': {
                                        bgcolor: '#f57c00', // hover koyulaşması: 'warning.dark'
                                        boxShadow: '0 6px 20px 0 rgba(245, 124, 0, 0.45)',
                                    },
                                }}
                            >
                                {slide.buttonText}
                            </Button>
                        </Box>
                    </Box>
                );
            })}

            {/* Sol Ok Butonu */}
            <IconButton
                onClick={handlePrev}
                aria-label="Önceki Slayt"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 16,
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(4px)',
                    color: 'common.white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.4)' },
                    display: { xs: 'none', sm: 'flex' },
                }}
            >
                <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            {/* Sağ Ok Butonu */}
            <IconButton
                onClick={handleNext}
                aria-label="Sonraki Slayt"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 16,
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255, 255, 255, 0.25)',
                    backdropFilter: 'blur(4px)',
                    color: 'common.white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.4)' },
                    display: { xs: 'none', sm: 'flex' },
                }}
            >
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>

            {/* Alt Nokta (Dot) Göstergeleri */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1.2,
                }}
            >
                {SLIDES.map((_, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <Box
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            sx={{
                                width: isActive ? 28 : 8,
                                height: 8,
                                borderRadius: 4,
                                bgcolor: isActive ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: isActive ? 'primary.main' : 'rgba(255, 255, 255, 0.8)',
                                },
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    );
}