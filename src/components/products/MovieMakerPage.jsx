import ProductPageTemplate from './ProductPageTemplate'
import { movieMakerData } from '../../data/productsData'

export default function MovieMakerPage() {
  return <ProductPageTemplate productData={movieMakerData} />
}
