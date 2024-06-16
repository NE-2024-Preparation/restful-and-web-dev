import React from 'react';
import { Helmet } from 'react-helmet-async';

const HomePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <div className="">Home Page</div>
        </>
    );
};

export default HomePage;
