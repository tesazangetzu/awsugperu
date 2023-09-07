import * as React from "react";
import * as Yup from "yup";
import { navigate, type PageProps } from "gatsby";
import { useState } from "react";
import { Layout } from "../../components/Layout";
import { ExclamationTriangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Loader } from "../../components/Loader";

interface ILogin {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

const Login: React.FC<PageProps> = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: ILogin) => {
    setLoader(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });
        const res = await response.json();
        if (!res.status) {
          setLoader(false);
          setError(res.message);
        } else {
          localStorage.setItem("user", res.data);
          localStorage.setItem("role", "gate_keeper");
          navigate("/admin/scan");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  };

  const renderErrorMessage = (message: string) => (
    <p className="ff-cg--semibold text-red-500 text-[14px] mt-2 flex items-center">
      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
      {message}
    </p>
  );

  return (
    <Layout>
      <section>
        <div className="container">
          {loader ? (
            <Loader open={loader} className="pt-20" />
          ) : (
            <div className="sm:w-4/5 md:w-96 m-auto text-center pt-10">
              <h2 className="mb-4">Admin re:wards</h2>
              <div className="flex justify-center items-center mb-4">
                <UserIcon width={150} />
              </div>

              <div className="mb-4">
                <Formik
                  initialValues={{ username: "", password: "" }}
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
                          placeholder="Username"
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
                          type="password"
                          onChange={handleChange}
                          placeholder="*******"
                        />
                        <ErrorMessage
                          name="password"
                          render={(msg: string) => renderErrorMessage(msg)}
                        />
                        {error !== null ? renderErrorMessage(error) : ""}
                      </div>
                      <button className="flex justify-center p-3 m-2 border rounded-md w-36 mx-auto hover:bg-black hover:text-white text-center">
                        Login
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Login;

export const Head = () => <title>AWS UG Peru Admin</title>;
