import images from '@/constants/image';
import { ReactNode, type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    topContent?: ReactNode;
    bottomContent?: ReactNode;
    mobileTopContent?: ReactNode;
}

export default function AuthSimpleLayout({ mobileTopContent, topContent, bottomContent, children }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <>
            <div className="z-0 h-screen w-full md:hidden">
                <div className="relative h-[40vh]">
                    <img src={images.mobilePattern} className="absolute h-auto w-full object-contain" alt="" />
                </div>
                {/* Top content */}
                {mobileTopContent}
                <div className="relative z-10 px-10">
                    <div className="flex w-full justify-center text-white">{children}</div>
                </div>
            </div>

            <div className="hidden h-screen w-full md:flex">
                {/* Left Side*/}
                <div
                    className="fixed z-10 hidden h-full w-5/12 bg-center text-white lg:block"
                    style={{
                        backgroundImage: `url(${images.stepFormsBg})`,
                    }}
                >
                    {/* Step Form Inner right pattern */}
                    <div
                        className="absolute top-0 -right-12 z-0 h-screen w-[80px] bg-cover bg-center text-white"
                        style={{
                            backgroundImage: `url(${images.stepFormsInnerPattern})`,
                        }}
                    >
                        <div className="h-screen w-full bg-gradient-to-r from-primary/60 from-12% via-primary/0 via-30%"></div>
                    </div>

                    <div className="flex h-screen flex-col justify-between py-10">
                        {/* Top content */}
                        {topContent}

                        {/* Bottom content */}
                        {bottomContent}
                    </div>
                </div>

                {/* Right Side (Scrollable) */}
                <div
                    style={{
                        backgroundImage: `url(${images.formBG})`,
                    }}
                    className="z-10 flex w-full flex-col items-center justify-center overflow-y-scroll bg-white bg-cover bg-center py-10 lg:ml-[41.36667%] lg:w-7/12 lg:flex-row lg:items-start lg:overflow-y-auto lg:py-0"
                >
                    <div className="flex w-full justify-center p-8 md:w-5/6 lg:w-3/4">{children}</div>
                </div>
            </div>
        </>
    );
}
