import axios from "axios";
export const EMPLOYEE_DATA_LOADING = "EMPLOYEE_DATA_LOADING";
export const EMPLOYEE_DATA_SUCCESS = "EMPLOYEE_DATA_SUCCESS";
export const EMPLOYEE_DATA_FAILED = "EMPLOYEE_DATA_FAILED";

const token =
  localStorage.getItem("jmm_token") && localStorage.getItem("jmm_token");
console.log(token);
export const getEmployees = (data, search) => {
  return (dispatch) => {
    dispatch({ type: EMPLOYEE_DATA_LOADING, data: true });
    return axios
      .get(
        `${process.env.REACT_APP_SERVER_PATH}/employees?page=${data}${
          search !== "" ? `&search=${search}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({ type: EMPLOYEE_DATA_LOADING, data: false });
        localStorage.setItem("last_page", res.data.employees.last_page);
        return dispatch({
          type: EMPLOYEE_DATA_SUCCESS,
          data: {
            employees: res.data.employees.data,
            total: res.data.employees.total,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: EMPLOYEE_DATA_LOADING, data: false });
        return dispatch({ type: EMPLOYEE_DATA_FAILED, data: true });
      });
  };
};
