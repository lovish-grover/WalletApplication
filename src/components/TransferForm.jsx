import axios from "../api/backendAPI";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TransferForm() {
  const [values, setValues] = useState({
    customerId: localStorage.getItem("custId"),
    accountNumber: 0,
    amount: 0,
    description: "",
    fromAccountNumber: 0,
  });
  const navigate = useNavigate();
  const handelSub = (event) => {
    event.preventDefault();
    console.log(values);
    axios.post("/transactions/transfer", values).then((res) => {
      console.log(res);
      if (res.data.message != null) {
        // localStorage.setItem('customerId', res.data.data.customerId);
        console.log(res.data);
        alert(res.data.message);
        navigate("/");
      } else {
        alert("error");
      }
    });
  };
  return (
    <>
      <p className="test-2xl mt-2 font-black font-mono text-center">Transfer from one account to another</p>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px] bg-white">
          <form onSubmit={handelSub}>
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Customer Id
              </label>
              <input
                type="number"
                name="customerId"
                id="customerId"
                placeholder="Customer Id"
                defaultValue={localStorage.getItem("custId")}
                disabled
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="AccType"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                fromAccNumber
              </label>
              <input
                type="Number"
                name="accountNumber"
                id="accountNumber"
                placeholder="Enter your account type"
                onChange={(e) =>
                  setValues({ ...values, fromAccountNumber: e.target.value })
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="openingBalance"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                placeholder="Enter your amount"
                onChange={(e) =>
                  setValues({ ...values, amount: e.target.value })
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter your desc"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="AccType"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                ToAccNumber
              </label>
              <input
                type="Number"
                name="accountNumber"
                id="accountNumber"
                placeholder="Enter your account type"
                onChange={(e) =>
                  setValues({ ...values, accountNumber: e.target.value })
                }
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Transfer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default TransferForm;
