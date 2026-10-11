import React from 'react';
import { Outlet } from 'react-router-dom';
import { CoordinatorSidebar } from '../../components/CoordinatorSidebar';
import { CoordinatorHeader } from '../../components/CoordinatorHeader';
import { SystemScenarioBanner } from '../../components/SystemScenarioBanner';

export const CoordinatorLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f4f1ea' }}>
      {/* Top Banner explaining human-in-the-loop disaster coordination */}
      <SystemScenarioBanner />

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left fixed dark navigation sidebar */}
        <CoordinatorSidebar />

        {/* Main work area */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
          <CoordinatorHeader />
          <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
