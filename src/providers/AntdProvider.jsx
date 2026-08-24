"use client";
import { ConfigProvider } from "antd";

export default function AntdProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#d97706",
          colorLink: "#d97706",
          colorLinkHover: "#b45309",
          borderRadius: 8,
          fontFamily: "inherit",
        },
        components: {
          Rate: { starColor: "#f59e0b" },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
