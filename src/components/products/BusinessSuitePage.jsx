import ProductPageTemplate from './ProductPageTemplate'
import { businessSuiteData } from '../../data/productsData'

export default function BusinessSuitePage() {
  return <ProductPageTemplate productData={businessSuiteData} />
}
