// Menggunakan folder pages untuk routing URL

import DashboardLayout from "@/components/layouts/AuthLayout/DashboardLayout";
import DashboardAdmin from "@/components/views/Admin/Dashboard";


const AdminDashboardPage = () => {
  return (
    <DashboardLayout title="Acara | Login">
        <DashboardAdmin />
    </DashboardLayout>
  )
}

export default AdminDashboardPage;