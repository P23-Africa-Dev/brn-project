import { Button } from '@/components/ui/button';

interface Props {
    message: string;
    buttonText: string;
    buttonLink: string;
}

export default function AuthErrorPage({ message, buttonText, buttonLink }: Props) {
    const handleClick = () => {
        window.location.href = buttonLink;
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="space-y-6 text-center">
                <h1 className="text-2xl font-semibold text-red-600">Error</h1>
                <p className="text-gray-600">{message}</p>
                <Button onClick={handleClick} className="cursor-pointer px-6 py-2 hover:cursor-pointer">
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
