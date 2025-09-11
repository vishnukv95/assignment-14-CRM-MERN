import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api = import.meta.env.VITE_API_URL
const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
     
    try {
      const res = await axios.post(
        `${api}/api/customers/`,
        data
      );
      
      alert(res.data.message);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error(err.response?.data?.error);
      
    }
  };

  return (
    <form
      className="flex flex-col gap-6 max-w-sm mx-auto mt-40 bg-inherit p-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <h2 className="text-white font-extrabold text-2xl text-center">
        Create an account
      </h2>

     
      <div>
        <input
          className="bg-gray-100 border border-green-600 text-gray-900 text-sm rounded-lg 
          w-full p-2.5 shadow"
          type="text"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-600 bg-white text-center text-sm rounded-lg mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      
      <div>
        <input
          className="bg-gray-100 border border-green-600 text-gray-900 text-sm rounded-lg 
          w-full p-2.5 shadow"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-600 bg-white text-center text-sm rounded-lg mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      
      <div>
        <input
          className="bg-gray-100 border border-green-600 text-gray-900 text-sm rounded-lg 
          w-full p-2.5 shadow"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-600 bg-white text-center text-sm rounded-lg mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

     
      <button
        type="submit"
        className="text-white cursor-pointer w-full border-2 bg-gradient-to-l from-green-500
        via-green-600 to-green-600 hover:bg-gradient-to-br focus:ring-4 
        rounded-lg font-bold px-5 py-2.5 text-center mb-2 shadow"
      >
        Register
      </button>

     
      <p className="text-sm text-white text-center">
        Already have an account?{" "}
        <a className="text-blue-700" href="/login">
          Click here to Log in
        </a>
      </p>
    </form>
  );
};

export default Register;
