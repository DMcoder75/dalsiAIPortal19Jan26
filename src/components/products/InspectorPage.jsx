import ProductPageTemplate from './ProductPageTemplate'
import { inspectorData } from '../../data/productsData'

export default function InspectorPage() {
  return <ProductPageTemplate productData={inspectorData} />
}
