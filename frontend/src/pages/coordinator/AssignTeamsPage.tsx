import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { AssignModal } from '../../components/AssignModal';

export const AssignTeamsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRequestById } = useAidFlow();

  const req = getRequestById(id || 'Request-50') || {
    id: id || 'Request-50',
    needType: 'Medical',
    peopleCount: 3,
    address: '214 S 9th St, Noblesville',
    town: 'Noblesville',
    phone: '(317) 555-0148',
    description: "Water came in fast overnight. My father (78) has chest pain.",
    hasPhoto: true,
    modelSeverity: 'S1',
    modelConfidence: 0.71,
    assignedSeverity: 'S1',
    status: 'Received',
    waitingMinutes: 12,
    submittedAt: '12 min ago',
    vulnerabilityFlags: ['Elderly', 'Medical'],
  };

  return (
    <div>
      <AssignModal
        request={req as any}
        onClose={() => navigate('/coordinator')}
        onAssigned={teamName => {
          alert(`Dispatched ${teamName} to ${req.id}`);
          navigate('/coordinator');
        }}
      />
    </div>
  );
};
