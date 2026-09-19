import { Box } from "@mui/material"
import HeroSlider from "./HeroSlider"
import CategoryProducts from "./CategoryProducts"

const Home = () => {
    return (
    <Box>
        <HeroSlider />
        <CategoryProducts categoryId={1} />
    </Box>
    )
}

export default Home