import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/errorPage";
import HomePage from "./pages/homePage";
import Favourites from "./pages/favouritesPage";
import InfoPage from "./pages/infoPage";
import InfiniteScroll from "./pages/infiniteScrollPage";
import App from "./App";

const client=new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "favourites",
        element: <Favourites />,
      },
      {
        path: "infinitescroll",
        element: <InfiniteScroll />,
      },
      {
        path: "infopage",
        element: <InfoPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);


const root=createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </StrictMode>
)