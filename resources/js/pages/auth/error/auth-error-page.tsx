import { Button } from '@/components/ui/button-old';
import images from '@/constants/image';

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
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
            <div className="max-w-md space-y-4 text-center">
                <div className='w-full flex justify-center items-center'>
                    <img src={images.errorBg} alt="" />
                </div>
                <h1 className="text-2xl  text-[#0E0842] font-bold">Opps!</h1>
                <p className="text-[#5E4F85]">Complete our 30-second form for exclusive, tailored access to our executive networking platform.</p>
                <Button onClick={handleClick} className="cursor-pointer bg-[#1D1D1D] px-6 py-2 text-white hover:cursor-pointer hover:bg-[#1D1D1D]/90">
                    Proceed to show interest
                </Button>
            </div>
        </div>
    );
}
