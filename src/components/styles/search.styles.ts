export const searchStyles = {

searchSection:{
  display: 'flex', 
  justifyContent: 'center'
},

searchInput: {
   maxWidth: '400px', 
   marginBottom: '20px'
},

wrapper: {
    display: "flex",
    gap: 4.75,
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
    touchAction: "pan-x",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": { display: "none" }
},

searchItem: {
    minWidth: '220px', 
    flexShrink: 0 
},

image: {
  width: '200px', 
  height: '250px', 
  objectFeed: 'cover' 
},

resultsSection: {
    display: "flex",
    gap: 4,
    position: 'relative'
},

leftArrowButton: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    backgroundColor: "white",
},

rightArrowButton: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    backgroundColor: "white",
  },

resultsInfo: {
 marginBottom: '20px"' 
},
results: {
    display: 'flex', 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: ' center', 
    border: '1px solid green' 
  },
}