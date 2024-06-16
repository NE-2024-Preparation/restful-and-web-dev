import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '~/assets/icons';
import { AuthImages } from '~/assets/images/background/auth';
import { Button } from '~/components/elements';

const ResetPasswordSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/auth/login');
    };
    return (
        <>
            <Helmet>
                <title>Password Reset Success - Project Name</title>
            </Helmet>
            <div className="flex h-screen w-screen object-cover">
                <img
                    src={AuthImages.CreateAccoutBackgroundImage}
                    alt="Page Desc Image"
                    className="hidden xl:block xl:w-3/5"
                />
                <section className="flex h-full w-full items-center justify-center py-20 lg:py-[120px] xl:w-2/5">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 ">
                                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-20 px-10 sm:px-12 md:px-[60px]">
                                    <div className="flex flex-col pb-3 text-2xl font-semibold">
                                        <span>Hey,</span>
                                        <span>Password Reset Successfully</span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex items-center justify-center py-2">
                                            <img
                                                src={ICONS.Success}
                                                className="h-40"
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            variant="bg-primary-500"
                                            className="text-md mt-4 w-full font-semibold"
                                        >
                                            LOGIN AGAIN
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ResetPasswordSuccessPage;
