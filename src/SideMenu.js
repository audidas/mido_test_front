import React from "react";
import { MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const SideMenu = ({ value }) => {
  const hasRoot = value.root && !value.children;

  return (
    <>
      {hasRoot ? (
        <MenuItem>
          {value.name}
          <Link to={`${value.name}`} state={value.root}></Link>
        </MenuItem>
      ) : (
        <SubMenu title={value.name}>
          {value?.children?.map((child) => {
            return <SideMenu value={child} />;
          })}
        </SubMenu>
      )}
    </>
  );
};
