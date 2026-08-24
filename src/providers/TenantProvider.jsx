"use client";
import { createContext, useContext } from "react";
import { DEFAULT_TENANT } from "@/config/tenants";

export const TenantContext = createContext(DEFAULT_TENANT);

export function TenantProvider({ config, children }) {
  return (
    <TenantContext.Provider value={config}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}
