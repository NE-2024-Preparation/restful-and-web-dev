/* eslint-disable no-unused-vars */
import React, { createContext, ReactNode, useState } from 'react';

export const ExportContext = createContext<any>(null);

export type ExportContextType = {
    exportData: string;
    setExportData: React.Dispatch<React.SetStateAction<string>>;
};

export const ExportContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [exportData, setExportData] = useState<string>('');
    return (
        <ExportContext.Provider
            value={{
                exportData,
                setExportData,
            }}
        >
            {children}
        </ExportContext.Provider>
    );
};
