import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { PessoasFisicas } from "./pages/PessoasFisicas";

import Root from "./Root";
import { PessoasJuridicas } from "./pages/PessoasJuridicas";
import { PessoasFisicasEditar } from "./pages/PessoasFisicas/components/PessoasFisicasEditar";
import { PessoasJuridicasEditar } from "./pages/PessoasJuridicas/components/PessoasJuridicasEditar";

import "primereact/resources/themes/mdc-dark-indigo/theme.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/pessoas-fisicas",
                element: <PessoasFisicas />
            },
            {
                path: "/pessoas-fisicas/:id",
                element: <PessoasFisicasEditar />
            },
            {
                path: "/pessoas-juridicas",
                element: <PessoasJuridicas />
            },
            {
                path: "/pessoas-juridicas/:id",
                element: <PessoasJuridicasEditar />
            }
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
        <RouterProvider router={router}/>
    // </StrictMode>
)
