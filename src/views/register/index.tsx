"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/Input/input";
import { Section } from "@/components/section";
import { Image } from "@/components/image";
import Link from "next/link";
import { string, object } from "yup";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterFormType } from "./type";
import OTPModal from "@/views/modals/otp-modal";
import { user } from "@/data/urls";
import { ROUTES } from "@/routes";

export default function Register() {
  const registerValidationSchema = object().shape({
    email: string().email("Please enter a valid e-mail.").required("This field is required."),
    username: string()
      .required("This field is required.")
      .min(6, "Username must contain at least 6 characters.")
      .max(30, "Username must contain max 30 characters."),
    password: string()
      .required("This field is required.")
      .min(8, "Password must contain min 8 characters.")
      .max(30, "Password must contain max 30 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\\.@$!%*?&])[A-Za-z\d\\.@$!%*?&]{8,30}$/,
        "Password must contain a capital letter and a spacial character."
      ),
    password_confirm: string()
      .required("This field is required.")
      .min(8, "Password must contain min 8 characters.")
      .max(30, "Password must contain max 30 characters.")
      .test("passwords-match", "Passwords are not matching.", function (value) {
        return this.parent.password === value;
      }),
    formType: string(),
  });

  const [body, setBody] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const onSubmit: SubmitHandler<RegisterFormType> = async data => {
    setBody({
      email: data.email,
      username: data.username,
      formType: "confirmRegistration",
    });

    const formData = JSON.stringify(data);

    setLoading(true);
    try {
      const res = await fetch(`/api/client${user.register}`, {
        method: "POST",
        body: formData,
      });
      setLoading(false);
      if (res.status === 200) {
        setOpenModal(true);
      } else {
        const result = await res.json();
        setError(true);
        setErrorText(result.error);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrorText("An unexpected error occurred. Please try again.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(registerValidationSchema) as Resolver<RegisterFormType, any>,
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password_confirm: "",
      formType: "register",
    },
  });

  return (
    <Section className="h-screen" appearance="full">
      <OTPModal open={openModal} body={body} setOpen={setOpenModal} isSignIn={true} />

      <div className="relative top-[15%] flex flex-col items-center mx-auto w-[320px] sm:w-[416px]">
        <Link href={ROUTES.HOME}>
          <Image
            src={"/assets/logo-banner.png"}
            alt="Company"
            height={52}
            width={350}
            aspectRatio={350 / 52}
          />
        </Link>
        <div className="text-4xl font-extrabold mt-12 mb-14">Register</div>
        <form
          id="register-form"
          className="flex flex-col gap-8 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <input type="hidden" value="register" {...register("formType")} />
            <Input label="Email" id="email" {...register("email")} error={errors.email} required />
            <Input
              label="Username"
              id="username"
              {...register("username")}
              error={errors.username}
              required
            />
            <Input
              label="Password"
              id="password"
              {...register("password")}
              type="password"
              error={errors.password}
              required
            />
            <Input
              label="Password Confirm"
              id="password_confirm"
              {...register("password_confirm")}
              error={errors.password_confirm}
              type="password"
              required
            />
            {error && <div className="text-error font-bold text-sm text-center">{errorText}</div>}
          </div>

          <Button
            type="submit"
            appearance="filled"
            size="xs"
            className="w-full text-base"
            isloading={isLoading}
          >
            Register
          </Button>
        </form>
        <div
          id="already-member"
          className="flex items-center justify-center mt-8 w-full text-primary dark:text-secondary font-extrabold gap-1"
        >
          <div>Already a member?</div>
          <Link
            href={ROUTES.LOGIN}
            className="text-primary dark:text-secondary font-extrabold hover:text-primary-600 dark:hover:text-primary-600 underline"
          >
            Log In.
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
}
