import React from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from '../../components/features/Hero/HeroBackground';
import Button from '../../components/shared/Button';

const HeroPage: React.FC = () => (
    <section className="pt-52 h-screen flex flex-col items-center justify-center text-center">
        <div className="relative w-full max-w-lg">
            <HeroBackground />
            <div className="m-8 relative space-y-4">
                <h1 className="font-extrabold text-7xl">Signify.</h1>
                <p className="pt-5 text-xl">
                    Sign Language Recognition With <br /> Machine Learning
                </p>
                <Button className="mt-5">
                    <Link to="/camera">Get Started</Link>
                </Button>
            </div>
        </div>
        <p className="mt-48 px-5 max-w-2xl">
            This app will be using your webcam and machine learning to analyze your handshapes. Everything is processed locally and no webcam data will be sent
            or stored by default.
        </p>
    </section>
);

export default HeroPage;
