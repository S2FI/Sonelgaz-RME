import { Button, Menu } from "antd";
import { AiOutlineCarryOut } from "react-icons/ai";
import { BsFillArrowUpRightSquareFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { PLANNING_ROUTE } from "../static/staticPath";
const image = require("../images/Pg2.jpg");
function PageDaccueil() {
  console.log(window.innerHeight, window.innerWidth);
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",

        width: "100%",
        height: "625px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginLeft: "30px",
        }}
      >
        <Button
          type="primary"
          style={{
            fontSize: "16px",
            // fontWeight: "bold",

            paddingBottom: "30px",
            borderRadius: "3px",
            marginTop: "70px",
          }}
        >
          <NavLink to={"/planning"}>
            {" "}
            {localStorage.getItem("UserRole") === "Ing"
              ? "Commencer à planifier"
              : "Consulter les plannings"}
          </NavLink>
        </Button>
      </div>
    </div>
  );
}

export default PageDaccueil;
