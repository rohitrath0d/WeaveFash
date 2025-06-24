// import { Suspense } from "react";

// export default function AddProductPage() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
    
//     </Suspense>
//   );
// }


// export default SuspenseBoundary
import { Suspense, ReactNode } from "react";

// ❌ You're importing a page.tsx file (which is already a full Next.js route handler) into a component (SuspenseBoundary) — this is not recommended and can cause unexpected behavior or build errors in App Router.
// import SuperAdminManageProductPage from "./app/super-admin/products/add/page";

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const SuspenseBoundary = ({
  children,
  fallback = <div>Loading...</div>,
}: SuspenseBoundaryProps) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default SuspenseBoundary;
