

export interface Book{
    id : number,
    category: {
        id: number,
        nameCategory: string,
    },
    nameBook: string,
    author: string,
    discount: number,
    quantity: number,
    price: number,
    detail: string,
    bookImages: [
        {
        id: number,
        image: string
    }]
}