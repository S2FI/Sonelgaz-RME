import { Layout } from "antd";
import GisComponent from "../pages/gis/gisComponent";
import TableComponent from "../components/Table";
import { BsGoogle } from "react-icons/bs";
import PageDaccueil from "../components/pageDaccueil";
const { Content, Footer, Header } = Layout;

const MainLayout = (props) => {
  const renderChildElement = () => {
    switch (props.renderElement) {
      case "dashboard":
        return <PageDaccueil />;
      case "gis":
        return <GisComponent />;
      case "stats":
        return <div>Statistiques</div>;
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
      <Header
        className="site-layout-background"
        style={{
          textAlign: "center",
          padding: 0,
        }}
      >
        <h1
          style={{
            color: "white",
          }}
        >
          {props.header}
        </h1>
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
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainLayout;
