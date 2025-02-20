// Menggunakan folder pages untuk routing URL

import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const RegisterPage = () => {
  return (
    <AuthLayout title="Acara | Login">
        <Login />
    </AuthLayout>
  )
}

export default RegisterPage;