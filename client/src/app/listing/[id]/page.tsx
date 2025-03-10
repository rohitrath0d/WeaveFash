import { Suspense } from "react";
import ProductDetailsSkeleton from "../[id]/productSkeleton";
import ProductDetailsContent from "../[id]/productDetails";



// function ProductDetailsPage({ params }: { params: { id: string } }) {
function ProductDetailsPage({ params }: { params: { id: string } }) {

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent id={params.id} />
    </Suspense>
  );
}

export default ProductDetailsPage;