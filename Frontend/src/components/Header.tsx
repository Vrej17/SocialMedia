import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../dataTypes";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { base64 } from "../constants/constnats";
export const Header: FC = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  return (
    <header
      className={clsx(
        "flex gap-x-8 fixed w-full items-center mobile-sm:gap-x-2 min-h-max text-white m-0 px-10 mobile:px-5 z-20",
        theme
          ? " bg-violet-800 bg-gradient-header"
          : "bg-cyan-950"
      )}
    >
      <Logo
        className={clsx(
          "mobile:text-xl font-playwriteRegular mobile-md:hidden text-2xl"
        )}
        onClick={() => {
          profile.id ? navigate("/posts") : navigate("/auth");
        }}
      />
      <span className="flex w-1/3 justify-center">
        {["Posts"].map((item, index) => {
          return (
            <Link
              key={index}
              className="cursor-pointer py-[26px] border-b-transparent border-b-2 font-bold font-mono text-xl hover:border-b-slate-800 transition-all duration-300 hover:scale-105 flex items-center"
              to={`/${item.replace(/\s+/g, "").toLocaleLowerCase()}`}
            >
              {item}
            </Link>
          );
        })}
      </span>

      <div className="flex ml-auto gap-x-8 mobile-md:gap-x-2 items-center">
        {profile.icon && (
          <Link to="/account">
            <img
              src={`${base64}${profile.icon}`}
              className="rounded-full hover:scale-110 transition-all w-14 h-14 duration-300 object-cover"
              alt="Profile Icon"
            ></img>
          </Link>
        )}
      </div>
    </header>
  );
};
