import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { ExportContextProvider } from '../export/ExportContextProvider';

export const AdminContext = createContext<any>({});

export type AdminContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const AdminContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    const value = useMemo(
        () => ({
            isSidebarOpen,
            toggleSidebar,
            closeSidebar,
        }),
        [isSidebarOpen]
    );

    return (
        <AdminContext.Provider value={value}>
            <ExportContextProvider>
                {children}
            </ExportContextProvider>
        </AdminContext.Provider>
    );
};
