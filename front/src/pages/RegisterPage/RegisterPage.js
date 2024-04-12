import NavBar from "../../layout/NavBar";
import { useForm } from "react-hook-form"; // used for validation check
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // removes all the data user typed in as input once button clicked to submit
    watch,
  } = useForm({ mode: "onChange" });
  async function onSubmit({ email, username, password }) {
    const body = {
      email,
      username,
      password,
    };
    console.log(body);
    try {
      // change from url="http://localhost:4000.user/register"
      // to adding proxy: "http://localhost:4000" to package.json
      // and changing url to "/user/register"
      // the proxy makes our port 3000 server LOOK AS IF it is port 4000
      // so that when we send request to port 4000 server
      // port 4000 server will recognise as coming from the same computer
      // and thus not throw cors error.
      const url = "/user/register";
      const response = await axios.post(url, body);
      console.log("sign up successful", response.data);
      toast.success("Sign Up Complete 😊");
      console.log(body);
      reset();
    } catch (error) {
      console.error("request failed:", error);
      // window key + . to use emoji
      toast.error("Sign Up Failed 😢");
    }
  }

  const userEmail = {
    required: "Required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
    minLength: {
      value: 6,
      message: "Must be at least 6 characters",
    },
  };
  const userName = {
    required: "Required",
    minLength: {
      value: 2,
      message: "Must be at least 2 characters",
    },
    validate: (value) => value !== "admin" || "Nice try!",
  };
  const userPassword = {
    required: "Required",
    minLength: {
      value: 6,
      message: "Must be at least 6 characters",
    },
  };
  const passwordConfirm = {
    required: "Required",
    validate: (value) =>
      value === watch("password") || "Password does not match",
  };
  return (
    <>
      <NavBar />
      <section className="flex max-w-[400px]  m-auto mt-10 rounded-md border bg-white shadow-md">
        <div className="p-5 w-full">
          <h2 className="text-center text-2xl font-semibold mb-4">Sign Up</h2>
          <hr className="mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-600 flex mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                className="border w-full rounded-md p-2 mb-1 text-xs"
                placeholder="Please type your username"
                {...register("username", userName)}
              />
              {errors.username && (
                <div className="text-red-500 font-semibold text-xs">
                  {errors.username.message}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-600 flex mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="border w-full rounded-md p-2 text-xs mb-1"
                placeholder="Please type your email"
                {...register("email", userEmail)}
              />
              {errors.email && (
                <div className="text-red-500 font-semibold text-xs">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-600 flex mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border w-full rounded-md p-2 mb-1 text-xs"
                placeholder="Please type your password"
                {...register("password", userPassword)}
              />
              {errors.password && (
                <div className="text-red-500 font-semibold text-xs">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-semibold text-gray-600 flex mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                className="border w-full rounded-md p-2 mb-1 text-xs"
                placeholder="Please type your password"
                {...register("passwordConfirm", passwordConfirm)}
              />
              {errors.passwordConfirm && (
                <div className="text-red-500 font-semibold text-xs">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <button className="w-full py-2 bg-gray-800 rounded-md text-white hover:bg-gray-500">
                Sign Up
              </button>
            </div>
          </form>
          {/* should put the go to Login button OUTSIDE form otherwise won't work bc form will work */}
          <div>
            <button className="text-xs text-center w-full py-2 bg-yellow-400 rounded-md">
              If ID exists please <a href="/login">Login</a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
