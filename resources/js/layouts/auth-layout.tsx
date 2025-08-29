import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    topContent,
    bottomContent,
    mobileTopContent,
    ...props
}: {
    children: React.ReactNode;
    topContent: React.ReactNode;
    bottomContent: React.ReactNode;
    mobileTopContent: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate mobileTopContent={mobileTopContent} topContent={topContent} bottomContent={bottomContent} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
