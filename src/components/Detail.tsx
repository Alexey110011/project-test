import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { List, Box, Button, ListItem, TextField, Stack, Rating, Typography, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material'
import { detailStyles } from './styles/detail.styles';
import type { ProductType } from '../types/types';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Footer from './basic/Footer';

export const Collapsible = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>('')
    const [rating, setRating] = useState<number | null>(0)

    const handleToggle = () => {
        setOpen((prev) => !prev)
        setRating(0)
        setValue('')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        setOpen(false)
    }
    return (
        <Box sx={detailStyles.wrapper}>
            <Button onClick={handleToggle}
                endIcon={open ? <ExpandLess /> : <ExpandMore />}>
            </Button>
            <Collapse in={open}>
                <Box sx={detailStyles.review}>
                    <Rating name="controlled"
                        value={rating}
                        onChange={(_event, newValue) => setRating(newValue)} />
                    <TextField
                        label="Your message"
                        multiline
                        rows={4}
                        value={value}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        inputProps={{ maxLength: 500 }}
                        helperText={`${value.length} / ${500} characters`}
                    />
                    <Button variant="contained"
                        onClick={handleToggle}>
                        Send Review
                    </Button>
                </Box>
            </Collapse>
        </Box>
    )
}
const Detail = () => {
    const [product, setProduct] = useState<ProductType>();
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error('Error fetching files:', err);
            }
        };
        fetchProductById();
    }, [])
    return (
        <>
            {product && (
                <Box sx={detailStyles.card}>
                    Product info:
                    <Stack>
                        <List>
                            <ListItem>Id: {product.id}</ListItem>
                            <ListItem>Name: {product.title}</ListItem>
                            <ListItem>Type: {product.category}</ListItem>
                            <ListItem>Price: {product.price} BYN</ListItem>
                            <ListItem>Description: {product.description}</ListItem>
                            <Box component="img"
                                src={product.image}
                                alt={product.title}
                                sx={detailStyles.picture} />
                            <ListItem>
                                {product.rating.rate}<Rating name="read-only" value={product.rating.rate} readOnly />
                                ({product.rating.count})
                            </ListItem>
                        </List>
                        <Typography>Leave review</Typography>
                        <Collapsible />
                        <Button onClick={() => navigate('/basket')}>
                            <AddShoppingCartOutlinedIcon />
                        </Button>
                    </Stack>
                    <Box>
                        <Footer />
                    </Box>
                </Box>)}
        </>)
};

export default Detail;
