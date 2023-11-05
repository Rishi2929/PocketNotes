
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./index.css";
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

const App2 = () => {

  return (
    <GroupListContextProvider>
      <div className="mobile">
        <RouterProvider router={appRouterMobile} />
      </div>
      <div className="desktop">
        <RouterProvider router={appRouterDesktop} />
      </div>
    </GroupListContextProvider>
  )
}

export default App2;