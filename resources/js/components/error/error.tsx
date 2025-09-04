import { Button } from '@/components/ui/button';

interface Props {
    image: string;
    heading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export default function ErrorPage({ image, heading, description, buttonText, buttonLink }: Props) {
    const handleClick = () => {
        window.location.href = buttonLink;
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
            <div className="max-w-md space-y-4 text-center">
                <div className="flex w-full items-center justify-center">
                    <img src={image} alt="" />
                </div>
                <h1 className="text-2xl font-bold text-[#0E0842]">{heading}</h1>
                <p className="text-[#5E4F85]">{description}</p>
                <Button onClick={handleClick} className="cursor-pointer bg-[#1D1D1D] px-6 py-2 text-white hover:cursor-pointer hover:bg-[#1D1D1D]/90">
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}
