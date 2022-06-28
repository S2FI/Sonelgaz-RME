import { connect } from "react-redux";
import { Layout } from "antd";
import { logout } from "../redux/actions/authAction";
import TableComponent from "../components/Table";
const { Content, Footer, Header } = Layout;

const MainLayout = (props) => {
  return (
    <Layout className="site-layout">
      <Header
        className="site-layout-background"
        style={{
          textAlign: "center",
          padding: 0,
        }}
      >
        <h1> Tableau de bord</h1>
      </Header>

      <Content
        style={{
          margin: "0 16px",
        }}
      >
        <TableComponent
          sharedData={props.sharedData}
          sharedColumns={props.sharedColumns}
        />

        <button
          onClick={async () => await props.logout()}
          className="btn btn-primary"
          style={{
            color: "red",
          }}
        >
          Logout
        </button>
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

const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { logout })(MainLayout);
