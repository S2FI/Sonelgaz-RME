import { Space, Table, Tag } from "antd";

// const data = [
//   {
//     key: "1",
//     date: "25-05-2021",
//     title: "prog annual de gue",
//     type: ["Entretien"],
//   },
//   {
//     key: "2",
//     date: "25-05-2022",
//     title: " prog annual de gue prog annual de gue",
//     type: ["Maintenance"],
//   },
// ];
// const MyColumns = [
//   {
//     title: "Date de creation",
//     dataIndex: "date",
//     key: "date",
//     sorter: true,
//   },
//   {
//     title: "Titre de planning",
//     dataIndex: "title",
//     key: "title",
//     sorter: false,
//   },

//   {
//     title: "Type",
//     dataIndex: "type",
//     key: "type",
//     render: (tags) => (
//       <>
//         {tags.map((tag) => (
//           <Tag color="blue" key={tag}>
//             {tag}
//           </Tag>
//         ))}
//       </>
//     ),
//   },
//   {
//     title: "Action",
//     key: "action",
//     render: (_, record) => (
//       <Space size="middle">
//         <a>modif</a>
//         <a>Delete</a>
//       </Space>
//     ),
//   },
// ];

const TableComponent = (props) => {
  return <Table dataSource={props.sharedData} columns={props.sharedColumns} />;
};
export default TableComponent;
