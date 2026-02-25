import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center flex-col justify-center m-5 h-screen">
      <SignIn forceRedirectUrl="/redirect" />
      <div className="shadow-lg mt-6 max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-center text-blue-700 mb-4">
          Demo Test Credentials
        </h2>

        <div className="space-y-3 text-sm text-gray-700">
          <div className="bg-white rounded-md p-3 flex justify-between items-center shadow-sm">
            <span className="font-medium">Admin</span>
            <span className="text-xs text-gray-500">
              username: <strong>admin1</strong> | password:{" "}
              <strong>Ladmin32!</strong>
            </span>
          </div>

          <div className="bg-white rounded-md p-3 flex justify-between items-center shadow-sm">
            <span className="font-medium">Teacher</span>
            <span className="text-xs text-gray-500">
              username: <strong>teacher1</strong> | password:{" "}
              <strong>Lteacher32!</strong>
            </span>
          </div>

          <div className="bg-white rounded-md p-3 flex justify-between items-center shadow-sm">
            <span className="font-medium">Student</span>
            <span className="text-xs text-gray-500 ml-2">
              username: <strong>student1</strong> | password:{" "}
              <strong>Lstudent32!</strong>
            </span>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-4">
          ⚠️ These are demo accounts for testing purposes only.
        </p>
      </div>
    </div>
  );
}
