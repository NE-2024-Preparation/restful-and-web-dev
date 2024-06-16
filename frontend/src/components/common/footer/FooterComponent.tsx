import React from 'react';
import { ICONS } from '~/assets/icons';

const FooterComponent: React.FC = () => {
    return (
        <footer role="contentinfo" className="footer">
            <div className="row">
                <ul className="footer__social-links">
                    <li className="footer__social-link-item">
                        <a
                            href="https://github.com/patriicke"
                            target={'_blank'}
                        >
                            <img
                                src={ICONS.GitHub}
                                className="footer__social-image"
                                title="Link to Github Profile"
                                alt="Github"
                            />
                        </a>
                    </li>
                    <li className="footer__social-link-item">
                        <a
                            href="https://twitter.com/patriicke"
                            target={'_blank'}
                        >
                            <img
                                src={ICONS.Twitter}
                                className="footer__social-image"
                                alt="Twitter"
                            />
                        </a>
                    </li>
                    <li className="footer__social-link-item">
                        <a
                            href="https://www.instagram.com/patriicke"
                            target={'_blank'}
                        >
                            <img
                                src={ICONS.Instagram}
                                title="Link to Instagram Profile"
                                className="footer__social-image"
                                alt="Instagram"
                            />
                        </a>
                    </li>
                    <li className="footer__social-link-item">
                        <a
                            href="https://www.linkedin.com/in/patriicke"
                            target={'_blank'}
                        >
                            <img
                                src={ICONS.LinkedIn}
                                title="Link to Linkedin Profile"
                                className="footer__social-image"
                                alt="LinkedIn"
                            />
                        </a>
                    </li>
                </ul>
                <p className="flex items-center justify-center gap-1">
                    © {new Date().getFullYear()} - designed &amp; developed with{' '}
                    <img src={ICONS.Heart} className="w-8" />
                    by{' '}
                    <a href="https://github.com/patriicke" className="link">
                        patriicke
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default FooterComponent;
