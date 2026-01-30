import {
    Box,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useRef } from 'react'
import { searchStyles } from './styles/search.styles'
import Footer from './basic/Footer'
import type { ProductType } from '../types/types'
import Product from './Product'
import ProductPreview from './ProductPreview'
import { useMediaQuery, useTheme } from '@mui/material'

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const [categoryScroll, setCategoryScroll] = useState({ left: false, right: false });

    const updateScrollState = (ref: any, setState: any) => {
        if (!ref.current) return;
        const el = ref.current;
        setState({
            left: el.scrollLeft > 0,
            right: el.scrollLeft + el.clientWidth < el.scrollWidth
        });
    };

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        const categoryEl = categoryRef.current;
        if (!categoryEl) return
        const handlerCategories = () => updateScrollState(categoryRef, setCategoryScroll);
        categoryEl?.addEventListener("scroll", handlerCategories);
        handlerCategories();
        return () => {
            categoryEl?.removeEventListener("scroll", handlerCategories);
        };
    }, [filteredProducts, isDesktop]);

    useEffect(() => {
        updateScrollState(categoryRef, setCategoryScroll);
    }, [categories])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products/categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                console.error('Error fetching files:', err);
            }
        };
        fetchCategories();
    }, [])

    useEffect(() => {
        if (!categories.length) return;
        const loadPreviewProducts = async () => {
            const { products } = await filteredData(categories, 1);
            setFilteredProducts(products);
        };

        loadPreviewProducts();
    }, [categories, searchQuery]);

    useEffect(() => {
        if (!debouncedQuery.trim()) return;
        if (!categories.length) return;

        const loadAllProducts = async () => {
            const filteredCategories = categories.filter(c =>
                c.toLowerCase().includes(debouncedQuery.toLowerCase())
            );
            const { products } = await filteredData(filteredCategories);
            setFilteredProducts(products);
        };

        loadAllProducts();
    }, [debouncedQuery, categories]);

    useEffect(() => {
        if (!categoryRef.current) return;
        const timer = setTimeout(() => {
            updateScrollState(categoryRef, setCategoryScroll);
        }, 50);

        return () => clearTimeout(timer);
    }, [filteredProducts, isDesktop])

    const filteredData = async (categories: string[], limit?: number) => {
        let results = await Promise.allSettled(
            categories.map(async (category: string) => {
                const url = limit !== undefined
                    ? `https://fakestoreapi.com/products/category/${category}?limit=${limit}`
                    : `https://fakestoreapi.com/products/category/${category}`
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error(`Failed for category ${category}`)
                }
                return res.json()
            }))

        const successful = results
            .filter((r) => r.status === 'fulfilled')
            .map((r) => r.value)
            .flat()
        const failed = results.filter((r) => r.status === 'rejected')
        return {
            products: successful,
            failed
        }
    }

    return (
        <Box sx={/*isMobile?*/{
            overflowX: 'hidden',
            overflowY: 'auto',
            touchAction: 'pan-y',
            //width: '100vw'
        }/*:{overflowX: 'hidden',
            overflowY: 'auto',
            touchAction: 'pan-y',}*/}>
            <Box>
                <Box sx={searchStyles.searchSection}>
                    <Box sx={searchStyles.searchInput}>
                        <TextField
                            fullWidth
                            placeholder="Search by category"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            variant="outlined"
                            InputProps={{
                                sx: {
                                    '& input::placeholder': {
                                        fontSize: '1rem',
                                        fontStyle: 'italic',
                                        fontWeight: 400,
                                        color: '#5B738B',
                                        touchAction: 'pan-y'
                                    },
                                },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon style={{ color: '#bdbdbd' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            data-testid="cancel-button"
                                            onClick={() => {
                                                setSearchQuery('')
                                            }}
                                        >
                                            <CancelIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Box>
                <>
                    {searchQuery === '' && (
                        <Box>
                            {isDesktop && categoryScroll.left && (
                                <IconButton
                                    onClick={() => {
                                        categoryRef.current?.scrollBy({
                                            left: -200,
                                            behavior: "smooth",
                                        });
                                    }}
                                    sx={searchStyles.leftArrowButton}
                                    size="small">
                                    <ArrowBackIosNewIcon sx={{ fontSize: 12 }} />
                                </IconButton>
                            )}

                            <Box ref={categoryRef}
                                sx={searchStyles.wrapper}>
                                {filteredProducts.map((product: any, index: any) => (
                                    <Box
                                        key={index}
                                        sx={searchStyles.searchItem}>
                                        <Box>
                                            <Typography>
                                                {product.category}
                                            </Typography>
                                            <Box component="img"
                                                src={product.image}
                                                alt={product.title}
                                                sx={searchStyles.image} />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            {isDesktop && categoryScroll.right && (
                                <IconButton
                                    onClick={() => {
                                        categoryRef.current?.scrollBy({
                                            left: 200,
                                            behavior: "smooth",
                                        });
                                        setTimeout(
                                            () =>
                                                updateScrollState(
                                                    categoryRef,
                                                    setCategoryScroll
                                                ),
                                            300
                                        );
                                    }}
                                    sx={searchStyles.rightArrowButton}
                                    size="small"
                                >
                                    <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
                                </IconButton>
                            )}
                        </Box>)}
                    <Box sx={searchStyles.resultsSection}>
                        {filteredProducts.length === 0 ? (
                            <Box>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                >
                                    {debouncedQuery
                                        ? 'No category found matching your search.'
                                        : 'Start typing to search for category.'}
                                </Typography>
                            </Box>
                        ) : (
                            searchQuery !== '' && (
                                <Box>
                                    <Typography sx={searchStyles.resultsInfo}>
                                        Found {filteredProducts.length} products
                                    </Typography>
                                    <Box sx={searchStyles.results}>
                                        {searchQuery ?
                                            filteredProducts.map(
                                                (product: any, index: number) =>
                                                    <Product key={index} product={product} />
                                            ) : (
                                                filteredProducts.map(
                                                    (product: any, index: number) =>
                                                        <ProductPreview key={index} product={product} />
                                                ))}
                                    </Box>
                                </Box>)
                        )}
                    </Box>
                </>
            </Box>
            <Footer />
        </Box>
    )
}
export default Search;