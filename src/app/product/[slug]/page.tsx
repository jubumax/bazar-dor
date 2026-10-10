import { notFound } from "next/navigation";
import ProductDetails from "@/src/components/product/ProductDetails";
import { getProduct } from "@/src/lib/api";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
