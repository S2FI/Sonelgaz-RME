import { Layout, Menu } from "antd";
import { useState } from "react";
import { AiOutlineAudit, AiOutlineCarryOut } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";
import { FaWpforms } from "react-icons/fa";
import { BiMap, BiBarChartAlt2, BiLogOut, BiUserCircle } from "react-icons/bi";
import { TbMapSearch, TbMessage } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/actions/authAction";
import {
  DASHBOARD_ROUTE,
  FORMULAIRE_ROUTE,
  LOCALISATION_ROUTE,
  PLANNING_ROUTE,
  STATIC_ROUTE,
  NOTIFICATIONS_ROUTE,
  USERLIST_ROUTE,
  TRACABILITE_ROUTE,
} from "../static/staticPath";
import { connect } from "react-redux";

const { Sider } = Layout;

const sideBar = (props) => {
  let firstPage = "1";
  localStorage.getItem("UserRole") == "Admin" ? (firstPage = "7") : firstPage;

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
        theme="light"
        defaultSelectedKeys={[firstPage]}
        mode="inline"
      >
        {localStorage.getItem("UserRole") != "Admin" && (
          <>
            <Menu.Item key="1" icon={<HiOutlineHome size={20} />}>
              <NavLink to={DASHBOARD_ROUTE}>Page d'accueil</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<AiOutlineCarryOut size={20} />}>
              <NavLink to={PLANNING_ROUTE}>Planning</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<FaWpforms size={20} />}>
              <NavLink to={FORMULAIRE_ROUTE}>Formulaire</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<TbMapSearch size={20} />}>
              <NavLink to={LOCALISATION_ROUTE}>Map</NavLink>
            </Menu.Item>
            <Menu.Item key="6" icon={<BiBarChartAlt2 size={20} />}>
              <NavLink to={STATIC_ROUTE}>Statistiques</NavLink>
            </Menu.Item>
          </>
        )}
        {localStorage.getItem("UserRole") == "Admin" && (
          <>
            <Menu.Item key="7" icon={<BiUserCircle size={20} />}>
              <NavLink to={USERLIST_ROUTE}>Liste des Utilisateurs</NavLink>
            </Menu.Item>
            <Menu.Item key="8" icon={<AiOutlineAudit size={20} />}>
              <NavLink to={TRACABILITE_ROUTE}>Tracabilite</NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = (state) => ({
  error: state.authReducer.errorMessage,
  role: state.authReducer.userRole,
});
export default connect(mapStateToProps, { logout })(sideBar);
