import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '~/components/common/dashboard/navbar/AdminNavBar';
import AdminSideBar from '~/components/common/dashboard/sidebar/AdminSideBar';
import { DashboardContextProvider } from '~/core/provider/dashboard/DashboardContextProvider';

const DashboardPageLayout: React.FC = () => {
    return (
        <DashboardContextProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <AdminSideBar />
                <div className="w-full p-1 md:w-4/5">
                    <AdminNavBar />
                    <Outlet />
                </div>
            </div>
        </DashboardContextProvider>
    );
};

export default DashboardPageLayout;
