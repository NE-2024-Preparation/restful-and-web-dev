import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AuthImages } from '~/assets/images/background/auth';
import { Button, Form, InputField } from '~/components/elements';

const schema = z
    .object({
        password: z.string().min(1, 'Password is required'),
        confirm_password: z.string().min(1, 'Confirm Password is required'),
    })
    .refine(data => data.password === data.confirm_password, {
        message: 'Passwords don\'t match',
        path: ['confirm_password'],
    });

export type ResetPasswordPayload = {
    password: string;
    confirm_password: string;
};

const ResetPasswordConfirmedPage: React.FC = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: ResetPasswordPayload) => {
        try {
            setError('');
            setIsLoading(true);
            navigate('/auth/reset-password-success');
            console.log(payload);
        } catch (error: any) {
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Reset Password - Project Name</title>
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
                                        <span>Provide your new password</span>
                                    </div>
                                    <Form<ResetPasswordPayload, typeof schema>
                                        schema={schema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ register, formState }) => (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <InputField
                                                        placeholder="Enter your new password"
                                                        error={
                                                            formState.errors
                                                                .password
                                                        }
                                                        registration={register(
                                                            'password'
                                                        )}
                                                        className="h-12"
                                                        type="password"
                                                        isLoading={isLoading}
                                                    />
                                                    <InputField
                                                        placeholder="Re-enter your password"
                                                        error={
                                                            formState.errors
                                                                .confirm_password
                                                        }
                                                        registration={register(
                                                            'confirm_password'
                                                        )}
                                                        className="h-12"
                                                        type="password"
                                                        isLoading={isLoading}
                                                    />
                                                </div>

                                                {error && (
                                                    <div className="md:text-md flex flex-col gap-4 pt-2 text-xs">
                                                        <p className="text-red-600">
                                                            {error}
                                                        </p>
                                                    </div>
                                                )}
                                                <Button
                                                    type="submit"
                                                    variant="bg-primary-500"
                                                    className="text-md mt-4 w-full font-semibold"
                                                    isLoading={isLoading}
                                                >
                                                    Reset
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ResetPasswordConfirmedPage;
