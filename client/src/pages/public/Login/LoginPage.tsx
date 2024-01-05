import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import { useLoginWithEmail } from '@/service/authService';
import { CredentialFormData } from '@/types/authTypes';
import { loginSchema } from '@/validation';

const defaultValues = {
  email: 'youngjunwoo92@gmail.com',
  password: 'Tkfkdgo#114',
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialFormData>({
    defaultValues,
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { mutate, isPending } = useLoginWithEmail();

  const onSubmit: SubmitHandler<CredentialFormData> = (data) => {
    mutate(data);
  };

  return (
    <div className="relative h-screen w-screen ">
      <div className="flex h-full w-full max-w-sm flex-col justify-center gap-4 p-4 sm:absolute sm:left-1/2 sm:top-32 sm:h-auto sm:-translate-x-[50%] sm:justify-normal">
        <h1 className="text-5xl font-bold text-text-primary">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col gap-6"
        >
          <Input
            type="text"
            name="email"
            register={{ ...register('email') }}
            placeholder="Email"
            error={errors?.email}
            showErrorMessage
          />
          <Input
            type="password"
            name="password"
            register={{ ...register('password') }}
            placeholder="Password"
            error={errors?.password}
            showErrorMessage
          />
          <Button
            type="submit"
            fullWidth
            loading={isPending}
            className="h-12 rounded-md font-semibold"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-text-secondary">Don't have an account?</p>
          <span>
            <Link to="/register" className="text-primary">
              Sign up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
