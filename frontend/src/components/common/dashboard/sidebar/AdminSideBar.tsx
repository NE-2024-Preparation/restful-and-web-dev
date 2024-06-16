import React, { useEffect, useRef } from 'react';
import AdminSideBarNavigationComponent from './AdminSideBarNavigationComponent';
import { useDashboardContext } from '~/core/provider/dashboard/DashboardContextProvider';

const AdminSideBar: React.FC = () => {
    const { isSidebarOpen, closeSidebar } = useDashboardContext();

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
            } z-50 bg-slate-300 md:w-1/5`}
            ref={SIDE_BAR_ADMIN_ELEMENT}
        >
            <div className="z-20 h-full overflow-y-auto duration-150 ease-in-out">
                <AdminSideBarNavigationComponent />
            </div>
        </aside>
    );
};

export default AdminSideBar;
