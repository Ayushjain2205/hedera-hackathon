import { Navbar } from "@/components/navbar";
import { RegistrationForm } from "@/components/registration-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900">
      <Navbar />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600">
          Agent Registration
        </h1>
        <RegistrationForm />
      </div>
    </div>
  );
}
