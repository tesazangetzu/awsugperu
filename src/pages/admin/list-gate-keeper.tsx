import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import localStorageCustom from "../../utils/localStorageCustom";
import { Link } from "gatsby";
import { CogIcon, KeyIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import MiddlewareAdminRoute from "../../components/middlewares/MiddlewareAdminRoute";

interface IData {
  username: string;
  role: string;
  created_at: string;
}

const ListGateKeeper = () => {
  const [data, setData] = useState<IData[]>();
  const [count, setCount] = useState<number>(0);

  const getdata = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/users`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorageCustom("user")}`,
        },
      });
      const res = await response.json();

      if (res.status) {
        setData(res.data);
        setCount(res.data.length);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <Layout>
      <MiddlewareAdminRoute>
        <section>
          <div className="container">
            <div className="py-10">
              <h1 className="flex flex-wrap justify-between text-lg">
                Lista de usuarios
                {localStorageCustom("role") === "ADMIN" ? (
                  <Link to={"/admin/create-gate-keeper"} className="flex">
                    <PlusCircleIcon width={20} className="mr-1" />
                    Nuevo
                  </Link>
                ) : (
                  ""
                )}
              </h1>
              <div className="overflow-x-scroll md:overflow-x-hidden">
                <table className="table-auto border border-slate-500 w-full">
                  <caption className="caption-top text-xs text-left mb-2">
                    Mostrando {count} registro
                    {count > 1 || count === 0 ? `s` : ``}
                  </caption>
                  <thead className="bg-slate-50">
                    <tr className="[&>th]:border [&>th]:border-slate-600">
                      <th className="w-5">N</th>
                      <th>Nombre de usuario </th>
                      <th>Rol</th>
                      <th>Fecha</th>
                      {localStorageCustom("role") === "ADMIN" ? (
                        <th className="w-20">Acciones</th>
                      ) : (
                        ""
                      )}
                    </tr>
                  </thead>
                  {data ? (
                    <tbody className="[&>tr>td]:border [&>tr>td]:border-slate-700 text-center">
                      {data.map((item, key) => (
                        <tr key={key} className="[&>td]:p-2">
                          <td className="w-5">{key + 1}</td>
                          <td>{item.username}</td>
                          <td>
                            <KeyIcon width={18} className="m-auto" />
                          </td>
                          <td>{item.created_at}</td>
                          {localStorageCustom("role") === "ADMIN" ? (
                            <td>
                              <div className="flex justify-center items-center">
                                <Link
                                  to={`/admin/gate-keeper/${item.username}`}
                                >
                                  <CogIcon width={20} />
                                </Link>
                              </div>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <p className="text-xs">Cargando...</p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </section>
      </MiddlewareAdminRoute>
    </Layout>
  );
};

export default ListGateKeeper;

export { Head } from "./login";
