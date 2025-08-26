import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import StepBottomContent from '@/components/auths/StepBottomContent';
import StepTopContent from '@/components/auths/StepTopContent';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            topContent={
                <StepTopContent title="Welcome!" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" />
            }
            bottomContent={<StepBottomContent />}
        >
            {/* <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <TextLink href={'http://127.0.0.1:8080/brn-form'} tabIndex={5}>
                        Join Membership
                    </TextLink>
                </div>
            </form> */}

            <div className="flex w-full justify-center p-8 md:w-5/6 lg:w-3/4">
                <div>
                    <div className="mb-10">
                        <h2 className="mb-1 text-3xl font-extrabold text-primary">Your Next Connection Awaits You!</h2>
                        <p className="max-w-sm pr-5 text-[17px] font-normal text-primary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </p>
                    </div>

                    <div className="max-w-sm">
                        <form onSubmit={submit} className="space-y-7">
                            <div className="relative w-full">
                                <label htmlFor="fullName" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-800">
                                    Email
                                </label>
                                <input
                                    id="fullName"
                                    type="email"
                                    // value={fullName}
                                    // onChange={(e) => setFullName(e.target.value)}
                                    className="w-full rounded-2xl border-2 border-primary/40 py-5 pl-11 font-semibold text-gray-900 ring outline-none"
                                />
                            </div>

                            <div className="relative w-full">
                                <label htmlFor="password" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-800">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    // value={password}
                                    // onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border-2 border-primary/40 py-5 pl-11 font-semibold text-gray-900 ring outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-between px-2 text-sm font-medium text-primary">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4 accent-primary" />
                                    Remember for 30 days
                                </label>
                                <button type="button" className="font-semibold text-primary italic">
                                    Forgot Password
                                </button>
                            </div>

                            <button type="submit" className="mt-10 w-full cursor-pointer rounded-2xl bg-primary py-6 font-semibold text-white">
                                Login
                            </button>

                            {/* Register Now link */}
                            <div className="mt-0 flex justify-center">
                                <p className="text-sm font-light text-primary">
                                    Don’t have an account?{' '}
                                    <a href="#" className="font-bold text-primary italic">
                                        Register Now
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
