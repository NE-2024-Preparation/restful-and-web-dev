import { Link } from 'react-router-dom';

type NavLinkType = { path: string; text: string };

const NavBarComponent: React.FC = () => {
    const nav_links: NavLinkType[] = [
        {
            path: '/about',
            text: 'About',
        },
        {
            path: '/blog',
            text: 'Blog',
        },
        {
            path: '/courses',
            text: 'Courses',
        },
        {
            path: '/portfolio',
            text: 'Portfolio',
        },
        {
            path: '/clients',
            text: 'Clients',
        },
        {
            path: '/rewards',
            text: 'Rewards',
        },
        {
            path: '/contact',
            text: 'Contact',
        },
    ];

    return (
        <div className="row">
            <nav className="nav flex justify-between gap-20" role="navigation">
                <Link
                    to={'/'}
                    className={`nav__link ${
                        window.location.pathname == '/' &&
                        'nav__link__current underline-offset-[18px]'
                    }`}
                >
                    Home
                </Link>
                <ul className="nav__items">
                    {nav_links.map(({ path, text }, index) => (
                        <li className="nav__item" key={index}>
                            <Link
                                to={path}
                                className={`nav__link 
                             ${
                        window.location.pathname == path &&
                                 'nav__link__current underline underline-offset-[18px]'
                        }
                            `}
                            >
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default NavBarComponent;
