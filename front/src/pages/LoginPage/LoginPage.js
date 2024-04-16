import { useForm } from "react-hook-form"; // used for validation check
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";

// import { toast } from "react-toastify"; // toast는 thunk에서
// import axios from "axios";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // removes all the data user typed in as input once button clicked to submit
    watch,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  async function onSubmit({ email, password }) {
    // , password
    const body = { email, password };
    // const body = { email };
    dispatch(loginUser(body)); // this goes to thunk function
    reset();
    // console.log(body);
    // try {
    //   const url = "/user/login";
    //   const response = await axios.post(url, body);
    //   console.log("login successful", response.data);
    //   toast.success("login successful 😊");
    //   reset();
    // } catch (error) {
    //   toast.error(error.response.data.error + " 😢");
    //   console.error(error.response.data.error);
    // }
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

  const userPassword = {
    required: "Required",
    minLength: {
      value: 6,
      message: "Must be at least 6 characters",
    },
  };

  return (
    <>
      <section className="flex max-w-[400px]  m-auto mt-10 rounded-md border bg-white shadow-md">
        <div className="p-5 w-full">
          <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
          <hr className="mb-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
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
                className="border w-full rounded-md p-2 text-xs mb-1"
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
              <button className="w-full py-2 bg-gray-800 rounded-md text-white hover:bg-gray-500">
                Login
              </button>
            </div>
          </form>
          <div>
            <button className="text-xs text-center w-full py-2 bg-yellow-400 rounded-md">
              If ID does not exist please <a href="/register">Sign Up</a>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
