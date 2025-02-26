// Menggunakan folder pages untuk routing URL

import DashboardLayout from "@/components/layouts/AuthLayout/DashboardLayout";
import Category from "@/components/views/Admin/Category";


const AdminCategoryPage = () => {
  return (
    <DashboardLayout title="Category" description="List of all Categories, Create New Category, and Manage Existing Categories" type="admin">
        <Category />
    </DashboardLayout>
  )
}

export default AdminCategoryPage;