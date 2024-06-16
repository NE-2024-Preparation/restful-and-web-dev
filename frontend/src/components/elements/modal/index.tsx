/* eslint-disable no-unused-vars */
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect } from 'react';

interface DialogProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: (...args: any) => void;
}

export const Modal = (props: DialogProps) => {
    const { children, isOpen, onClose } = props;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={`fixed left-0 top-0 z-50 flex h-screen w-screen bg-slate-400 bg-opacity-90 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } duration-200 ease-in-out`}
        >
            <FontAwesomeIcon
                className="border-secondary-500 text-secondary-500 absolute top-5 right-10 z-50 cursor-pointer border p-3 text-xl"
                icon={faClose}
                onClick={onClose}
            />
            {children}
        </div>
    );
};
