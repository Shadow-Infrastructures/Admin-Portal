import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import {
  roleMatrix, adminProfiles, currentAdmin as defaultAdmin,
  type AdminRole, type PermissionState,
} from '@/data';

interface PBACContextValue {
  admin: typeof defaultAdmin;
  role: AdminRole;
  permissions: Record<string, PermissionState>;
  hasPermission: (perm: string) => boolean;
  canAccess: (page: string | null) => boolean;
  switchRole: (role: AdminRole) => void;
}

const PBACContext = createContext<PBACContextValue | null>(null);

export function PBACProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AdminRole>(defaultAdmin.role);

  const admin = adminProfiles[role];
  const matrix = roleMatrix.find((rm) => rm.role === role);
  const permissions = matrix?.permissions ?? {};

  const hasPermission = useCallback(
    (perm: string): boolean => {
      const state = permissions[perm];
      return state === 'full' || state === 'read-only';
    },
    [permissions]
  );

  const canAccess = useCallback(
    (page: string | null): boolean => {
      if (page === null) return true;
      return hasPermission(page);
    },
    [hasPermission]
  );

  const switchRole = useCallback((newRole: AdminRole) => {
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
