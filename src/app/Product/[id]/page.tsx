import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  // All 5 products
  return [
    { id: 'finsoeasy360' },
    { id: 'famso-easy-360' },
    { id: 'reconso-easy-360' },
    { id: 'lease-tool' },
    { id: 'rpt' }
  ];
}

type Props = {
  params: { id: string };
};

export default function ProductPage({ params }: Props) {
  return <ProductPageClient params={params} />;
}
