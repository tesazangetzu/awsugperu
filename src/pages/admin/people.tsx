import * as React from "react";
import { Layout } from "../../components/Layout";
import { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";
import { SelectFeature } from "../../components/SelectFeatures";

interface IData {
  first_name: string;
  last_name: string;
  company: string;
}

interface IListFeature {
  id: string;
  name: string;
  type: string;
}

const headers = {
  Accept: "application/json",
  Authorization: `Bearer ${window.localStorage.getItem("user")}`,
};

const People = () => {
  const [data, setData] = useState<IData[]>();
  const [loader, setLoader] = useState(true);
  const [listFeature, setListFeature] = useState<IListFeature[]>();
  const [selected, setSelected] = useState<string>("-1");
  const [count, setCount] = useState<number>(0);

  const getdata = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/me/features/${selected}/people`,
        { headers }
      );

      const res = await response.json();

      if (res.status) {
        setData(res.data);
        setCount(res.meta.total);
        setLoader(false);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const getFeatures = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/me/features`, {
        headers,
      });
      const res = await response.json();
      if (res.status) {
        setLoader(false);
        setListFeature(res.data);
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getFeatures();
  }, []);

  useEffect(() => {
    if (selected !== "-1") getdata();
  }, [selected]);

  return (
    <Layout>
      <section className="py-6">
        <div className="container">
          {loader ? (
            <Loader open={loader} className="pt-20" />
          ) : (
            <>
              <h1 className="text-center mb-3">Personas</h1>
              <SelectFeature
                listFeature={listFeature}
                setSelected={setSelected}
              />
              <div className="w-full sm:overflow-x-scroll md:overflow-x-auto py-3">
                <table className="table-fixed lg;table-auto border border-slate-500 w-full">
                  <caption className="caption-top text-xs text-left mb-2">
                    Mostrando {count} registro
                    {count > 1 || count === 0 ? `s` : ``}
                  </caption>
                  <thead className="bg-slate-50">
                    <tr className="[&>th]:border [&>th]:border-slate-600">
                      <th className="w-5">N</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Empresa</th>
                    </tr>
                  </thead>
                  <tbody className="[&>tr>td]:border [&>tr>td]:border-slate-700 text-center">
                    {data?.map((item, key) => (
                      <tr key={key}>
                        <td className="w-5">{key + 1}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.company}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};
export default People;

export { Head } from "./login";
