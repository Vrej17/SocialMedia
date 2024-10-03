import { forwardRef, SetStateAction, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../dataTypes";
import {
  createMyProfile,
  logInProfile,
} from "../../asyncThunks/profileThunks";
import clsx from "clsx";

type formTypes = {
  isLogged: string | null;
  error: string;
  formInputs: { name: string; password: string };
  setFormInputs: Dispatch<SetStateAction<{ name: string; password: string }>>;
  setCreateOrLogin: Dispatch<SetStateAction<boolean>>;
  logOrCreateThunk: typeof logInProfile | typeof createMyProfile;
  form: string;
};

export const AuthFormTypes = forwardRef<HTMLInputElement, formTypes>(
  (
    {
      isLogged,
      error,
      formInputs,
      setFormInputs,
      setCreateOrLogin,
      logOrCreateThunk,
      form,
    }: formTypes,
    ref
  ) => {
    const dispatch = useDispatch<AppDispatch>();
   
    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex-col gap-y-4 flex items-center text-center"
      >
        <div className="rounded-t-lg rounded-r-2xl text-xl bg-gray-300 h-16 w-36 justify-center items-center flex">
          <h1 className="text-xl">{form === "Login" ? "Log In to Your Account" : "Create New Account"}</h1>
        </div>
        <label>
          <h1 className="text-white text-[20px]">Username</h1>
          <input
            autoComplete={isLogged?.length ? isLogged : "off"}
            ref={ref}
            value={formInputs?.name}
            onChange={(e) =>
              setFormInputs((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Username"
            className="outline-0 rounded p-1"
          />
        </label>
        <label>
          <h1 className="text-white text-[20px]">Password</h1>
          <input
            autoComplete="off"
            value={formInputs?.password}
            onChange={(e) =>
              setFormInputs((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Password"
            className="outline-0 rounded p-1"
          />
        </label>
        <div className="h-5 bg-transparent text-white">
          {error?.length !== 0 && error}
        </div>

        <button
          onClick={() => dispatch(logOrCreateThunk(formInputs))}
          type="submit"
          className="static p-1 w-28 border hover:bg-orange-700 text-white transition-all duration-300 border-white rounded"
        >
          {form === "Login" ? "Log In" : "Register"}
        </button>
        <button
          type="button"
          className={clsx("bg-transparent border-none desktop:hidden text-white")}
          onClick={() => setCreateOrLogin((prev) => !prev)}
        >
          {form === "Login" ? "Create New Account" : "Already Have An Account"}?
        </button>
      </form>
    );
  }
);
