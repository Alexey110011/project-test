import { useState, useEffect } from 'react'
import { Box, Typography, useMediaQuery, useTheme, Alert } from '@mui/material';
import { ErrorEnums } from '../enums/enums';
import { feedStyles } from './styles/feed.styles';
import { useFetchTotal, useFetchProducts, useInfiniteFetchProducts } from '../api/use-fetches';
import { PaginatedItems } from './Pagination';
import Footer from './basic/Footer';
import Loading from './basic/Loading';

export const Feed = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [page, setPage] = useState(1);

    const itemsPerPage = 12;

    const onChangePage = (page: number) => {
        setPage(page)
    }

    const desktopQuery = useFetchProducts(page, itemsPerPage, {
        enabled: isDesktop || isTablet,
    })
    const mobileQuery = useInfiniteFetchProducts(itemsPerPage, {
        enabled: isMobile,
    })

    const desktopProducts = desktopQuery.data ?? []
    const mobileProducts = mobileQuery.data?.pages.flat() ?? []

    const displayedProducts = isMobile
        ? mobileProducts
        : desktopProducts

    const isLoading = isMobile
        ? mobileQuery.isLoading
        : desktopQuery.isLoading

    const error = isMobile
        ? mobileQuery.error
        : desktopQuery.error

    const { data: total } = useFetchTotal()

    useEffect(() => {
        if (!isMobile) return
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
                mobileQuery.hasNextPage &&
                !mobileQuery.isFetchingNextPage
            ) {
                mobileQuery.fetchNextPage()
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isMobile, mobileQuery.fetchNextPage, mobileQuery.hasNextPage, mobileQuery.isFetchingNextPage])

    return (

        <Box sx={feedStyles.wrapper}>
            {error &&
                <Alert severity="error">
                    {ErrorEnums.GET_ERROR}
                </Alert>}
            <Typography>Products ({total})</Typography>
            {isLoading && <Loading />}
            {displayedProducts && displayedProducts.length > 0 && (
                <Box sx={feedStyles.innerWrapper} >
                    <PaginatedItems
                        total={total}
                        items={displayedProducts}
                        itemsPerPage={12}
                        currentPage={page}
                        onPageChange={onChangePage} />
                </Box>
            )}
            <Footer />
        </Box>
    )
}
