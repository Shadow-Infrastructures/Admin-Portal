import { createContext, useContext, useState, useCallback } from 'react';
import { roleMatrix, adminProfiles, currentAdmin } from '@/data';

const PBACContext = createContext(null);

export function PBACProvider({ children }) {
  const [role, setRole] = useState(currentAdmin.role);

  const admin = adminProfiles[role];
  const matrix = roleMatrix.find((rm) => rm.role === role);
  const permissions = matrix?.permissions ?? {};

  const hasPermission = useCallback(
    (perm) => {
      const state = permissions[perm];
      return state === 'full' || state === 'read-only';
    },
    [permissions],
  );

  const canAccess = useCallback(
    (page) => {
      if (page === null) return true;
      return hasPermission(page);
    },
    [hasPermission],
  );

  const switchRole = useCallback((newRole) => {
    setRole(newRole);
  }, []);

  return (
    <PBACContext.Provider value={{ admin, role, permissions, hasPermission, canAccess, switchRole }}>
      {children}
    </PBACContext.Provider>
  );
}

export function usePBAC() {
  const ctx = useContext(PBACContext);
  if (!ctx) throw new Error('usePBAC must be used within PBACProvider');
  return ctx;
}
