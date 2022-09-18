import { useEffect, useState } from "react";
import { connect } from "react-redux";
import MainLayout from "../Layout/mainLayout";
import { getTrackList } from "../redux/actions/authAction";
import moment from "moment";
const Tracabilite = (props) => {
  const [dataSource, setDataSource] = useState(props.tracking_list);

  useEffect(() => {
    props.getTrackList();
  }, []);

  useEffect(() => {
    setDataSource(props.tracking_list);
  }, [props.tracking_list]);
  const trace_columns = [
    {
      title: "Date de l'action",
      dataIndex: "date",
      key: "date",
      sorter: true,
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Nom d'utilisateur",
      dataIndex: "tracked_user",
      key: "tracked_user",
    },
    {
      title: "Role",
      dataIndex: "user_role",
      key: "user_role",
      sorter: false,
    },
    {
      title: "IP d'utilisateur",
      dataIndex: "ip_address",
      key: "ip_address",
      sorter: false,
    },
    {
      title: "Operation effectue",
      dataIndex: "action_tracked",
      key: "action_tracked",
      sorter: false,
      width: "35%",
    },
  ];

  return (
    <MainLayout
      sharedData={dataSource}
      sharedColumns={trace_columns}
      header="Traçabilite"
    />
  );
};

const mapStateToProps = (state) => ({
  tracking_list: state.authReducer.tracks,
});
export default connect(mapStateToProps, {
  getTrackList,
})(Tracabilite);
