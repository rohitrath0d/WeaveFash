import { Suspense } from "react";
import ProductDetailsSkeleton from "../[id]/productSkeleton";
import ProductDetailsContent from "../[id]/productDetails";


// interface PageProps {
//      params: {
//     id: string;
//   };  
// }

// type PageProps = {
//      params: {
//     id: string;
//   };  
// }

// ✅ Define the async type
type Params = Promise<{ id: string }>;

// function ProductDetailsPage({ params }: { params: { id: string } }) {
// function ProductDetailsPage({ params }: PageProps) {
async function ProductDetailsPage({ params }: { params: Params }) {
       
     const { id } = await params;
     
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
{/*       <ProductDetailsContent id={params.id} /> */}
      <ProductDetailsContent id={id} />
    </Suspense>
  );
}

export default ProductDetailsPage;
