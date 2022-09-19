import React from "react";
import {  useNavigate } from "react-router-dom";
import { useTable } from "react-table";

const MainTable = ({ columns, data }) => {
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="table">
      <thead className="thead">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="trHead">
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}> {column.render("Header")} </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="tbody">
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className="trBody"
              
              
            >
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps({
                    style:{
                      width:cell.column.width
                  }
                  })} className="td">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MainTable;
