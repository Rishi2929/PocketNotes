
import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import GroupList from "./pages/groupList/GroupList";
import DefaultBody from "./pages/noteBody/DefaultBody";
import NoteBody from "./pages/noteBody/NoteBody";
import GroupListContextProvider from "./context/groupList/GroupListContextProvider";

const LayoutDesktop = () => {
  return (
    <div className="flex">
      <GroupList />
      <Outlet />
    </div>
  )
}

const appRouterDesktop = createBrowserRouter([
  {
    path: "/",
    element: <LayoutDesktop />,
    children: [
      {
        path: "/",
        element: <DefaultBody />
      },
      {
        path: "/:id",
        element: <NoteBody />
      }
    ]

  }
])

const appRouterMobile = createBrowserRouter([
  {
    path: "/",
    element: <GroupList />,
  },
  {
    path: "/:id",
    element: <NoteBody />
  }
])

const App = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth)
  })

  let routerProvider = <RouterProvider router={appRouterMobile} />

  if(screenWidth >= 640) {
    routerProvider = <RouterProvider router={appRouterDesktop} />
  }

  return (
    <GroupListContextProvider>
      {routerProvider}
      {/* <h1 className="text-slate-500">sdf</h1> */}
    </GroupListContextProvider>
  )
}

export default App;
