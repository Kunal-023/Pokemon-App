import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Favourites from "./Pages/Favourites";
import InfoPage from "./Pages/InfoPage";

const client=new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element : <HomePage/>,
    errorElement: <ErrorPage/>
  },
  {
    path:"/favourites",
    element : <Favourites/>,
    errorElement: <ErrorPage/>
  },
  {
    path:'/pokemoninfo',
    element : <InfoPage/>,
    errorElement : <ErrorPage/>
  },
  {
    path:'/*',
    element : <ErrorPage/>
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