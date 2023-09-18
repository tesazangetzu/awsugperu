import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { Button } from "../../../components/Button";
import localStorageCustom from "../../../utils/localStorageCustom";
import { Select, initTE } from "tw-elements";

interface IParams {
  username: string;
}

interface IFeatures {
  id: string;
  name: string;
  type: string;
}

interface IOptions {
  id: string;
  name: string;
}

const ConfigUser = ({ params }: { params: IParams }) => {
  const [data, setData] = useState<IOptions[]>([]);
  const [features, setFeatures] = useState<IFeatures[]>();
  const [userFeatures, setUserFeatures] = useState<IFeatures[]>();

  const getFeatures = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}/me/features`, {
        headers: { Authorization: `Bearer ${localStorageCustom("user")}` },
      });
      const res = await response.json();
      if (res.status) setFeatures(res.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const getUserFeatures = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/users/${params.username}/features`,
        { headers: { Authorization: `Bearer ${localStorageCustom("user")}` } }
      );
      const res = await response.json();
      if (res.status) {
        setUserFeatures(res.data);
        setData(
          res.data?.map((item: IOptions) => {
            return { id: item.id, name: item.name };
          })
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    getFeatures();
    getUserFeatures();
  }, []);

  useEffect(() => {
    initTE({ Select });
    if (userFeatures !== undefined && userFeatures?.length > 0) {
      const multiSelect = document.querySelector("#multiSelection");
      const multiSelectInstance = Select.getInstance(multiSelect);
      multiSelectInstance?.setValue(userFeatures?.map((i: IOptions) => i.id));
    }
  }, [userFeatures]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => ({ id: option.value, name: option.text })
    );

    setData(selectedOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = data.map((i) => i.id);

    const updateFeatures = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/users/${params.username}/features`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorageCustom("user")}`,
            },
            body: JSON.stringify({ features }),
          }
        );
        const res = await response.json();
        if (res.status) console.log(res);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    updateFeatures();
  };

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-10">
            <h1 className="text-center mb-6 text-lg">
              Configuración de usuario
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap mb-6 justify-center md:w-3/5 md:mx-auto md:justify-between">
                <select
                  id="multiSelection"
                  multiple
                  data-te-select-init
                  data-te-select-placeholder="Zonas de evento"
                  onChange={onChangeHandler}
                  className="w-2/5 border"
                >
                  {features?.map((item, key) => (
                    <option className="p-2 border" value={item.id} key={key}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <ul className="w-full md:w-2/5 border mt-8 md:mt-0">
                  {data.map((item, key) => (
                    <li className="p-2 border bg-lime-100" key={key}>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center items-center">
                <Button text="Actualizar" />
                <Button
                  text="Cancelar"
                  to={"/admin/list-user"}
                  level="second"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ConfigUser;

export { Head } from "../login";
