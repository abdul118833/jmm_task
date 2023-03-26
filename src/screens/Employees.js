import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import {
  EMPLOYEE_DATA_SUCCESS,
  getEmployees,
} from "../redux/actions/employees";

const Employees = (props) => {
  const {
    getEmployeesReducer,
    employeeDataFromRedux,
    employeeLoadingFromRedux,
    totalemployeeFromRedux,
  } = props;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState(false);
  const [page, setPage] = useState(1);
  const last_page = localStorage.getItem("last_page")
    ? localStorage.getItem("last_page")
    : 0;

  // Pagination Logic Handler

  const handlePage = (data) => {
    console.log(data.selected + 1);
    getEmployeesReducer(data.selected + 1, searchTerm);
  };

  //   When someone click on Search Button if the data exists it show the Data otherwise show "No data to Show"

  const handleSearch = () => {
    getEmployeesReducer(page, searchTerm).then((res) => {
      if (res.type === EMPLOYEE_DATA_SUCCESS) {
        setSearch(true);
      }
    });
  };

  //   Searching Employee Functionallity Handled Here when someone write name here then he/she needs to remove the Filter
  const searchNameHandler = () => {
    setSearchTerm("");
    getEmployeesReducer(page, "").then((res) => {
      if (res.type === EMPLOYEE_DATA_SUCCESS) {
        setSearch(false);
      }
    });
  };
  useEffect(() => {
    getEmployeesReducer(page, searchTerm);
  }, []);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="w-full flex justify-center"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {/* Logout Button */}

        <div className="my-2 fixed top-0 right-8">
          <button
            className="bg-blue-500 py-2 px-6 text-white rounded text-center"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>

        {/* Main Content of Table */}

        <div className="w-11/12 h-full flex flex-col justify-between Shadow_box p-4">
          {/* Table Search Section */}

          <div className="flex flex-col-reverse md:flex-row md:justify-between h-1/12">
            <h1 className="text-3xl">
              Total :{" "}
              {employeeLoadingFromRedux ? (
                <span className="text-sm">loading...</span>
              ) : totalemployeeFromRedux ? (
                totalemployeeFromRedux
              ) : (
                0
              )}
            </h1>
            <div className="flex py-2 w-full md:w-1/2">
              {searchTerm !== "" || search ? (
                <span
                  className="text-xs text-ellipsis cursor-pointer"
                  onClick={searchNameHandler}
                >
                  Remove Filter
                </span>
              ) : null}
              <input
                type="text"
                className="border border-gray-400 py-2 px-4 rounded mr-3 w-10/12"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />

              <button
                type="button"
                className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-8 rounded"
                onClick={() => {
                  if (searchTerm !== "") {
                    handleSearch();
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Main Table Section  */}

          <div
            className="h-10/12 flex w-full items-start overflow-y-scroll"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <Table
              data={employeeDataFromRedux ? employeeDataFromRedux : []}
              loading={employeeLoadingFromRedux}
            />
          </div>

          {/* Pagintaion Section */}

          <div className="w-full h-1/12 flex justify-end mt-3">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={last_page}
              onPageChange={handlePage}
              containerClassName="flex items-center"
              pageLinkClassName="p-2 border text-xs w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              previousLinkClassName="p-2 border text-xs w-10 h-10 flex rounded-l items-center justify-center hover:bg-gray-100"
              nextLinkClassName="p-2 border text-xs w-10 h-10 flex rounded-r items-center justify-center hover:bg-gray-100"
              breakLinkClassName="p-2 border text-xs w-10 h-10 flex items-center justify-center hover:bg-gray-100"
              activeLinkClassName="p-2 border text-xs w-10 h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-500 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// From Here I am Dispatchinng Actions

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployeesReducer: (data, searchTerm) =>
      dispatch(getEmployees(data, searchTerm)),
  };
};

// Getting the Values for Store here We can useSelecter here but I prefer this way to that way i useds this strategy

const mapStateToProps = (state) => {
  return {
    employeeDataFromRedux: state.employeeReduces.employees?.data?.employees,
    totalemployeeFromRedux: state.employeeReduces.employees?.data?.total,
    employeeLoadingFromRedux: state.employeeReduces.employees.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
