import images from '@/constants/image';
import { ReactNode, type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    LeftDesktopContent?: ReactNode;
    mobileTopContent?: ReactNode;
}

export default function AuthSimpleLayout({ mobileTopContent, LeftDesktopContent,  children }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <div className="h-screen w-full items-start md:flex dark:bg-white">
                {/* Left Desktop Side*/}
                 {LeftDesktopContent}

                {/* Mobile Pattern Screen */}
                <div className="h-[330px] sm:h-[600px] md:hidden dark:bg-white">
                    <div className="relative z-0 h-screen ">
                        <div className="relative">
                            <img src={images.mobilePattern} className="absolute h-auto w-full object-contain" alt="" />
                        </div>
                        {/* Mobile Topcontent */}
                        {mobileTopContent}
                    </div>
                </div>
                {/* Right Side Desktop and Mobile (Scrollable) */}
                <div
                    style={{
                        backgroundImage: `url(${images.formBG})`,
                    }}
                    className="flex w-full  md:w-2/4 h-screen   lg:justify-end  xl:w-full xl:justify-center"
                >
                    {children}
                    
                </div>
            </div>
        </>
    );
}
