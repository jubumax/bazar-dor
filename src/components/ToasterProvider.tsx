"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2500,
        style: {
          fontSize: "13px",
          fontWeight: 500,
          color: "#334155",
          background: "#F0FDF4",
          border: "1px solid #DCFCE7",
        },
        error: {
          style: {
            fontSize: "13px",
            fontWeight: 500,
            color: "#7F1D1D",
            background: "#FEF2F2",
            border: "1px solid #FEE2E2",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
