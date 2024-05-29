"use client";

import { Button } from "@/components/button";
import { Image } from "@/components/image";
import { Input } from "@/components/Input/input";
import { Section } from "@/components/section";
import Link from "next/link";
import { string, object } from "yup";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormType } from "./type";
import { useState } from "react";
import { SignInOptions, signIn } from "next-auth/react";
import { user } from "@/data/urls";
import { ROUTES } from "@/routes";

const Login = () => {
  const [isloading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const loginValidationSchema = object().shape({
    email: string().email("Please enter a valid e-mail.").required("This field is required."),
    password: string().required("This field is required."),
    formType: string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: yupResolver(loginValidationSchema) as Resolver<LoginFormType, any>,
  });

  const onSubmit: SubmitHandler<LoginFormType> = async data => {
    const formData = JSON.stringify(data);

    setLoading(true);

    await fetch(`/api/client${user.login}`, {
      method: "POST",
      body: formData,
    }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        signIn("default", { ...data } as SignInOptions);
      } else {
        res.json().then(data => {
          setError(true);
          setErrorText(data.error);
        });
      }
    });
  };

  return (
    <Section className="h-screen" appearance="full">
      <div className="relative top-[15%] flex flex-col items-center mx-auto w-[320px] sm:w-[416px]">
        <Link href={ROUTES.HOME} className="flex gap-2 items-center">
          <Image
            src={"/assets/company-logo-minimized.png"}
            alt="WoWTasker"
            width={65}
            height={65}
            aspectRatio={1}
            className="!justify-start"
          ></Image>
          <div>
            <h1 className="text-2xl font-bold">WoW Tasker</h1>
            <h3 className="text-xs leading-3">A better experience!</h3>
          </div>
        </Link>
        <div className=" text-4xl font-extrabold mt-12 mb-14">Log In</div>
        <form
          method="post"
          id="login-form"
          className="flex flex-col gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <Input label="Email or Phone" id="email" {...register("email")} />
            <Input label="Password" id="password" type="password" {...register("password")} />
            <input id="formType" type="hidden" value="login" {...register("formType")} />
            {error && <div className="text-error font-bold text-sm text-center">{errorText}</div>}
          </div>
          <Button
            type="submit"
            appearance="filled"
            size="xs"
            className="w-full text-base"
            isloading={isloading}
          >
            Log In
          </Button>
        </form>
        <div
          id="already-member"
          className="flex items-center justify-center mt-8 w-full text-primary dark:text-secondary font-extrabold gap-1"
        >
          <div>Not a member yet?</div>
          <Link
            href={ROUTES.REGISTER}
            className="text-primary dark:text-secondary font-extrabold hover:text-primary-600 dark:hover:text-primary-600 underline"
          >
            Register.
          </Link>
        </div>
        {/* <div id="help" className="flex items-center justify-center mt-1 w-full">
          <Link
            href={'/'}
            target="_blank"
            className="text-sm text-primary dark:text-secondary font-bold hover:text-primary-600 dark:hover:text-primary-600"
          >
            Forgot your password?
          </Link>
        </div> */}
      </div>
    </Section>
  );
};

export default Login;
