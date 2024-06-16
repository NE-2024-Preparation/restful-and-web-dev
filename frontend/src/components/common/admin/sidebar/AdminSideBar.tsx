import React, {  useContext, useEffect,  useRef } from 'react';
import { AdminContext, AdminContextType } from '~/core/provider/admin/AdminProvider';
import AdminSideBarNavigationComponent from './AdminSideBarNavigationComponent';

const AdminSideBar:React.FC = () => {
    const { isSidebarOpen, closeSidebar } =
    useContext<AdminContextType>(AdminContext);

    const SIDE_BAR_ADMIN_ELEMENT = useRef<any>(null);

    useEffect(() => {
        const clickEvent = () => {
            if (!SIDE_BAR_ADMIN_ELEMENT.current?.contains(event?.target))
                closeSidebar();
        };
        document.addEventListener('mousedown', clickEvent);
        return () => {
            document.removeEventListener('mousedown', clickEvent);
        };
    }, [SIDE_BAR_ADMIN_ELEMENT]);

    return (
        <aside
            className={`h-full min-w-[20rem] ${
                isSidebarOpen ? 'absolute block md:relative' : 'hidden md:block'
            } z-50 md:w-1/5 bg-slate-300`}
            ref={SIDE_BAR_ADMIN_ELEMENT}
        >
            <div className="z-20 h-full overflow-y-auto duration-150 ease-in-out">
                <AdminSideBarNavigationComponent />
            </div>
        </aside>
    );
};

export default AdminSideBar;