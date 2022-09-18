import { Layout, Avatar, Tooltip, Button } from "antd";
import GisComponent from "../pages/gis/gisComponent";
import TableComponent from "../components/Table";
import { BsGoogle } from "react-icons/bs";
import PageDaccueil from "../components/pageDaccueil";
import MainStats from "../pages/stats/mainStats";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authAction";
import { BiLogOut } from "react-icons/bi";
const { Content, Footer, Header } = Layout;

const MainLayout = (props) => {
  const renderChildElement = () => {
    switch (props.renderElement) {
      case "dashboard":
        return <PageDaccueil />;
      case "gis":
        return <GisComponent />;
      case "stats":
        return <MainStats />;
      default:
        return (
          <TableComponent
            listVisite={props.listVisite}
            sharedData={props.sharedData}
            sharedColumns={props.sharedColumns}
            header={props.header}
            loading={props.loading}
          />
        );
    }
  };

  return (
    <Layout className="site-layout">
      <Header className="site-layout-background">
        <h1
          style={{
            color: "rgb(0 0 0 / 85%)",
          }}
        >
          {props.header}
        </h1>
        <div>
          <Tooltip placement="bottom" title={localStorage.getItem("Username")}>
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: "10px", marginBottom: "10px" }}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Déconnecter">
            <Button
              type="primary"
              shape="circle"
              style={{ marginBottom: "10px", paddingTop: "28px" }}
              onClick={async () => await props.logout()}
              icon={<BiLogOut size={20} className="logouticon" />}
            ></Button>
          </Tooltip>
        </div>
      </Header>

      <Content
        style={{
          margin: "0 16px",
        }}
      >
        {renderChildElement()}
      </Content>
      <Footer
        style={{
          margin: "0px",
          textAlign: "center",
          color: "#fa8c16",
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: "Segoe UI",
        }}
      >
        Copyright © Sonelgaz - Distribution 2022 | Conception & réalisation
        ELIT.Spa Société du groupe SONELGAZ
      </Footer>
    </Layout>
  );
};
export default connect(null, { logout })(MainLayout);
