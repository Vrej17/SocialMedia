import { useSelector } from "react-redux";
import { Spin } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import Layout from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { RootState } from "./dataTypes";
import clsx from "clsx";

function App() {
  const isLoading = useSelector((state: RootState) => state.loading);
  const theme = useSelector((state: RootState) => state.theme);
  const profile = useSelector((state: RootState) => state.myprofile.myprofile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile.id?.length) {
      return navigate("/auth");
    }
  }, [profile, navigate]);

  return (
    <div
      className={clsx(
        "bg-gradient-to-blue min-h-screen flex justify-center overflow-x-hidden",
        !theme && "bg-slate-800"
      )}
    >
      <Header />
      <Layout className="flex items-center bg-transparent">
        <Content>
          <div className="mt-28 flex p-5 flex-col items-center gap-y-6">
            <Outlet />
            {isLoading && (
              <Spin
                indicator={
                  <Loading3QuartersOutlined
                    className="self-center"
                    style={{ fontSize: "70px" }}
                    spin
                  />
                }
                fullscreen
                style={{ fontSize: "100px" }}
                className="absolute top-[30%] left-[47%]"
                size="large"
              />
            )}
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
