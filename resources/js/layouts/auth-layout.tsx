import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({
    children,
    topContent,
    bottomContent,
    ...props
}: {
    children: React.ReactNode;
    topContent: React.ReactNode;
    bottomContent: React.ReactNode;
}) {
    return (
        <AuthLayoutTemplate topContent={topContent} bottomContent={bottomContent} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
