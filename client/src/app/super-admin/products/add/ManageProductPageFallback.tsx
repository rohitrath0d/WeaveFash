import SuspenseBoundary from "@/SuspenseBoundary";
import SuperAdminManageProductPage  from "@/app/super-admin/products/add/page";

export default function ManageProductPageFallback() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <SuspenseBoundary fallback={<p>Loading form...</p>}>
        <SuperAdminManageProductPage />
      </SuspenseBoundary>
    </div>
  );
}
