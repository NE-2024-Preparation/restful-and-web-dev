import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>404 - Page Not Found</title>
            </Helmet>
            <div className="flex h-screen w-screen flex-col items-center justify-center ">
                <h2>404 Page Not Found</h2>
                <Link to={'/'} className="nav__link">
                    Go Back Home
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
