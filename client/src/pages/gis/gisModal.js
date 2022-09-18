import { Button, Divider, Empty, Modal, Popover, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getDetOuvrage } from "../../redux/actions/planningAction";
import ReactLoading from "react-loading";
import { getForm } from "../../api/planning";
import GisForm from "./gisForms";
const GisModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [progvisible, setprogvisible] = useState(false);
  const [formvisible, setformvisible] = useState(false);
  const [datasource, setdatasource] = useState(props.Ouvr);
  const [program, setprogram] = useState(props.Ouvr);
  const [form, setform] = useState([]);
  const [visite, setvisite] = useState(false);
  const [ent, setent] = useState(false);
  const [maint, setmaint] = useState(false);
  const [pop, setpop] = useState(false);

  const formdata = async (ouvrage) => {
    await getForm(ouvrage)
      .then((result) => {
        setform(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const defaultColumns = [
    {
      title: "Titre",
      dataIndex: "title",
      width: "20%",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "type",
      //width: "25%",
      align: "center",
    },
    {
      title: "Date de debut",
      dataIndex: "debut",
      //width: "25%",
      align: "center",
    },
    {
      title: "Date de fin",
      dataIndex: "fin",
      // width: "25%",
      align: "center",
    },
    {
      title: "District",
      dataIndex: "district",

      align: "center",
    },
    {
      title: "Depart",
      dataIndex: "depart",
      align: "center",
    },
    {
      title: "Code ouvrage",
      dataIndex: "code_ouvrage",

      align: "center",
    },
    {
      title: "Equipe",
      dataIndex: "equipe",

      align: "center",
    },
    {
      title: "Responsable",
      dataIndex: "user",
      //width: "25%",
      align: "center",
    },
  ];

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    props.hidemodal();
  };
  const handleprogCancel = () => {
    console.log("Clicked cancel button");
    setprogvisible(false);
  };
  const showModal = () => {
    setprogvisible(true);
  };
  const handleformCancel = () => {
    console.log("Clicked cancel button");
    setformvisible(false);
    setvisite(false);
    setent(false);
    setmaint(false);
  };
  const showForm = () => {
    setformvisible(true);
  };
  useEffect(() => {
    props.getDetOuvrage(props.ouvrage);
    formdata(props.ouvrage);
  }, [props.ouvrage]);

  useEffect(() => {
    if (props.visibilite == true) {
      setVisible(true);
    }
  }, [props.visibilite]);

  console.log("form data =>", form);
  useEffect(() => {
    setdatasource(props.Ouvr);
    setprogram(
      props.Ouvr?.map((data, index) => {
        return (data = {
          key: index,
          title: data.plan.Titre_planning,
          type: data.plan.Type_planning,
          debut: data.date_debut_programme,
          fin: data.date_fin_programme,
          district: data.district,
          depart: data.depart,
          code_ouvrage: props.ouvrage,
          equipe: data.nom_equipe_programme,
          user: data.plan.user_created,
        });
      })
    );
  }, [props.Ouvr]);

  const hide = () => {
    setpop(false);
  };

  const content = (
    <div>
      <Button
        type="primary"
        style={{ marginRight: "10px" }}
        onClick={() => {
          showForm();
          setvisite(true);
          hide();
        }}
      >
        Form visite
      </Button>
      <Button
        style={{ marginRight: "10px", marginLeft: "10px" }}
        type="primary"
        onClick={() => {
          showForm();
          setent(true);
          hide();
        }}
      >
        Form entretien
      </Button>
      <Button
        style={{ marginLeft: "10px" }}
        type="primary"
        onClick={() => {
          showForm();
          setmaint(true);
          hide();
        }}
      >
        Form maintenance
      </Button>
    </div>
  );

  return (
    <Modal
      title={`Informations détaillées sur l'ouvrage ${props.ouvrage}`}
      visible={visible}
      destroyOnClose="true"
      onCancel={handleCancel}
      footer={[]}
      mask={false}
      width={500}
    >
      {props.Ouvr.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <React.Fragment>
          <p style={{ fontSize: "16px" }}>
            <b>Titre du planning :</b> {datasource[0]?.plan?.Titre_planning}
          </p>
          <p style={{ fontSize: "16px" }}>
            <b>Type du planning :</b> {datasource[0]?.plan.Type_planning}
          </p>

          <p style={{ fontSize: "16px" }}>
            <b>Date de procédure :</b> {datasource[0]?.dateProcedure}
          </p>

          <p style={{ fontSize: "16px" }}>
            <b>Equipe responsable :</b> {datasource[0]?.nom_equipe_programme}
          </p>

          <p style={{ fontSize: "16px" }}>
            <b>Ouvrage de départ :</b>
            {datasource[0]?.depart}
          </p>
          <p style={{ fontSize: "16px" }}>
            <b>Code d'ouvrage :</b> {props.ouvrage}
          </p>
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginRight: "30px" }}
          >
            Consulter le programme
          </Button>

          <Modal
            width={1200}
            title="Affichage du programme"
            visible={progvisible}
            onCancel={handleprogCancel}
            footer={[]}
          >
            <Table
              dataSource={program}
              columns={defaultColumns}
              tableLayout="fixed"
            />
          </Modal>

          <GisForm
            visibilite={formvisible}
            hidemodal={handleformCancel}
            isvisite={visite}
            isent={ent}
            ismaint={maint}
            list={form}
          />
          <Popover
            content={content}
            title="Les formulaires"
            trigger="hover"
            visible={form.length === 0 ? false : pop}
          >
            <Button
              type="primary"
              style={{ marginLeft: "30px" }}
              disabled={form.length === 0 ? true : false}
              onClick={() => {
                setpop(true);
              }}
            >
              Consulter les formulaires
            </Button>
          </Popover>
        </React.Fragment>
      )}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  Ouvr: state.planningReducer.Ouvr,
});
export default connect(mapStateToProps, {
  getDetOuvrage,
})(GisModal);
