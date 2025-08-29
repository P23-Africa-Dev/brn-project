import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import StepBottomContent from '@/components/auths/StepBottomContent';
import StepTopContent from '@/components/auths/StepTopContent';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

import { Button } from '@/components/ui/button-old';
import { Checkbox } from '@/components/ui/checkbox-old';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { LoaderCircle } from 'lucide-react';

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

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (errors.email || errors) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [errors.email, errors]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            mobileTopContent={
                <>
                    <div className="absolute top-20 left-10">
                        <div className="bg-transparent pr-10">
                            <h2 className="mb-3 text-3xl font-bold text-white">Welcome Back!</h2>
                            <p className="max-w-sm pr-5 text-[17px] font-light text-white">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                        </div>
                    </div>
                </>
            }
            topContent={
                <StepTopContent title="Welcome!" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" />
            }
            bottomContent={<StepBottomContent />}
        >
            <div className="flex w-full justify-center lg:w-4/4 lg:p-8">
                <div>
                    <div className="mb-10 block">
                        <h2 className="mb-1 text-2xl font-extrabold text-primary md:text-primary lg:max-w-md lg:text-3xl">
                            Your Next Connection Awaits You!
                        </h2>
                        <p className="max-w-sm pr-5 text-sm font-normal text-primary lg:text-[17px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </p>
                    </div>

                    <div className="mx-auto w-full lg:mx-0 lg:max-w-sm">
                        <form onSubmit={submit} className="space-y-7">
                            <div className="relative w-full">
                                <Label htmlFor="fullName" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-800">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-2xl border-2 border-primary/40 py-5 pl-11 font-semibold text-gray-900 ring outline-none"
                                />
                            </div>

                            <div className="relative w-full">
                                <label htmlFor="password" className="absolute -top-2.5 left-8 bg-white px-3 text-sm text-gray-800">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-2xl border-2 border-primary/40 py-5 pl-11 font-semibold text-gray-900 ring outline-none"
                                />
                            </div>

                            <div className="w-full text-center">{showError && <InputError message="Email or Password is wrong" />}</div>

                            <div className="grid grid-cols-2 text-sm font-medium text-primary md:px-2">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="h-4 w-4 accent-primary"
                                    />
                                    Remember for 30 days
                                </label>
                                {canResetPassword && (
                                    <TextLink href={route('password.request')} className="font-semibold text-primary italic lg:whitespace-nowrap">
                                        Forgot Password
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="mt-10 w-full cursor-pointer rounded-2xl bg-primary py-6 font-semibold text-white"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>

                            {/* Register Now link */}
                            <div className="mt-0 flex justify-center">
                                <p className="text-sm font-light text-primary">
                                    Don’t have an account?{' '}
                                    <TextLink tabIndex={5} href={'http://127.0.0.1:8080/brn-form'} className="font-bold text-primary italic">
                                        Register Now
                                    </TextLink>
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
