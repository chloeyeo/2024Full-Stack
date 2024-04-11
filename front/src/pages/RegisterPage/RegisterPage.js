import NavBar from "../../layout/NavBar";
import { useForm } from "react-hook-form"; // used for validation check

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // removes all the data user typed in as input once button clicked to submit
    watch,
  } = useForm();
  function onSubmit(values) {
    console.log(values);
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
                className="border w-full rounded-md p-2 text-xs"
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
                className="border w-full rounded-md p-2 text-xs"
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
                className="border w-full rounded-md p-2 text-xs"
                placeholder="Please type your password"
                {...register("passwordConfirm", passwordConfirm)}
              />
              {errors.passwordConfirm && (
                <div className="text-red-500 font-semibold text-xs">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </div>
            <div>
              <button className="w-full py-2 bg-gray-800 border rounded-md text-white hover:bg-gray-500">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
