import { Button } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Process } from "./api/api";
import MainTable from "./MainTable";

const Home = () => {
  //table data gaia sample
  const [list, setList] = useState();

  // table column 
  const columnData = [
    {
      accessor: "request.user_tag",
      Header: "Tag",
    },
    {
      accessor:"request.rsd_key",
      Header:"Rsd"
    },
    {
      accessor: "start_time",
      Header: "Start-Time",
    },
    {
      accessor: "end_time",
      Header: "End-Time",
    },
    {
      width:190,
      accessor: "name",
      Header: "",
      Cell: (props) => {
        return (
          <Link to={`document/${props.cell.row.original.id}`} style={{ textDecoration: "none"  ,minWidth:"100px"}}>
            <Button
              sx={{
                color: "black",
              }}
              variant="text"
            >
              상세보기{""}
            </Button>
          </Link>
        );
      },
    },
    {
      width:100,
      accessor:"id",
      Header:"",
      Cell:(props) =>{
        return (
          <Link to={`detail/${props.cell.row.original.id}`} style={{ textDecoration: "none"  ,minWidth:"100px"}}>
            <Button sx={{
              color:"black"
            }}
            variant="text"
            >
              
              데이터
            </Button>
          
          </Link>
        )

      }

    }
  ];
  const data = useMemo(() => list, [list]);

  const columns = useMemo(() => columnData, []);

  useEffect(() => {
    // gaia sample 목록가져오는 함수
    const getList = async () => {
      
      const { data } = await Process.getList();
      setList(data.list);
    };

    getList();
  }, []);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <div className="table-container">
        {typeof data !== "undefined" ? (
          <MainTable columns={columns} data={data} />
        ) : null}
      </div>
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button variant="outlined">create</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
