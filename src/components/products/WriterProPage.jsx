import ProductPageTemplate from './ProductPageTemplate'
import { writerProData } from '../../data/productsData'

export default function WriterProPage() {
  return <ProductPageTemplate productData={writerProData} />
}
