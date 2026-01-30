 import {  Box,} from '@mui/material';
 import type { ProductType } from '../types/types';
 import { productStyles } from './styles/product.styles';

const ProductPreview = ({product}:{product:ProductType}) => {
    return (
        <>
            {product && (
                <Box sx={productStyles.preview}>
                    <Box component="img"
                         src={product.image}
                         alt={product.title}
                         sx={productStyles.previewImage} />                       
                </Box>
            )}
        </>
    );
};
export default ProductPreview;
