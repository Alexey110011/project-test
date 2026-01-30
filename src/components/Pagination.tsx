import { Box, useTheme, useMediaQuery } from '@mui/material'
import ReactPaginate from 'react-paginate';
import type { ProductType } from '../types/types';
import Product from './Product';
import { paginationStyles } from './styles/pagination.styles'

interface PaginatedItemsProps {
    total: number
    items: ProductType[]
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
}
export const Items = ({ currentItems }: { currentItems: ProductType[] }) => {

    return (
        <Box sx={paginationStyles.items}>
            {currentItems && currentItems.map((item) =>
                <div key={item.id} className="items">
                    <Product product={item} />
                </div>)}
        </Box>
    )
}

export const PaginatedItems = ({ total, items, itemsPerPage, currentPage, onPageChange }: PaginatedItemsProps) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const pageCount = Math.ceil(total / itemsPerPage);

    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    }
    return (
        <Box sx={paginationStyles.basic}>
            <Items currentItems={items} />
            <Box>
                <span className="paginate">
                    1-{items.length} of {total} products
                </span>
                <Box sx={{
                    '& .pagination': {
                        display: 'flex',
                        justifyContent: 'center',
                        listStyle: 'none',
                        gap: '0.5rem',
                        padding: 0,
                        opacity: 0.8
                    }
                }}>
                    {!isMobile && <ReactPaginate
                        forcePage={currentPage - 1}
                        nextLabel=" >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< "
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />}
                </Box>
            </Box>
        </Box>
    )
}

