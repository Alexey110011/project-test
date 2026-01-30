import { useNavigate } from 'react-router-dom'
import { List, Box, Button, ListItem, Stack, Rating } from '@mui/material';
import { productStyles } from './styles/product.styles';
import type { ProductType } from '../types/types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import useUserStore from '../store/useStore';

const Product = ({ product }: { product: ProductType }) => {
    const addItemToBasket = useUserStore((state: any) => state.addItemToBasket)
    const handleAddItemToBasket = (product: ProductType) => {
        addItemToBasket(product)
    }
    const navigate = useNavigate()
    return (
        <>
            {product && (
                <Box sx={productStyles.wrapper}>
                    <Stack sx={productStyles.stack}>
                        <List onClick={() => navigate(`/detail/${product.id}`)}>
                            <ListItem sx={productStyles.list}>
                                Name: {product.title}
                            </ListItem>
                            <ListItem>
                                Category: {product.category}
                            </ListItem>
                            <ListItem>
                                Price: {product.price} BYN
                            </ListItem>
                            <ListItem>
                                {product.rating.rate}<Rating name="read-only" value={product.rating.rate} readOnly />({product.rating.count})
                            </ListItem>
                            <Box component="img"
                                src={product.image}
                                alt={product.title}
                                sx={productStyles.itemImage} />
                        </List>
                        <Button>
                            <AddShoppingCartOutlinedIcon onClick={() => handleAddItemToBasket(product)} />
                        </Button>
                    </Stack>
                </Box>
            )}
        </>
    );
};
export default Product;
