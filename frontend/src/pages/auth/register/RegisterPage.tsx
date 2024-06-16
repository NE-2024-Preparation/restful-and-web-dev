import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { register_user } from '~/api/auth';
import { Button, Form, InputField } from '~/components/elements';
import { adduserRedux } from '~/core/redux/slices/userSlice';
import { AuthRegisterRequestPayload } from '~/core/types/auth';
import { addTokensRedux } from '~/core/redux/slices/tokensSlice';
import { IMAGES } from '~/assets/images';

const schema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().min(1, 'Email or Username is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});

const RegisterPage: React.FC = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (payload: AuthRegisterRequestPayload) => {
        try {
            setError('');
            setIsLoading(true);
            const data = await register_user(payload);
            const { tokens, user } = data.payload;
            dispatch(adduserRedux(user));
            dispatch(addTokensRedux(tokens));
            window.location.reload();
        } catch (error: any) {
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Register - Project Name</title>
            </Helmet>
            <div className="flex h-screen w-screen object-cover">
                <img
                    src={IMAGES.CreateAccoutBackgroundImage}
                    alt="Page Desc Image"
                    className="hidden xl:block xl:w-3/5"
                />
                <section className="flex h-full w-full items-center justify-center py-20 lg:py-[120px] xl:w-2/5">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 ">
                                <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-20 px-10 sm:px-12 md:px-[60px]">
                                    <div className="flex flex-col pb-3 text-xl font-semibold">
                                        <span>Hey,</span>
                                        <span>Register Here</span>
                                    </div>
                                    <Form<
                                        AuthRegisterRequestPayload,
                                        typeof schema
                                    >
                                        schema={schema}
                                        onSubmit={handleSubmit}
                                    >
                                        {({ register, formState }) => (
                                            <>
                                                <div className="flex flex-col gap-4">
                                                    <InputField
                                                        placeholder="Enter Your First Name"
                                                        error={
                                                            formState.errors
                                                                .firstName
                                                        }
                                                        registration={register(
                                                            'firstName'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Last Name"
                                                        error={
                                                            formState.errors
                                                                .lastName
                                                        }
                                                        registration={register(
                                                            'lastName'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Email"
                                                        error={
                                                            formState.errors
                                                                .email
                                                        }
                                                        registration={register(
                                                            'email'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Username"
                                                        error={
                                                            formState.errors
                                                                .username
                                                        }
                                                        registration={register(
                                                            'username'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="text"
                                                    />

                                                    <InputField
                                                        placeholder="Enter Your Password"
                                                        error={
                                                            formState.errors
                                                                .password
                                                        }
                                                        registration={register(
                                                            'password'
                                                        )}
                                                        className="h-10 text-xs"
                                                        isLoading={isLoading}
                                                        type="password"
                                                    />
                                                </div>

                                                <p className="md:text-md mt-3 text-xs">
                                                    Already have an account?
                                                    <Link
                                                        to={'/auth/login'}
                                                        className="mx-1 text-primary-500 underline hover:underline"
                                                    >
                                                        Login
                                                    </Link>
                                                </p>
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
                                                    className="mt-4 w-full text-xs font-semibold"
                                                    isLoading={isLoading}
                                                >
                                                    Register
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

export default RegisterPage;
