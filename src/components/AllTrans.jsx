import axios from "../api/backendAPI";
import React from "react";

function AllTrans() {
  useEffect(() => {
    axios
      .post(`/account/accByCustId/${localStorage.getItem("custId")}`)
      .then((res) => {
        console.log(res.data.accounts);
        // setData(...res.data.accounts);
      });
  }, []);

  return <></>;
}
export default AllTrans;
