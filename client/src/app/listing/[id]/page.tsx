import { Suspense } from "react";
import ProductDetailsSkeleton from "../[id]/productSkeleton";
import ProductDetailsContent from "../[id]/productDetails";


interface PageProps {
     params: {
    id: string;
  };  
}


// function ProductDetailsPage({ params }: { params: { id: string } }) {
// function ProductDetailsPage({ params }: { params: { id: string } }) {
function ProductDetailsPage({ params }: PageProps) {

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={params.id} />
    </Suspense>
  );
}

export default ProductDetailsPage;
