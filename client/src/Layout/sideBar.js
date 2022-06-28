import { Layout, Menu } from "antd";
import { useState } from "react";
import { AiOutlineCarryOut } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa";
import { BiMap, BiBarChartAlt2, BiLogOut } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions/authAction";
import {
  DASHBOARD_ROUTE,
  FORMULAIRE_ROUTE,
  LOCALISATION_ROUTE,
  PLANNING_ROUTE,
  STATIC_ROUTE,
  NOTIFICATIONS_ROUTE,
} from "../static/staticPath";
import { connect } from "react-redux";

const { Sider } = Layout;

const sideBar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo"></div>
      <Menu
        className="menus"
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <div>
          <Menu.Item key="1" icon={<HiOutlineHome />}>
            <NavLink to={DASHBOARD_ROUTE}>Tableau de bord</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<AiOutlineCarryOut />}>
            <NavLink to={PLANNING_ROUTE}>Planning</NavLink>
          </Menu.Item>
          <Menu.Item key="3" icon={<FaWpforms />}>
            <NavLink to={FORMULAIRE_ROUTE}>Formulaire</NavLink>
          </Menu.Item>
          <Menu.Item key="4" icon={<BiMap />}>
            <NavLink to={LOCALISATION_ROUTE}>Localisation</NavLink>
          </Menu.Item>
          <Menu.Item key="5" icon={<TbMessage />}>
            <NavLink to={NOTIFICATIONS_ROUTE}>Notifications</NavLink>
          </Menu.Item>
          <Menu.Item key="6" icon={<BiBarChartAlt2 />}>
            <NavLink to={STATIC_ROUTE}>Statistiques</NavLink>
          </Menu.Item>
        </div>

        <Menu.Item className="logout" key="0" icon={<BiLogOut />}>
          <button onClick={async () => await props.logout()}>Logout</button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
});
export default connect(mapStateToProps, { logout })(sideBar);
