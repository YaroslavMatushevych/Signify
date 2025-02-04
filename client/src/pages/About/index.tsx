import React from 'react';

const AboutPage: React.FC = () => (
    <div className="container mt-14">
        <div className="flex flex-col justify-center">
            <h2 className="text-center font-bold text-2xl mt-28 mb-10">About Signify</h2>
            <p className="text-center w-3/5 mx-auto my-10 text-lg leading-relaxed">
                Signify is my personal project, built out of passion for AI-powered gesture recognition. It’s a platform where I explored real-time hand
                tracking and machine learning models to make communication more intuitive.
            </p>
            <p className="text-center w-3/5 mx-auto mb-10 text-lg leading-relaxed">
                This project isn’t just about code—it&apos;s about creating something meaningful.
            </p>
            <p className="text-center text-lg mb-10">
                Explore the source code on{' '}
                <a
                    href="https://github.com/YaroslavMatushevych/signify"
                    className="text-purple-600 hover:text-pink-400 font-semibold"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                .
            </p>
            <div className="flex justify-around my-14">
                <a href="https://github.com/YaroslavMatushevych" target="_blank" rel="noreferrer">
                    <img src="https://avatars.githubusercontent.com/u/42974616?v=4" alt="Yaroslav Matushevych" className="rounded-full w-36 shadow-xl" />
                </a>
            </div>
        </div>
    </div>
);

export default AboutPage;
