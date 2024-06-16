import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavBar from '~/components/common/admin/navbar/AdminNavBar';
import AdminSideBar from '~/components/common/admin/sidebar/AdminSideBar';
import { AdminContextProvider } from '~/core/provider/admin/AdminProvider';

const AdminPageLayout:React.FC = () => {

    return (
        <AdminContextProvider>
            <div className="flex h-screen w-screen overflow-hidden">
                <AdminSideBar />
                <div className='p-1 w-full md:w-4/5'>
                    <AdminNavBar />
                    <Outlet />
                </div>
            </div>
        </AdminContextProvider>
    );
};  

export default AdminPageLayout;