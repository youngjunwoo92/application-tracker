import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import { useRegsiterWithEmail } from '@/service/authService';
import { CredentialFormData } from '@/types/authTypes';
import { registerSchema } from '@/validation';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { cn } from '@/utilities/cn';

type Error = {
  type: string;
  message: string;
};

const defaultValues = {
  email: 'youngjunwoo92@gmail.com',
  password: 'Tkfkdgo#114',
};

const passwordValidations = [
  { type: 'length', message: 'Must be 8 to 16 characters' },
  { type: 'lowercase', message: 'At least 1 lowercase' },
  { type: 'uppercase', message: 'At least 1 uppercase' },
  { type: 'special', message: 'At least 1 special character' },
  { type: 'number', message: 'At least 1 number' },
];

export default function RegisterPage() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialFormData>({
    defaultValues,
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const { password } = watch();

  const [passwordErrors, setPasswordErrors] = useState<string>(
    errors?.password?.message ?? '',
  );

  const parsedError = passwordErrors
    ? (JSON.parse(passwordErrors) as Error[])
    : [];

  const { mutate, isPending } = useRegsiterWithEmail();

  const onSubmit: SubmitHandler<CredentialFormData> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (errors?.password?.message) {
      setPasswordErrors(errors.password.message);
    } else {
      setPasswordErrors('');
    }
  }, [errors?.password]);

  return (
    <div className="relative h-screen w-screen ">
      <div className="flex h-full w-full max-w-sm flex-col justify-center gap-4 p-4 sm:absolute sm:left-1/2 sm:top-32 sm:h-auto sm:-translate-x-[50%] sm:justify-normal">
        <h1 className="text-left text-4xl font-bold text-text-primary">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col gap-6"
        >
          <Input
            type="text"
            register={{ ...register('email') }}
            placeholder="Email"
            error={errors?.email}
            showErrorMessage
          />
          <Input
            type="password"
            register={{ ...register('password') }}
            placeholder="Password"
            error={errors?.password}
          />

          <div className="w-full">
            <p className="mb-2 text-text-primary">Password must contains</p>
            {passwordValidations.map((item) => (
              <div
                key={item.type}
                className={cn(
                  'flex items-center gap-2',
                  password.length > 0
                    ? parsedError.find((error) => error.type === item.type)
                      ? 'text-text-disabled'
                      : 'text-text-primary'
                    : 'text-text-disabled',
                )}
              >
                <span>
                  {password.length > 0 ? (
                    parsedError.find((error) => error.type === item.type) ? (
                      <AiOutlineCloseCircle />
                    ) : (
                      <AiOutlineCheckCircle className="text-success" />
                    )
                  ) : (
                    <AiOutlineCloseCircle />
                  )}
                </span>
                <p>{item.message}</p>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isPending}
            className="h-12 rounded-md font-semibold"
          >
            Sign Up
          </Button>
        </form>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-text-secondary">Already a member?</p>
          <span>
            <Link to="/login" className="text-primary">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
