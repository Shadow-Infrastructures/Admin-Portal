import { useState } from 'react';
import {
  ChevronRight, ChevronDown, ShieldCheck, Lock, Eye, EyeOff,
  Check, Minus, X, Users as UsersIcon,
} from 'lucide-react';
import { Card, SectionHeader } from '@/components/ui';
import {
  permissionTree, roleMatrix,
  type PermissionNode, type PermissionState,
} from '@/data';

function PermIcon({ state }: { state: PermissionState }) {
  if (state === 'full')       return <Check className="w-4 h-4 text-brand-teal" />;
  if (state === 'read-only')  return <Eye className="w-4 h-4 text-amber-500" />;
  return <X className="w-4 h-4 text-gray-300" />;
}

function PermCell({ state }: { state: PermissionState }) {
  const bg = state === 'full' ? 'bg-brand-teal/5' : state === 'read-only' ? 'bg-amber-50' : '';
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-lg mx-auto ${bg}`}>
      <PermIcon state={state} />
    </div>
  );
}

function TreeRow({ node, depth }: { node: PermissionNode; depth: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <div
        className={`flex items-center gap-2 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${depth === 0 ? 'font-semibold text-brand-charcoal' : 'text-gray-600'}`}
        style={{ paddingLeft: `${depth * 24 + 12}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        ) : (
          <span className="w-4 h-4 shrink-0" />
        )}
        {depth === 0 ? (
          <ShieldCheck className="w-4 h-4 text-brand-dark shrink-0" />
        ) : (
          <Lock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <span className="text-sm">{node.label}</span>
          {depth === 0 && <span className="text-xs text-gray-400 ml-2 hidden sm:inline">— {node.description}</span>}
        </div>
        {depth > 0 && (
          <span className="text-xs text-gray-400 hidden md:block truncate max-w-[200px]">{node.description}</span>
        )}
      </div>
      {hasChildren && expanded && node.children!.map((child) => (
        <TreeRow key={child.key} node={child} depth={depth + 1} />
      ))}
    </>
  );
}

export function PermissionsPage() {
  const allPerms = permissionTree.flatMap(p => p.children ?? []).map(c => c.key);

  return (
    <div className="space-y-5">
      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {roleMatrix.map((rm) => {
          const fullCount = Object.values(rm.permissions).filter(v => v === 'full').length;
          const roCount = Object.values(rm.permissions).filter(v => v === 'read-only').length;
          return (
            <Card key={rm.role} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand-dark/10 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-brand-dark" />
                </div>
                <div>
                  <p className="font-semibold text-brand-charcoal text-sm">{rm.role}</p>
                  <p className="text-xs text-gray-400">{fullCount + roCount} permissions</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{rm.description}</p>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1 text-brand-teal"><Check className="w-3.5 h-3.5" /> {fullCount} full</span>
                <span className="flex items-center gap-1 text-amber-500"><Eye className="w-3.5 h-3.5" /> {roCount} read</span>
                <span className="flex items-center gap-1 text-gray-400"><X className="w-3.5 h-3.5" /> {allPerms.length - fullCount - roCount} none</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Permission Tree */}
      <Card className="p-5">
        <SectionHeader title="Permission Tree" action={<span className="text-xs text-gray-400">{allPerms.length} permissions across {permissionTree.length} modules</span>} />
        <div className="space-y-0.5">
          {permissionTree.map((node) => (
            <TreeRow key={node.key} node={node} depth={0} />
          ))}
        </div>
      </Card>

      {/* Role-Permission Matrix */}
      <Card className="overflow-hidden">
        <div className="p-5 pb-3">
          <SectionHeader title="Role-Permission Matrix" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-100">
                <th className="px-5 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-left sticky left-0 bg-gray-50 min-w-[220px]">Permission</th>
                {roleMatrix.map((rm) => (
                  <th key={rm.role} className="px-3 py-3 font-semibold text-gray-500 uppercase text-xs tracking-wider text-center min-w-[120px]">
                    {rm.role}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {permissionTree.map((module) => (
                <>
                  <tr key={module.key} className="bg-gray-50/50">
                    <td colSpan={roleMatrix.length + 1} className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-dark">
                      {module.label}
                    </td>
                  </tr>
                  {module.children?.map((perm) => (
                    <tr key={perm.key} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 text-gray-600 sticky left-0 bg-brand-white">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-gray-300" />
                          <div>
                            <span className="text-sm">{perm.label}</span>
                            <span className="block text-xs text-gray-400">{perm.description}</span>
                          </div>
                        </div>
                      </td>
                      {roleMatrix.map((rm) => (
                        <td key={rm.role} className="px-3 py-3">
                          <PermCell state={rm.permissions[perm.key] ?? 'none'} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-6 px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-brand-teal" /> Full Access</span>
          <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-amber-500" /> Read Only</span>
          <span className="flex items-center gap-1.5"><X className="w-4 h-4 text-gray-300" /> No Access</span>
        </div>
      </Card>
    </div>
  );
}
