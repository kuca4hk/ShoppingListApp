import React from "react";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


export const routing = [
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "*",
        element: <NotFound />,
    }
]
