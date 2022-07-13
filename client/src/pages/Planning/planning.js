import MainLayout from "../../Layout/mainLayout";
import { BsPencilFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Space, Table, Tag } from "antd";
import { useState } from "react";

const plannig_data = [
  {
    key: "1",
    date: "25-05-2021",
    title: "prog annual de gue",

    type: ["Entretien"],
  },
  {
    key: "2",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "3",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "4",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "5",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "6",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "7",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "8",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "9",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "10",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
  {
    key: "11",
    date: "25-05-2022",
    title: " prog annual de gue prog annual de gue",
    type: ["Maintenance"],
  },
];
const planning_columns = [
  {
    title: "Date de creation",
    dataIndex: "date",
    key: "date",
    sorter: true,
  },
  {
    title: "Titre de planning",
    dataIndex: "title",
    key: "title",
    sorter: false,
  },

  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (tags) => (
      <>
        {tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>
          <FaEye />
        </a>
        {localStorage.getItem("UserRole") === "Ing" && (
          <>
            <a>
              <BsPencilFill />
            </a>
            <a>
              <MdDeleteForever />
            </a>
          </>
        )}
      </Space>
    ),
  },
];
const Planning = () => {
  return (
    <MainLayout
      sharedData={plannig_data}
      sharedColumns={planning_columns}
      header={"Planning"}
    />
  );
};

export default Planning;
