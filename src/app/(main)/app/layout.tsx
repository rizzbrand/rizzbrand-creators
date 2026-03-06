import DashboardNavbar from "@/components/dashboard/dashboard-navbar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="flex min-h-screen w-full">
            <DashboardSidebar />
            <div className="flex flex-col flex-1 lg:ml-64">
                <DashboardNavbar />
                <main className="flex-1 pt-16">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;