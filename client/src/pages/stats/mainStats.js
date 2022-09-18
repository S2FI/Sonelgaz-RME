import { GiPylon } from "react-icons/gi";
import {
  Divider,
  Menu,
  PageHeader,
  Select,
  Dropdown,
  Space,
  Progress,
  Carousel,
} from "antd";
import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  getPlanningList,
  getProgramme,
  getOuvrageData,
  getEntretienForms,
} from "../../redux/actions/planningAction";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import DepartContent from "./departContent";

const MainStats = (props) => {
  const [current, setCurrent] = useState(0);
  const [entretien, setentretien] = useState([]);
  const [title, setTitle] = useState("Choisir un planning");
  const [planningKey, setplanningKey] = useState([]);
  const [progress, setprogress] = useState(0);

  const menuItems = [];
  const items = [];
  const content = [];
  let content_child = [];
  let progres = 0;

  useEffect(() => {
    props.getEntretienForms();
    props.getOuvrageData();
  }, []);

  useEffect(() => {
    displayE(props.entretien_list);
  }, [props.entretien_list]);

  for (let index = 0; index < 8; index++) {
    items.push({
      label: "Group depart " + index,
      key: index,
      icon: <GiPylon size={15} color="orange" />,
    });
  }
  //fonction de manupulation des donnees d'entretiens
  const displayE = (list) => {
    let vis = [];
    Object.keys(list)?.forEach(async (key) => {
      let data = list[key][0];
      vis.push({
        key: key,
        title: data.titleplan,
        type: [data.typeForm],
      });
    });
    if (vis.length != 0) {
      setentretien(vis);
    }
  };

  Object.keys(props.ouvrage_list)?.forEach((key, index) => {
    let obj = {
      accessoire: <DepartContent statdata={planningKey} title={key} />,
    };
    content_child.push(obj);
    if ((index + 1) % 4 == 0) {
      content.push(content_child);
      content_child = [];
    } else if (index == 30) {
      content.push(content_child);
    }
  });

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const onClickMenu = ({ key }) => {
    setTitle(props.entretien_list[key][0].titleplan);
    setplanningKey(props.entretien_list[key]);
  };

  entretien?.map((data) => {
    let obj = {
      label: data.title,
      key: data.key,
    };
    menuItems.push(obj);
  });
  const menu = <Menu items={menuItems} onClick={onClickMenu} />;

  planningKey?.map((data) => {
    progres = progres + parseFloat(data.longueur_visiter);
    console.log(data.longueur_visiter);
    console.log(" =>", progres);
    // setprogress((prevdata) => {
    //   return prevdata + ;
    // });
  });
  // console.log("s7i7a hablet brk", progress);
  console.log("hadi des entretien li kharbetha =>", entretien);
  console.log("hadi des entretien li jebtha", props.entretien_list);
  return (
    <React.Fragment>
      {props.ouvrage_list.length === 0 ? (
        <ReactLoading
          type="spin"
          color="orange"
          height={667}
          width={375}
          className="Loading"
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "16px",
            // justifyContent: "space-between",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <a
              onClick={(e) => {
                e.preventDefault();
                console.log(e);
              }}
            >
              <Space>
                <PageHeader
                  className="site-page-header"
                  title={title}
                  style={{
                    fontFamily: "Segoe UI",
                  }}
                />
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <Menu
            onClick={onClick}
            defaultSelectedKeys={[current]}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
          <div></div>

          <div
            className="my_content"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <div className="depart-title">{content[current][0].accessoire}</div>

            <Divider
              type="vertical"
              style={{
                marginTop: "20px",
                height: "370px",
                width: "1px",
              }}
            />

            <div className="depart-title">{content[current][1].accessoire}</div>

            <Divider
              type="vertical"
              style={{
                marginTop: "20px",
                width: "1px",
                height: "370px",
              }}
            />

            <div className="depart-title">{content[current][2].accessoire}</div>

            {content[current].length != 3 ? (
              <React.Fragment>
                <Divider
                  type="vertical"
                  style={{
                    marginTop: "20px",
                    height: "370px",
                    width: "1px",
                  }}
                />

                <div className="depart-title">
                  {content[current][3].accessoire}
                </div>
              </React.Fragment>
            ) : null}
          </div>

          <Divider orientation="left" style={{ fontFamily: "Segoe UI" }}>
            Taux de realisation
          </Divider>
          <div> </div>
          <Progress
            percent={(progres * 100) / 50} //progress / 10
            strokeColor="#faad14"
            trailColor="#ffff"
            style={{
              width: "50%",
              marginLeft: "20%",
            }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  planning_list: state.planningReducer.plan,
  program_list: state.planningReducer.program,
  ouvrage_list: state.planningReducer.data,
  entretien_list: state.planningReducer.Ent,
});
export default connect(mapStateToProps, {
  getPlanningList,
  getProgramme,
  getEntretienForms,
  getOuvrageData,
})(MainStats);
