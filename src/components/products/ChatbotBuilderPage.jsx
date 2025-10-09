import ProductPageTemplate from './ProductPageTemplate'
import { chatbotBuilderData } from '../../data/productsData'

export default function ChatbotBuilderPage() {
  return <ProductPageTemplate productData={chatbotBuilderData} />
}
