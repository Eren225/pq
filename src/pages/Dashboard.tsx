import { useEffect, useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { dashboardMockService } from '../services/dashboardMockService';
import type { DashboardState, RoommateId } from '../types/dashboard';

const defaultUserId: RoommateId = 'elie';

export default function Dashboard() {
  const [selectedUserId, setSelectedUserId] = useState<RoommateId>(defaultUserId);
  const [password, setPassword] = useState('');
  const [state, setState] = useState<DashboardState | null>(null);

  useEffect(() => {
    dashboardMockService.getState(selectedUserId).then(setState);
  }, [selectedUserId]);

  if (!state) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-6 text-center text-on-surface">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary">PQ Counter</p>
          <h1 className="mt-3 text-3xl font-black">Chargement de la maquette…</h1>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      onPasswordChange={setPassword}
      onUserChange={setSelectedUserId}
      password={password}
      selectedUserId={selectedUserId}
      state={state}
    />
  );
}
