import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import localStorageCustom from "../../utils/localStorageCustom";
import { Link } from "gatsby";
import {
  CogIcon,
  KeyIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import MiddlewareAdminRoute from "../../components/middlewares/MiddlewareAdminRoute";
import ModalDeleteUser from "../../components/modals/ModalDeleteUser";
import ModalUpdateUser from "../../components/modals/ModalUpdateUser";

interface IData {
  username: string;
  role: string;
  created_at: string;
}

const ListGateKeeper = () => {
  const [data, setData] = useState<IData[]>();
  const [count, setCount] = useState<number>(0);
  const [usernameDelete, setUsernameDelete] = useState<string>("");
  const [usernameUpdate, setUsernameUpdate] = useState<string>("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);

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
  }, [isModalDeleteOpen]);

  return (
    <Layout>
      <MiddlewareAdminRoute>
        <section>
          <div className="container">
            <div className="py-10">
              <h1 className="flex flex-wrap justify-between text-lg">
                Lista de usuarios
                {localStorageCustom("role") === "ADMIN" ? (
                  <Link to={"/admin/gate-keeper/create"} className="flex">
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
                              <div className="flex justify-around items-center min-w-[110px]">
                                <Link
                                  to={`/admin/gate-keeper/${item.username}`}
                                >
                                  <CogIcon width={20} />
                                </Link>
                                <button
                                  className="border-none"
                                  onClick={() => {
                                    setIsModalUpdateOpen(!isModalUpdateOpen),
                                      setUsernameUpdate(item.username);
                                  }}
                                >
                                  <PencilIcon
                                    width={20}
                                    className="text-blue-500"
                                  />
                                </button>
                                <button
                                  className="border-none"
                                  onClick={() => {
                                    setIsModalDeleteOpen(!isModalDeleteOpen),
                                      setUsernameDelete(item.username);
                                  }}
                                >
                                  <TrashIcon
                                    width={20}
                                    className="text-red-500"
                                  />
                                </button>
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
          <ModalDeleteUser
            isOpen={isModalDeleteOpen}
            onClose={() => setIsModalDeleteOpen(!isModalDeleteOpen)}
            username={usernameDelete}
          />
          <ModalUpdateUser
            isOpen={isModalUpdateOpen}
            onClose={() => setIsModalUpdateOpen(!isModalUpdateOpen)}
            username={usernameUpdate}
          />
        </section>
      </MiddlewareAdminRoute>
    </Layout>
  );
};

export default ListGateKeeper;

export { Head } from "./login";
