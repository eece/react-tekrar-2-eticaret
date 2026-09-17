import { Box, Container, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Footer = () => {
    return ( <Box
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
            </Box>)
}

export default Footer