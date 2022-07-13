import { Alert, Button, Form, Input, Popconfirm, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import ModalComponent from "./modal";
const { Search } = Input;
const onSearch = (value) => console.log(value);

const TableComponent = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <Table
      title={() => (
        <div className="TableTitle">
          <ModalComponent width="100%" header={props.header} />

          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>
      )}
      dataSource={props.sharedData}
      columns={props.sharedColumns}
      loading={loading}
      pagination={{ pageSize: 7 }}
      scroll={{
        y: `60vh`,
      }}
    />
  );
};
export default TableComponent;
