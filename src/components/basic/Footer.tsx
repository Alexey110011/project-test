import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Badge } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SearchFilledIcon from '@mui/icons-material/Search';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import useUserStore from '../../store/useStore';
import { footerStyles } from '../styles/footer.styles';
const Footer = () => {

    const location = useLocation()
    const basket = useUserStore((state) => state.items.length)
    const navigate = useNavigate()

    return (
        <>
            <Box sx={footerStyles.wrapper}>
                <Box sx={footerStyles.iconsWrapper}>
                    {location.pathname === '/' ?
                        <HomeFilledIcon /> :
                        <HomeOutlinedIcon onClick={() => navigate('/')} />}
                    {location.pathname === '/search' ?
                        <SearchFilledIcon /> :
                        <SearchOutlinedIcon onClick={() => navigate('/search')} />}
                    <Badge badgeContent={basket} color="secondary">
                        {location.pathname === '/basket' ?
                            <ShoppingCartIcon /> :
                            <ShoppingCartOutlinedIcon onClick={() => navigate('/basket')} />}
                    </Badge>
                    {location.pathname === '/user' ?
                        <AccountCircleIcon /> :
                        <AccountCircleOutlinedIcon onClick={() => navigate('/search')} />}
                </Box>
            </Box>
        </>)
};

export default Footer;
