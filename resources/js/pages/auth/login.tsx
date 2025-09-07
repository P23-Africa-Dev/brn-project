import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';

import LeftDesktopContent from '@/components/auths/LeftDesktopContent';
import MobileTopContent from '@/components/auths/MobileContent';
import StepTopContent from '@/components/auths/StepTopContent';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { LoaderCircle } from 'lucide-react';

const loginMobileContent = {
    title: 'Your Next Connection Awaits You!',
    description: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
    headingClassName: 'text-3xl font-bold text-white',
    paragraphClassName: 'max-w-sm pr-5 text-[17px] font-light text-white',
};

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
                    <MobileTopContent content={loginMobileContent} />
                </>
            }
            LeftDesktopContent={
                <LeftDesktopContent
                    topContentLayout={
                        <>
                            <StepTopContent
                                title="Welcome Back!"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                                headingClassName="max-w-[100px] lg:max-w-[300px]"
                                
                            />
                        </>
                    }
                />
            }
        >
            <div className="relative z-10 mx-auto max-w-md ">
                <div className="mb-10 ">
                    <h2 className="mb-1 text-2xl lg:text-3xl font-extrabold text-primary dark:text-black">Your Next Connection Awaits You!</h2>
                    <p className="max-w-sm pr-5 text-[17px] font-normal text-primary dark:text-black">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                </div>

                <div className="max-w-sm ">
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
                                className="w-full rounded-2xl border-2 border-primary/40 py-5 pl-11 font-semibold text-gray-900 ring outline-none focus:ring-0"
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

                        <div className="flex items-center justify-between px-2 text-sm font-medium text-primary">
                            <label className="flex cursor-pointer items-center dark:text-black gap-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="h-4 w-4 accent-primary dark:bg-gray dark:accent-black"
                                />
                                Remember for 30 days
                            </label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="font-semibold text-primary dark:text-black italic">
                                    Forgot Password
                                </TextLink>
                            )}
                        </div>

                        <Button
                            type="submit"
                        className="w-full rounded-2xl mt-10 bg-primary dark:bg-black py-8 text-lg font-semibold text-white hover:bg-pinkLight/90"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Log in
                        </Button>

                     

                        {/* Register Now link */}
                        <div className="mt-0 flex justify-center">
                            <p className="text-sm font-light text-primary dark:text-black">
                                Don’t have an account?{' '}
                                <TextLink tabIndex={5} href={'http://127.0.0.1:8080/brn-form'} className="font-bold dark:text-black text-primary italic">
                                    Register Now
                                </TextLink>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
