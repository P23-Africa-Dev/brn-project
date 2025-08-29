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
                    <div className="absolute left-10 top-7 py-2">
                        <div className="bg-transparent">
                            <h2 className="text-primary mb-1 text-3xl font-extrabold">Your Next Connection Awaits You!</h2>
                            <p className="text-primary max-w-sm pr-5 text-[17px] font-normal">
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
            <div className="flex w-full justify-center p-8 md:w-5/6 lg:w-3/4">
                <div>
                    <div className="mb-10">
                        <h2 className="text-primary mb-1 text-3xl font-extrabold">Your Next Connection Awaits You!</h2>
                        <p className="text-primary max-w-sm pr-5 text-[17px] font-normal">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        </p>
                    </div>

                    <div className="max-w-sm">
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
                                    className="border-primary/40 w-full rounded-2xl border-2 py-5 pl-11 font-semibold text-gray-900 outline-none ring focus:ring-0"
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
                                    className="border-primary/40 w-full rounded-2xl border-2 py-5 pl-11 font-semibold text-gray-900 outline-none ring"
                                />
                            </div>

                            <div className="w-full text-center">{showError && <InputError message="Email or Password is wrong" />}</div>

                            <div className="text-primary flex items-center justify-between px-2 text-sm font-medium">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData('remember', !data.remember)}
                                        tabIndex={3}
                                        className="accent-primary h-4 w-4"
                                    />
                                    Remember for 30 days
                                </label>
                                {canResetPassword && (
                                    <TextLink href={route('password.request')} className="text-primary font-semibold italic">
                                        Forgot Password
                                    </TextLink>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="bg-primary mt-10 w-full cursor-pointer rounded-2xl py-6 font-semibold text-white"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Log in
                            </Button>

                            {/* Register Now link */}
                            <div className="mt-0 flex justify-center">
                                <p className="text-primary text-sm font-light">
                                    Don’t have an account?{' '}
                                    <TextLink tabIndex={5} href={'http://127.0.0.1:8080/brn-form'} className="text-primary font-bold italic">
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
