import ProductPageTemplate from './ProductPageTemplate'
import { translateGlobalData } from '../../data/productsData'

export default function TranslateGlobalPage() {
  return <ProductPageTemplate productData={translateGlobalData} />
}
