// import SuspenseBoundary from "@/SuspenseBoundary";
// import SuperAdminManageProductPage  from "@/app/super-admin/products/add/page";

// export default function ManageProductPageFallback() {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Add Product</h1>

//       <SuspenseBoundary fallback={<p>Loading form...</p>}>
//         <SuperAdminManageProductPage />
//       </SuspenseBoundary>
//     </div>
//   );
// }


import { Suspense } from 'react';
import SuperAdminManageProductPage  from "@/app/super-admin/products/add/page";


// The default export of page.jsx is used internally by Next.js to be rendered in the route. Update your code to wrap the UpdatePrompt in a parent component:
const SuspenseBoundary =() => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <Suspense fallback={<p>Loading form...</p>}>
        <SuperAdminManageProductPage />
      </Suspense>
    </div>
  );
}
export default SuspenseBoundary;
