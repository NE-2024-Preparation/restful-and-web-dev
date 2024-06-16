/* eslint-disable no-unused-vars */
import React, { FormEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { AuthImages } from '~/assets/images/background/auth';
import { Button } from '~/components/elements';
import styled from 'styled-components';
import ReactInputVerificationCode from 'react-input-verification-code';
import { Link, useNavigate } from 'react-router-dom';

const StyledReactInputVerificationCode = styled.div`
    display: flex;
    justify-content: center;
    --ReactInputVerificationCode-itemWidth: 60px;
    --ReactInputVerificationCode-itemHeight: 55px;
    --ReactInputVerificationCode-itemSpacing: 10px;
    .ReactInputVerificationCode__item {
        font-size: 24px;
        font-weight: 500;
        color: #000;
        border: 1px solid #4200fe;
        border-radius: 4px;
        box-shadow: none;
    }
    .ReactInputVerificationCode__item.is-active {
        box-shadow: none;
        border: 2px solid #20ff0d;
    }
`;

export type RegisterPayload = {
    email: string;
};

const ResetPasswordVerificationCode: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!code || code.length < 6) {
                setError('Please enter the code sent to your email!');
                return;
            }
            setIsLoading(true);
            setError('');
            navigate('/auth/reset-password-confirmed');
        } catch (error: any) {
            setError(error.response.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Reset Password Verification- Project Name</title>
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
                                        <span>
                                            {' '}
                                            Enter code we've just sent to you
                                        </span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <StyledReactInputVerificationCode>
                                            <ReactInputVerificationCode
                                                length={6}
                                                value={code}
                                                placeholder={''}
                                                onChange={newValue => {
                                                    setCode(newValue);
                                                    setError('');
                                                }}
                                            />
                                        </StyledReactInputVerificationCode>

                                        <p className="md:text-md mt-3 text-sm">
                                            Didn't receive the code?
                                            <span className="hover:text-primary md:text-md mx-1  mt-3 inline-block cursor-pointer text-sm text-primary-500 underline hover:underline">
                                                Resend
                                            </span>
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
                                            className="text-md mt-4 w-full font-semibold"
                                            isLoading={isLoading}
                                        >
                                            Submit
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

export default ResetPasswordVerificationCode;
