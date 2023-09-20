import HttpUtility from './HttpUtility'

export const getProductsByCategory = (category) => {
  return HttpUtility.get(`https://dummyjson.com/products/category/${category}`)
}
