export interface ProductType {
    //pages?: any
    id: string | number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string | undefined,
    rating: {
        rate: number,
        count: number
    }
}
export interface BasketItem {
  product:ProductType,
  quantity:number
}
export interface PaginatedItemsProps {
  total: number,
  items: ProductType[],
  itemsPerPage: number,
  currentPage: number,
  onPageChange:(page:number)=>void
}
