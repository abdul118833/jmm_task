import moment from "moment/moment";
import React, { useState } from "react";
import { Circles } from "react-loader-spinner";
import Modal from "./Modal";

const Table = (props) => {
  const { data, loading } = props;
  const [modal, setModal] = useState(false);
  const [employee, setEmployee] = useState({});
  const TableHeadClass = "border px-4 py-2 text-left";

  //   Setting the Modal Values from Here
  const setUserHandler = (data) => {
    setEmployee({ ...data });
    setModal(true);
  };
  return (
    <div className="w-full h-full">
      {/* Modal for Showing specific Employ Data */}
      {modal && (
        <Modal
          modal={modal}
          setModal={setModal}
          data={employee ? employee : {}}
        />
      )}

      {/* Main Table */}
      <table className="w-full h-full">
        {/* Table Head where in provided the Column name e.g Name,Contanct etc */}
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className={TableHeadClass}>#</th>
            <th className={TableHeadClass}>Name</th>
            <th className={TableHeadClass}>Designation</th>
            <th className={TableHeadClass}>Address</th>
            <th className={TableHeadClass}>Contact</th>
            <th className={TableHeadClass}>Created at</th>
            <th className={TableHeadClass}>Updated at</th>
          </tr>
        </thead>
        {/* Here i am showing Loading text while data is fetching fro server and when there is not data so i am showing "No Data to Show" */}
        <tbody>
          {loading
            ? "Loading...."
            : data?.length > 0
            ? data?.map((d, index) => {
                return (
                  <tr
                    className="text-xs text-gray-500 hover:bg-gray-200 cursor-pointer"
                    key={index + 1}
                    onClick={() => setUserHandler(d)}
                  >
                    <td className={TableHeadClass}>{index + 1}</td>
                    <td className="border px-4 py-2 text-blue-500 underline">
                      {d.name}
                    </td>
                    <td className={TableHeadClass}>{d.designation}</td>
                    <td className={TableHeadClass}>{d.address}</td>
                    <td className={TableHeadClass}>{d.contact}</td>
                    <td className={TableHeadClass}>
                      {moment(d.created_at).format("DD/MM/YYYY")}
                    </td>
                    <td className={TableHeadClass}>
                      {moment(d.updated_at).format("DD/MM/YYYY")}
                    </td>
                  </tr>
                );
              })
            : "No Data to Show"}
          {/* More data rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
