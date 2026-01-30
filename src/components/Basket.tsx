import {
    Box,
    Typography,
    Alert,
    Stack,
    Button,
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query';
import Footer from './basic/Footer'
import useUserStore from '../store/useStore'
import type { BasketItem } from '../types/types'
import { ErrorEnums, SuccessEnums } from '../enums/enums'
import { basketStyles } from './styles/basket.styles';

const Basket = () => {
    const [requestSuccess, setRequestSuccess] = useState(false)
    const [_requestError, setRequestError] = useState<string | null>(null)
    const items = useUserStore((state) => state.items)
    const increment = useUserStore((state) => state.increment);
    const decrement = useUserStore((state) => state.decrement);
    const reset = useUserStore((state) => state.reset);
    const saveOrder = useUserStore((state) => state.saveOrder);
    const navigate = useNavigate()
    const total = Array.isArray(items) ? items?.reduce(
        (sum: number, item: BasketItem) => sum + item.product.price * item.quantity,
        0) : 0;

    const mutation = useMutation({
        mutationFn: async () =>
            setTimeout(() => {
                return new Promise((resolve, reject) => setTimeout(() => {
                    const succeed = Math.random() * 1 < 0.5
                    succeed
                        ? resolve('ok')
                        : reject(new Error('Server error'))
                },
                    1000));
            }),
        onSuccess: () => {
            saveOrder();
            reset();
            setRequestSuccess(true);
        },
        onError: (error: any) => {
            setRequestError(error?.message || ErrorEnums.POST_ERROR);
        },
    });

    return (
        <Box>
            {items.length > 0 && items.map((item: BasketItem) =>
                <Box key={item.product.id} sx={basketStyles.itemCounter}>
                    <Box component="span" sx={basketStyles.itemTitle}> {item.product.title}</Box>
                    <Box component="span" sx={basketStyles.itemAmount}>
                        <Box component="span">{item.product.price} BYN</Box>
                        <Button component="span"
                            sx={basketStyles.itemUpdate}
                            onClick={() => decrement(item.product.id)}>
                            -
                        </Button>
                        <Box component="span">
                            {item.quantity}
                        </Box>
                        <Button component="span"
                            sx={basketStyles.itemUpdate}
                            onClick={() => increment(item.product.id)}>
                            +
                        </Button>
                    </Box>
                </Box>)
            }
            <Stack sx={basketStyles.panel}>
                <Box>
                    {total == 0 ?
                        <Box>
                            <AddShoppingCartIcon fontSize="large" />
                            <Typography sx={basketStyles.noItems}>
                                No items in the basket yet
                            </Typography>
                            <Button
                                variant="contained"
                                sx={basketStyles.catalog}
                                onClick={() => navigate('/')}>
                                Catalog
                            </Button>
                        </Box> :
                        <Box sx={basketStyles.basketAmount}>{total} BYN</Box>}
                    {items.length !== 0 &&
                        <Button onClick={() => { mutation.mutate() }}>
                            Order
                        </Button>}
                </Box>
            </Stack>
            {requestSuccess &&
                <Alert severity="success"
                    onClose={() => setRequestSuccess(false)}>
                    {SuccessEnums.POST_SUCCESS}
                </Alert>}
            <Footer />
        </Box>
    )
}
export default Basket;