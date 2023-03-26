import moment from "moment";
import React, { useState } from "react";

function Modal(props) {
  const { modal, setModal, data } = props;
  return (
    <>
      {/* Overlay */}
      {modal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
          {/* Modal */}
          <div className="bg-white p-8 rounded shadow-lg z-20 text-gray-500">
            <div className="flex justify-between items-center border-b mb-3">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Employee Detail</h2>
              <button className="mb-4" onClick={() => setModal(false)}>
                X
              </button>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-800">{data.name}</h2>
              <p className="text-xs ">ID : {data.id}</p>
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex flex-col w-1/2">
                <p className="text-xs">Designation</p>
                <h2 className="text-sm text-black">{data.designation}</h2>
              </div>
              <div className="flex flex-col w-1/2">
                <p className="text-xs">ID : {data.id}</p>
                <h2 className="text-sm text-black">{data.name}</h2>
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-4">
              <div className="flex flex-col w-1/2">
                <p className="text-xs">Created At</p>
                <h2 className="text-sm text-black">
                  {moment(data.created_at).format("DD/MM/YYY")}
                </h2>
              </div>
              <div className="flex flex-col w-1/2">
                <p className="text-xs">Updated At</p>
                <h2 className="text-sm text-black">
                  {moment(data.updated_at).format("DD/MM/YYY")}
                </h2>
              </div>
            </div>
            <div className="mt-4">{data.address}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
