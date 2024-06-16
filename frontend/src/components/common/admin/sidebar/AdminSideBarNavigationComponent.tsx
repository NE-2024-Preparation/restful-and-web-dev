import { faHouse, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext, AdminContextType } from '~/core/provider/admin/AdminProvider';

export type LinksType ={
    title: string;
    href: string;
    icon: IconDefinition;

}

const  AdminSideBarNavigationComponent:React.FC = () => {
    const [tab, setTab] = useState(0);

    const { toggleSidebar } =
    useContext<AdminContextType>(AdminContext);

    const links: LinksType[]= [
        {
            title: 'Dashboard',
            href: '/',
            icon: faHouse
        },
        {
            title: 'Users',
            href: '/users',
            icon: faUser
        },
    ];

    useEffect(() => {
        links.map((link, index) => {
            if (window.location.href.includes(link.href)) setTab(index);
        });
    }, []);

    return (
        <div>
            <nav>
                <ul className="flex flex-col gap-2 p-2">
                    {links.map(({ href, icon, title }, index) => {
                        return (
                            <li
                                onClick={() => {
                                    setTab(index);
                                    toggleSidebar();
                                }}
                                key={index}
                            >
                                {tab === index ? (
                                    <Link
                                        to={`/admin${href}`}
                                        className="flex gap-2 items-center rounded-md bg-blue-400 p-2"
                                    >
                                        <FontAwesomeIcon icon={icon} className="text-md" />
                                        {title}
                                    </Link>
                                ) : (
                                    <Link
                                        to={`/admin${href}`}
                                        className="flex gap-2 items-center p-2"
                                    >
                                        <FontAwesomeIcon icon={icon} className="text-md" />
                                        {title}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSideBarNavigationComponent;