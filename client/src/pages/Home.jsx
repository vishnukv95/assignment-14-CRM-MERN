import { Link } from "react-router-dom";

function Home() {

  const token = localStorage.getItem('token') 
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 mt-60">
      <h1 className="text-4xl font-bold mb-4">Welcome to CRM Application</h1>
      <p className="text-gray-600 max-w-xl">
        Manage <span className="font-semibold">customers</span>,{" "}
        <span className="font-semibold">cases</span>, and{" "}
        <span className="font-semibold">users</span> efficiently with
        role-based access control.
      </p>

      <div className="mt-6 space-x-4">
       {!token && (<> <Link
          to="/login"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
        >
          Register
        </Link></>)}
      </div>
    </div>
  );
}

export default Home;
