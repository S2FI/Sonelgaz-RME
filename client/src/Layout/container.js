import Main from "./main";
import SideBar from "./sideBar";
import { Layout } from "antd";
const Container = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SideBar />
      <Main />
    </Layout>
  );
};
export default Container;
