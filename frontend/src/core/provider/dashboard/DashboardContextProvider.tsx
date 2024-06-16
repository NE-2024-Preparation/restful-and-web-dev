import {
    createContext,
    FC,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react';
import { ExportContextProvider } from '../export/ExportContextProvider';

export const DashboardContext = createContext<any>({});

export type DashboardContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
};

export const DashboardContextProvider: FC<{ children: ReactNode }> = ({
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
        <DashboardContext.Provider value={value}>
            <ExportContextProvider>{children}</ExportContextProvider>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error(
            'useDashboardContext must be used within a DashboardContextProvider'
        );
    }
    return context;
};
