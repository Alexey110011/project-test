export const productStyles = {
    wrapper: {
         width: '270px',
         display:'flex', 
         justifyContent:'center' 
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 220,
        height: '100%',
        boxSizing: 'border-box',
        p: 0.5,
        cursor: 'pointer'
    },
    list:{
        minHeight: 48,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        fontSize: '1.1rem'
    },
    itemImage: {
        width: '200px', 
        height: '250px', 
        objectFeed: 'cover' 
    }, 
    preview: {
        width: '270px' 
    }, 
    previewImage: {
        width: '150px', 
        height: '200px'
    }
}