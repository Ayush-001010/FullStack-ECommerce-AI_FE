import React, { useMemo } from "react";
import type IAuthForm from "./IAuthForm";
import { Button, Input, message } from "antd";
import { Formik, type FormikProps } from "formik";
import * as yup from "yup";
import {
  GithubOutlined,
  GoogleOutlined,
  LinkedinOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";

const AuthForm: React.FC<IAuthForm> = ({ type }) => {
  const [messageAPI , contextHandler] = message.useMessage();
  const { initialValues, validationSchema } = useMemo(() => {
    let initialValues: Record<string, string> = {};
    let validationSchema: Record<string, any> = {
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    };

    initialValues = { email: "", password: "" };
    if (type === "signUp") {
      validationSchema = {
        ...validationSchema,
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), undefined], "Passwords must match")
          .required("Confirm password is required"),
      };
      initialValues = {
        ...initialValues,
        firstName: "",
        lastName: "",
        confirmPassword: "",
      };
    }
    return { initialValues, validationSchema };
  }, [type]);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    backendName: string,
    formik: FormikProps<Record<string, string>>
  ) => {
    formik.setFieldValue(backendName, e.target.value);
    formik.setFieldTouched(backendName, true);
  };
  const blurHandler = (
    backendName: string,
    formik: FormikProps<Record<string, string>>
  ) => {
    formik.setFieldTouched(backendName, true);
  };
  const serviceUnavailableHandler = () => {
    messageAPI.destroy();
    messageAPI.error("This service is currently unavailable. Please try again later.");
  }

  return (
    <div className="m-5 rounded-2xl bg-white/80 p-6 shadow-[0_12px_30px_rgba(1,42,74,0.10)] ring-1 ring-gray-200 backdrop-blur-sm flex flex-col">
      {contextHandler}
      <div className="space-y-3">
        <div className="flex justify-center items-center gap-3">
          <p className="text-sm font-semibold tracking-wide text-[#012a4a]">
            {type === "signUp" ? "Register With" : "Login With"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="w-full">
            <Button className="w-full !rounded-xl !border-gray-200 !bg-white !text-[#012a4a] !shadow-sm hover:!bg-[#012a4a] hover:!border-[#2c7da0]/40 hover:!text-[#fff]" onClick={serviceUnavailableHandler}>
              <span className="flex items-center justify-center gap-2">
                <GoogleOutlined className="text-lg text-[#2c7da0]" />
                <p className="font-medium">Google</p>
              </span>
            </Button>
          </div>

          <div className="w-full">
            <Button className="w-full !rounded-xl !border-gray-200 !bg-white !text-[#012a4a] !shadow-sm hover:!bg-[#012a4a] hover:!border-[#2c7da0]/40 hover:!text-[#fff]" onClick={serviceUnavailableHandler}>
              <span className="flex items-center justify-center gap-2">
                <GithubOutlined className="text-lg text-[#012a4a]" />
                Github
              </span>
            </Button>
          </div>

          <div className="w-full">
            <Button className="w-full !rounded-xl !border-gray-200 !bg-white !text-[#012a4a] !shadow-sm hover:!bg-[#012a4a] hover:!border-[#2c7da0]/40 hover:!text-[#fff]" onClick={serviceUnavailableHandler}>
              <span className="flex items-center justify-center gap-2">
                <LinkedinOutlined className="text-lg text-[#2c7da0]" />
                Linked In
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
          Or
        </p>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="space-y-5 flex-1 flex flex-col">
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={yup.object(validationSchema)}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="space-y-4 flex-1 flex flex-col"
            >
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                {type === "signUp" && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#012a4a]/80">
                        First Name
                      </label>
                      <Input
                        prefix={<UserOutlined className="text-[#2c7da0]/80" />}
                        className="!rounded-lg h-10 !border-gray-200 !bg-white/90 !shadow-sm focus:!border-[#2c7da0]/60 focus:!ring-2 focus:!ring-[#2c7da0]/15"
                        name="firstName"
                        onChange={(e) => changeHandler(e, "firstName", formik)}
                        onBlur={() => blurHandler("firstName", formik)}
                      />
                      {formik.errors.firstName && formik.touched.firstName && (
                        <p className="text-xs font-medium text-red-500">
                          {formik.errors.firstName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#012a4a]/80">
                        Last Name
                      </label>
                      <Input
                        prefix={<UserOutlined className="text-[#2c7da0]/80" />}
                        className="!rounded-lg h-10 !border-gray-200 !bg-white/90 !shadow-sm focus:!border-[#2c7da0]/60 focus:!ring-2 focus:!ring-[#2c7da0]/15"
                        name="lastName"
                        onChange={(e) => changeHandler(e, "lastName", formik)}
                        onBlur={() => blurHandler("lastName", formik)}
                      />
                      {formik.errors.lastName && formik.touched.lastName && (
                        <p className="text-xs font-medium text-red-500">
                          {formik.errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#012a4a]/80">
                    Email
                  </label>
                  <Input
                    prefix={<MailOutlined className="text-[#2c7da0]/80" />}
                    className="!rounded-lg h-10 !border-gray-200 !bg-white/90 !shadow-sm focus:!border-[#2c7da0]/60 focus:!ring-2 focus:!ring-[#2c7da0]/15"
                    name="email"
                    onChange={(e) => changeHandler(e, "email", formik)}
                    onBlur={() => blurHandler("email", formik)}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-xs font-medium text-red-500">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#012a4a]/80">
                    Password
                  </label>
                  <Input.Password
                    prefix={<LockOutlined className="text-[#2c7da0]/80" />}
                    className="!rounded-lg h-10 !border-gray-200 !bg-white/90 !shadow-sm focus:!border-[#2c7da0]/60 focus:!ring-2 focus:!ring-[#2c7da0]/15"
                    name="password"
                    onChange={(e) => changeHandler(e, "password", formik)}
                    onBlur={() => blurHandler("password", formik)}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-xs font-medium text-red-500">
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {type === "signUp" && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#012a4a]/80">
                      Confirm Password
                    </label>
                    <Input.Password
                      prefix={<LockOutlined className="text-[#2c7da0]/80" />}
                      className="!rounded-lg h-10 !border-gray-200 !bg-white/90 !shadow-sm focus:!border-[#2c7da0]/60 focus:!ring-2 focus:!ring-[#2c7da0]/15"
                      name="confirmPassword"
                      onChange={(e) =>
                        changeHandler(e, "confirmPassword", formik)
                      }
                      onBlur={() => blurHandler("confirmPassword", formik)}
                    />
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <p className="text-xs font-medium text-red-500">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    htmlType="submit"
                    className="w-full !rounded-lg !bg-[#012a4a] !text-white !shadow-md hover:!bg-[#003f88] focus:!ring-2 focus:!ring-[#2c7da0]/25"
                  >
                    {type === "signUp" ? "Sign Up" : "Sign In"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>

        <div className="pt-2">
          <p className="text-center text-sm text-[#012a4a]/70">
            {type === "signUp"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <span className="cursor-pointer font-semibold text-[#2c7da0] hover:text-[#003f88]">
              {type === "signUp" ? "Sign in" : "Sign up"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
