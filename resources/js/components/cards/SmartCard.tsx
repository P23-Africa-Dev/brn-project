'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Link, Star } from 'lucide-react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import images from '@/constants/image';

interface SmartMatch {
    name: string;
    title: string;
    company: string;
    rating: number;
    imageSrc: string;
}

interface SmartMatchCardProps {
    match: SmartMatch;
}

const SmartMatchCard: React.FC<SmartMatchCardProps> = ({ match }) => {
    return (
        <Card className="relative flex h-[180px] w-[170px] flex-col justify-end overflow-hidden rounded-xl border-2 border-darkGreen shadow-lg dark:border-teal-400/50">
            <img src={match.imageSrc} alt={match.name} className="absolute inset-0 z-0 h-full w-full object-cover" />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent"></div>

            <CardContent className="relative -bottom-7 z-20 bg-[#FFFFFFCC]/80 p-4">
                <h3 className="text-sm font-bold text-darkBlue">Chidi Nwonsu</h3>
                <p className="text-xs font-medium text-darkBlue opacity-90">{match.title}</p>
                <div className="mt-2 flex items-center">
                    <span className="mr-1 text-lg font-semibold text-darkBlue">{match.rating}</span>
                    <Star className="h-5 w-5 fill-darkGreen text-darkGreen" />
                </div>
                <button className="absolute right-4 bottom-4 flex items-center justify-center rounded-full bg-darkBlue p-2 backdrop-blur-sm transition-colors hover:bg-darkBlue/70">
                    <Link className="h-3 w-3 text-white" />
                </button>
            </CardContent>
        </Card>
    );
};

interface SwiperCarouselProps {
    matches: SmartMatch[];
}

const SwiperCarousel: React.FC<SwiperCarouselProps> = ({ matches }) => {
    return (
        <Swiper
            // You can add breakpoints here for responsiveness
            slidesPerView={2}
            spaceBetween={5}
            freeMode={true}
            pagination={{ clickable: true }}
            className="mySwiper"
        >
            {matches.map((match, index) => (
                <SwiperSlide key={index} className="w-full">
                    <SmartMatchCard match={match} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default function SmartMatchesSection() {
    const smartMatches: SmartMatch[] = [
        {
            name: 'Chidi Nwonsu',
            title: 'COO',
            company: 'Easyaccount',
            rating: 4.6,
            imageSrc: `${images.businessMan1}`,
        },
        {
            name: 'Stephan Odili',
            title: 'CTO',
            company: 'Afrilaw',
            rating: 4.6,
            imageSrc: `${images.businessMan1}`,
        },
        {
            name: 'Stella Okoro',
            title: 'CMO',
            company: 'TechAfrica',
            rating: 4.8,
            imageSrc: `${images.businessMan1}`,
        },
        {
            name: 'Kunle Adebayo',
            title: 'CEO',
            company: 'InnovateNG',
            rating: 4.7,
            imageSrc: `${images.businessMan1}`,
        },
        {
            name: 'Fatima Al-Hamad',
            title: 'Head of Marketing',
            company: 'Luxury Goods',
            rating: 4.9,
            imageSrc: `${images.businessMan1}`,
        },
    ];
    return (
        <>
            <SwiperCarousel matches={smartMatches} />
        </>
    );
}
