import type { ProductType } from "../types/types";

export const fetchTotal = async () => {
                const res = await fetch(`https://fakestoreapi.com/products`);
                const data = await res.json();
                console.log('Data total', data.length)
                return data.length
        };

export const fetchProducts = async (page:number, itemsPerPage: number) => {
    console.log("Page",page,"Items per page", itemsPerPage)
                const limit = page*itemsPerPage
                 const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
                const data = await res.json();
                console.log('Data', data)
                data.forEach((item: ProductType) => console.log(`${item.title}:${item.category}`))
                return data
        };

export const fetchLazyForMobile = async(page:number | unknown, itemsPerPage:number)=>{
    const pageNumber = typeof page === 'number' ? page : 1;
    const limit = pageNumber*itemsPerPage
    const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`)
    const data = await res.json()
    const start = (pageNumber - 1) * itemsPerPage
    const pageData = data.slice(start, limit)
    console.log('Page data', pageData.map((p:ProductType) => p.title))
    return pageData
}