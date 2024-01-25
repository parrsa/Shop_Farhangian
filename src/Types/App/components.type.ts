import React from "react";

export interface LayoutsInterface {
 children?: React.ReactNode
}

export interface SidebarContext{
 sidebarToggle: any;
 toggleSidebar: () => void;
 closeSidebar: () => void;
}
export interface ComponentsInterface{
 ref ?: any
}