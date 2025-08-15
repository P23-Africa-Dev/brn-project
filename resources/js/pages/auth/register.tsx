import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TagSelector from '@/components/select/tag-selector';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_picture: File | null;
    company_name: string;
    company_description: string;
    industry: string;
    categories: string[];
    great_at: string[];
    can_help_with: string[];
};

type RegisterProps = {
    prefill?: {
        name?: string;
        email?: string;
        company_name?: string;
    };
};

export default function Register({ prefill }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: prefill?.name ?? '',
        email: prefill?.email ?? '',
        password: '',
        password_confirmation: '',
        profile_picture: null,
        company_name: prefill?.company_name ?? '',
        company_description: '',
        industry: '',
        categories: [],
        great_at: [],
        can_help_with: [],
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            forceFormData: true,
            transform: (data) => {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v) => formData.append(`${key}[]`, v));
                    } else if (value instanceof File) {
                        formData.append(key, value);
                    } else if (typeof value === 'string') {
                        formData.append(key, value);
                    }
                });
                return formData;
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Create an account" description="Enter your details below to create your account">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit} encType="multipart/form-data">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            // readOnly={!!prefill?.name}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            readOnly={!!prefill?.email}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="profile_picture">Profile Picture</Label>
                        <Input
                            id="profile_picture"
                            type="file"
                            tabIndex={5}
                            accept="image/jpeg,image/png,image/gif"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                if (file && file.size > 5242880) {
                                    // 5MB limit
                                    alert('File size should not exceed 5MB');
                                    e.target.value = '';
                                    return;
                                }
                                setData('profile_picture', file);
                            }}
                        />
                        {data.profile_picture && (
                            <img src={URL.createObjectURL(data.profile_picture)} alt="Preview" className="mt-2 h-24 w-24 rounded-full object-cover" />
                        )}
                        <InputError message={errors.profile_picture} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company_name">Company Name</Label>
                        <Input
                            id="company_name"
                            type="text"
                            autoComplete="company_name"
                            value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)}
                            disabled={processing}
                            readOnly={!!prefill?.company_name}
                            placeholder="Company Name"
                            tabIndex={6}
                        />
                        <InputError message={errors.company_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company_description">What does your company do?</Label>
                        <Input
                            id="company_description"
                            value={data.company_description}
                            onChange={(e) => setData('company_description', e.target.value)}
                            placeholder="Describe your company"
                            tabIndex={7}
                        />
                        <InputError message={errors.company_description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="industry">Select Interested Industry</Label>
                        <select
                            id="industry"
                            value={data.industry}
                            onChange={(e) => setData('industry', e.target.value)}
                            className="rounded border p-2"
                            tabIndex={8}
                        >
                            <option value="">-- Select --</option>
                            <option value="tech">Tech</option>
                            <option value="finance">Finance</option>
                            <option value="health">Health</option>
                            {/* Add more options */}
                        </select>
                        <InputError message={errors.industry} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Categories (choose up to 5)</Label>
                        <TagSelector
                            options={['Startup', 'SME', 'Enterprise', 'Tech', 'Retail', 'Education', 'Finance', 'Healthcare']}
                            selected={data.categories}
                            onChange={(val) => setData('categories', val)}
                            max={5}
                            tabIndex={9}
                        />
                        <InputError message={errors.categories} />
                    </div>

                    <div className="grid gap-2">
                        <Label>I'm great at</Label>
                        <TagSelector
                            options={['Sales', 'Marketing', 'Networking', 'Pitching', 'Team Building', 'Design']}
                            selected={data.great_at}
                            onChange={(val) => setData('great_at', val)}
                            max={3}
                            tabIndex={10}
                        />
                        <InputError message={errors.great_at} />
                    </div>

                    <div className="grid gap-2">
                        <Label>I can help others with</Label>
                        <TagSelector
                            options={['Fundraising', 'Partnerships', 'Product Advice', 'Hiring', 'Growth Strategy', 'Mentoring']}
                            selected={data.can_help_with}
                            onChange={(val) => setData('can_help_with', val)}
                            max={3}
                            tabIndex={11}
                        />
                        <InputError message={errors.can_help_with} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={12} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={13}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
