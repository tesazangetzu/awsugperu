import * as React from "react";
import * as Yup from "yup";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { renderErrorMessage } from "../../utils/renderErrorMessage";
import { navigate } from "gatsby";
import localStorageCustom from "../../utils/localStorageCustom";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";

interface ILogin {
  username: string;
  password: string;
  role: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Usuario es requerido"),
  password: Yup.string().required("Contraseña es querida"),
});

const CreateUser = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: ILogin) => {
    setLoader(true);

    const fetchData = async () => {
      values.role = "GATE_KEEPER";
      try {
        const response = await fetch(`${process.env.API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorageCustom("user")}`,
          },
          body: JSON.stringify(values),
        });
        const res = await response.json();
        if (!res.status) {
          setLoader(false);
          setError(res.message);
        } else {
          navigate("/admin/list-user");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  };

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-16 sm:w-full md:w-3/4 lg:w-2/4 m-auto                            ">
            {loader ? (
              <Loader open={loader} />
            ) : (
              <>
                <h1 className="text-center mb-6 text-lg">Nuevo usuario</h1>
                <Formik
                  initialValues={{ username: "", password: "", role: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    touched,
                    errors,
                    values,
                    handleSubmit,
                    handleChange,
                  }) => (
                    <Form className="px-4">
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <label
                            className="text-sm ff-cg--semibold"
                            htmlFor="username"
                          >
                            Username:
                          </label>
                        </div>
                        <Field
                          className={`w-full bg-gray-100 placeholder:text-[#000000] p-[10px] focus:outline-none rounded-xl mt-2 ${
                            errors.username ? "border border-red-500" : ""
                          }`}
                          id="username"
                          name="username"
                          type="text"
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="username"
                          render={(msg: string) => renderErrorMessage(msg)}
                        />
                      </div>
                      <div className="mb-6">
                        <div className="flex items-center justify-between">
                          <label
                            className="text-sm ff-cg--semibold"
                            htmlFor="password"
                          >
                            Password:
                          </label>
                        </div>
                        <Field
                          className={`w-full bg-gray-100 placeholder:text-[#000000] p-[10px] focus:outline-none rounded-xl mt-2 ${
                            errors.password ? "border border-red-500" : ""
                          }`}
                          id="password"
                          name="password"
                          type="text"
                          onChange={handleChange}
                        />
                        <ErrorMessage
                          name="password"
                          render={(msg: string) => renderErrorMessage(msg)}
                        />
                        {error !== null ? renderErrorMessage(error) : ""}
                      </div>
                      <div className="flex justify-between">
                        <Button text="Crear" />
                        <Button text="Cancelar" to={"/admin/list-user"} />
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateUser;

export { Head } from "./login";
