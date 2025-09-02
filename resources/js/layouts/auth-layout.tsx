import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    LeftDesktopContent,
    mobileTopContent,
    ...props
}: {
    children: React.ReactNode;
    LeftDesktopContent?: React.ReactNode;
    mobileTopContent?: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate mobileTopContent={mobileTopContent} LeftDesktopContent={LeftDesktopContent}  {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
