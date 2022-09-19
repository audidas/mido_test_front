import { IconButton } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";

import { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Process } from "./api/api";
import { SideMenu } from "./SideMenu";

function SideBar({ doc }) {
  // tree 구조
  const [process, setProcess] = useState();
  const navigate = useNavigate();

  //  gaia 폴더구조를 tree 구조로 분류해주는 함수
  const objectSpliter = (object, array) => {
    Object.keys(object).map((key) => {
      if (
        typeof object[key] === "object" &&
        Object.keys(object[key]).length !== 0
      ) {
        const num = array.push({
          name: key,
          children: [],
        });
        objectSpliter(object[key], array[num - 1].children);
      } else if (typeof object[key] === "string") {
        array.push({ name: key, root: object[key] });
      }
    });
  };

  useEffect(() => {
    // gaia 폴더 구조를 tree 구조로 반환해주는 함수
    const getTree = async () => {
      const { data } = await Process.getDetail(doc);

      const ar = [];
      console.log(data);

      objectSpliter(data.result, ar);

      setProcess(ar);
    };

    getTree();
  }, []);

  return (
    <ProSidebar style={{ fontSize: "5px" }}>
      <SidebarHeader>
        <IconButton
          aria-label="settings"
          style={{ borderColor: "white", color: "white" }}
          onClick={() => navigate("/")}
        >
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
      </SidebarHeader>
      <Menu>
        {process?.length > 0
          ? process?.map((p, index_one) => (
              <SubMenu title={p.name} defaultOpen={true}>
                {p.children.map((val, index_two) => (
                  <SideMenu value={val} />
                ))}
              </SubMenu>
            ))
          : null}
      </Menu>
    </ProSidebar>
  );
}

export default SideBar;
