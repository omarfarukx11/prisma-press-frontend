import LoginForm from "../_components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <div className=" border border-gray-200 p-5 rounded-lg space-y-5">
        <div>
        <h1 className="text-3xl text-center font-bold">Welcome back</h1>
        <p className="text-center text-lg pt-2">Enter your credential to access your account</p>
      </div>
      <LoginForm></LoginForm>
      </div>
    </div>
  )
}
