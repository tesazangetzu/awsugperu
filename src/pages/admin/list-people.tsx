import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import localStorageCustom from "../../utils/localStorageCustom";
import { SearchSVG } from "../../components/Svgs";

interface IData {
  username: string;
  role: string;
  created_at: string;
}

const ListPeople = () => {
  const [data, setData] = useState<IData[]>();
  const [count, setCount] = useState<number>(0);
  const [params, setParams] = useState<string>("");

  const search = (value: string) => {
    if (value.length > 3) setParams(`username=${value}`);
  };

  const getdata = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/users${params !== "" ? "?" + params : ""}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorageCustom("user")}`,
          },
        }
      );
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
  }, [params]);

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-8">
            <h1 className="flex flex-wrap justify-between text-lg mb-3">
              Lista de personas
            </h1>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchSVG />
              </div>
              <input
                type="search"
                className="block w-1/4 p-3 pl-10 text-sm text-slate-700 border border-slate-700 rounded-lg bg-gray-50"
                placeholder="Search"
                onChange={(e) => search(e.target.value)}
              />
            </div>
            <div className="overflow-x-scroll md:overflow-x-hidden">
              <table className="table-auto border border-slate-500 w-full">
                <caption className="caption-top text-xs text-right mb-2">
                  Mostrando {count} registro
                  {count > 1 || count === 0 ? `s` : ``}
                </caption>
                <thead className="bg-slate-50">
                  <tr className="[&>th]:border [&>th]:border-slate-600">
                    <th className="w-5">N</th>
                    <th>Nombre de usuario </th> 
                    <th>Rol</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody className="[&>tr>td]:border [&>tr>td]:border-slate-700 text-center">
                  {data ? (
                    data?.map((item, key) => (
                      <tr key={key} className="[&>td]:p-2">
                        <td className="w-5">{key + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.role}</td>
                        <td>{item.created_at}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <p className="text-xs">Cargando...</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListPeople;

export { Head } from "./login";
