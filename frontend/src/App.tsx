import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AidFlowProvider } from './context/AidFlowContext';
import { DemoPlayerBar } from './components/DemoPlayerBar';

// Requester flow pages
import { RequesterLayout } from './pages/requester/RequesterLayout';
import { RequestHelpPage } from './pages/requester/RequestHelpPage';
import { AddPhotosPage } from './pages/requester/AddPhotosPage';
import { RequestStatusPage } from './pages/requester/RequestStatusPage';
import { RegisterResourcePage } from './pages/requester/RegisterResourcePage';

// Coordinator portal pages
import { CoordinatorLayout } from './pages/coordinator/CoordinatorLayout';
import { SortingQueuePage } from './pages/coordinator/SortingQueuePage';
import { RequestReviewPage } from './pages/coordinator/RequestReviewPage';
import { AssignTeamsPage } from './pages/coordinator/AssignTeamsPage';
import { CoverageMapPage } from './pages/coordinator/CoverageMapPage';
import { OperationsOverviewPage } from './pages/coordinator/OperationsOverviewPage';
import { ReferralsPage } from './pages/coordinator/ReferralsPage';

export function App() {
  return (
    <AidFlowProvider>
      <BrowserRouter>
        {/* Floating Demo Player matching the 35s demo recording scrubber */}
        <DemoPlayerBar />

        <Routes>
          {/* Default entrypoint goes to the Coordinator dashboard */}
          <Route path="/" element={<Navigate to="/coordinator" replace />} />

          {/* Citizen Requester Routes */}
          <Route element={<RequesterLayout />}>
            <Route path="/request" element={<RequestHelpPage />} />
            <Route path="/request/photos" element={<AddPhotosPage />} />
            <Route path="/request/status/:id" element={<RequestStatusPage />} />
            <Route path="/register-resource" element={<RegisterResourcePage />} />
          </Route>

          {/* Volunteer Coordinator Portal Routes */}
          <Route path="/coordinator" element={<CoordinatorLayout />}>
            <Route index element={<SortingQueuePage />} />
            <Route path="review/:id" element={<RequestReviewPage />} />
            <Route path="assign/:id" element={<AssignTeamsPage />} />
            <Route path="map" element={<CoverageMapPage />} />
            <Route path="operations" element={<OperationsOverviewPage />} />
            <Route path="referrals" element={<ReferralsPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/coordinator" replace />} />
        </Routes>
      </BrowserRouter>
    </AidFlowProvider>
  );
}

export default App;
