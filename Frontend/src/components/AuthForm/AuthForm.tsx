import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMyProfile,
  getProfileByToken,
  logInProfile,
} from "../../asyncThunks/profileThunks";
import { AppDispatch, RootState } from "../../dataTypes";
import { useNavigate } from "react-router-dom";
import { removeError } from "../../Slices/Slices";
import { isLogged } from "../../constants/constnats";
import { AuthFormTypes } from "./AuthFormTypes";
import clsx from "clsx";
import { useMedia } from "react-use";
const USER_NAME_REGEX = /^[a-zA-Z0-9_]{3,15}$/;
const PSW_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function AuthForm() {
  const ref = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const registerRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.theme);
  const [login, setLogin] = useState({ name: "", password: "" });
  const navigate = useNavigate();
  const [create, setCreate] = useState({ name: "", password: "" });
  const [createOrLogin, setCreateOrLogin] = useState(false);
  const isMedia = useMedia("(max-width:1200px)");
  const myprofile = useSelector(
    (state: RootState) => state.myprofile.myprofile
  );
  const error: string = useSelector(
    (state: RootState) => state.myprofile.error
  );
  const mouseenter = () => {
    if (ref.current && registerRef.current && loginRef.current) {
      const currentLeft = ref.current.style.left;
      if (currentLeft === "0px") {
        dispatch(removeError());

        registerRef.current.focus();
        ref.current.style.left = "270px";
        ref.current.style.borderRadius = "24px";
        ref.current.style.borderTopLeftRadius = "140px";
        ref.current.style.borderBottomLeftRadius = "100px";
      } else if (currentLeft === "270px") {
        dispatch(removeError());
 
        loginRef.current.focus();
        ref.current.style.left = "0px";
        ref.current.style.borderRadius = "24px";
        ref.current.style.borderTopRightRadius = "140px";
        ref.current.style.borderBottomRightRadius = "100px";
      }
    }
  };
  useEffect(() => {
    if (error?.length) {
      const timeout = setTimeout(() => {
        dispatch(removeError());
      }, 2000);
      return () => clearTimeout(timeout);
    }
    if (
      myprofile.username?.length &&
      !localStorage.getItem("profile")?.length
    ) {
      localStorage.setItem("profile", myprofile.token);
    }
    if (localStorage.getItem("profile")?.length && myprofile.username?.length) {
      navigate("/account");
    }
    if (
      localStorage.getItem("profile")?.length &&
      !myprofile.username?.length
    ) {
      dispatch(getProfileByToken());
    }
  }, [navigate, myprofile, login, dispatch, error]);
  return (
    <div
      className={clsx(
        "relative gap-x-40 shadow-md p-10 rounded-[30px] mobile:p-3 overflow-hidden justify-center flex items-center",
        theme ? "bg-gradient-custom text-purple-950" : "bg-text"
      )}
    >
      <div
        ref={ref}
        style={{
          left: "0px",
          transition: "all 0.6s ease",
          borderTopRightRadius: "140px",
          borderBottomRightRadius: "140px",
        }}
        className="absolute h-full w-[300px] desktop-lg:hidden bg-gray-300 rounded-3xl"
        onMouseEnter={mouseenter}
      />
      <div className="flex gap-x-36 desktop-lg:flex-col">
        {isMedia ? (
          createOrLogin ? (
            <AuthFormTypes
              form={"Register"}
              formInputs={create}
              setFormInputs={setCreate}
              logOrCreateThunk={createMyProfile}
              isLogged={isLogged}
              error={error}
              ref={registerRef}
              setCreateOrLogin={setCreateOrLogin}
            />
          ) : (
            <AuthFormTypes
              formInputs={login}
              setFormInputs={setLogin}
              logOrCreateThunk={logInProfile}
              isLogged={isLogged}
              form={"Login"}
              ref={loginRef}
              error={error}
              setCreateOrLogin={setCreateOrLogin}
            />
          )
        ) : (
          <>
            <AuthFormTypes
              form={"Register"}
              formInputs={create}
              setFormInputs={setCreate}
              logOrCreateThunk={createMyProfile}
              isLogged={isLogged}
              ref={registerRef}
              error={error}
              setCreateOrLogin={setCreateOrLogin}
            />
            <AuthFormTypes
              formInputs={login}
              setFormInputs={setLogin}
              logOrCreateThunk={logInProfile}
              isLogged={isLogged}
              form={"Login"}
              ref={loginRef}
              error={error}
              setCreateOrLogin={setCreateOrLogin}
            />
          </>
        )}
      </div>
    </div>
  );
}
