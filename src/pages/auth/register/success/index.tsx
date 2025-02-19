// Menggunakan folder pages untuk routing URL

import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/RegisterSuccess";

const RegisterPage = () => {
  return (
    <AuthLayout title="Acara | Register Success">
        <RegisterSuccess />
    </AuthLayout>
  )
}

export default RegisterPage;