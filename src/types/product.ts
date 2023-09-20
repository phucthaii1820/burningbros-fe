export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  images: string[]
}

export interface IGetProductsApiResponse {
  data: {
    products: IProduct[]
    total: number
    limit: number
    skip: number
  }
}
