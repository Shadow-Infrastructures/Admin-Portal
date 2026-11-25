// ─────────────────────────────────────────────────────────────
// Treehouse Admin Portal — Static Prototype Data
// Treehouse connects and digitalizes refinance/financing between
// Banks and Property Owners. We do NOT manage money transfers.
// ─────────────────────────────────────────────────────────────

export const PAGE_NAMES = [
  'dashboard',
  'properties',
  'loans',
  'priceTracking',
  'users',
  'lenders',
  'bankAccounts',
  'permissions',
  'auditLogs',
  'reports',
  'settings',
];

export const navItems = [
  { id: 'dashboard',     label: 'Dashboard',       icon: 'LayoutDashboard' },
  { id: 'properties',    label: 'Properties',      icon: 'Home' },
  { id: 'loans',         label: 'Loans',           icon: 'Landmark' },
  { id: 'priceTracking', label: 'Price Tracking',  icon: 'TrendingUp' },
  { id: 'users',         label: 'Users',           icon: 'Users' },
  { id: 'lenders',       label: 'Lenders',         icon: 'Building2' },
  { id: 'bankAccounts',  label: 'Bank Accounts',   icon: 'Wallet' },
  { id: 'permissions',   label: 'Permissions',     icon: 'ShieldCheck' },
  { id: 'auditLogs',     label: 'Audit Logs',      icon: 'ScrollText' },
  { id: 'reports',       label: 'Reports',         icon: 'FileText' },
  { id: 'settings',      label: 'Settings',        icon: 'Settings' },
];

// null = always accessible (dashboard, settings)
export const pagePermissions = {
  dashboard:     null,
  properties:    'properties.view',
  loans:         'loans.view',
  priceTracking: 'properties.view',
  users:         'users.view',
  lenders:       'lenders.view',
  bankAccounts:  'bankAccounts.view',
  permissions:   'permissions.view',
  auditLogs:     'auditLogs.view',
  reports:       null,
  settings:      null,
};

export const pageTitles = {
  dashboard:     { title: 'Dashboard',       subtitle: 'Overview of platform activity and key metrics' },
  properties:    { title: 'Properties',      subtitle: 'Manage and monitor all registered properties' },
  loans:         { title: 'Loans',           subtitle: 'Refinance and financing applications between banks and owners' },
  priceTracking: { title: 'Price Tracking',  subtitle: 'Monitor property value changes over time' },
  users:         { title: 'Users',           subtitle: 'Manage user accounts and permissions' },
  lenders:       { title: 'Lenders',         subtitle: 'View and manage bank and lending partners' },
  bankAccounts:  { title: 'Bank Accounts',   subtitle: 'Linked bank accounts for owners and lenders' },
  permissions:   { title: 'Permissions',     subtitle: 'PBAC roles and permission tree configuration' },
  auditLogs:     { title: 'Audit Logs',      subtitle: 'Immutable audit trail of all platform actions' },
  reports:       { title: 'Reports',         subtitle: 'Generate and export platform analytics' },
  settings:      { title: 'Settings',        subtitle: 'Configure portal preferences and policies' },
};

// ── Admin User (PBAC simulation) ───────────────────────
export const ADMIN_ROLES = ['Super Admin', 'Admin', 'Compliance Officer', 'Loan Officer'];

export const currentAdmin = {
  name: 'Emily Rodriguez',
  email: 'emily.r@treehouse.com',
  role: 'Super Admin',
  avatar: 'ER',
};

export const adminProfiles = {
  'Super Admin':        { name: 'Emily Rodriguez',  email: 'emily.r@treehouse.com',  role: 'Super Admin',        avatar: 'ER' },
  'Admin':              { name: 'Linda Park',        email: 'linda.p@treehouse.com',  role: 'Admin',              avatar: 'LP' },
  'Compliance Officer': { name: 'Marcus Webb',       email: 'marcus.w@treehouse.com', role: 'Compliance Officer', avatar: 'MW' },
  'Loan Officer':       { name: 'Sarah Johnson',     email: 'sarah.j@treehouse.com',  role: 'Loan Officer',       avatar: 'SJ' },
};

// ── Permission Tree ──────────────────────────────────
export const permissionTree = [
  {
    key: 'properties',
    label: 'Properties',
    description: 'Manage property listings and valuations',
    children: [
      { key: 'properties.view',      label: 'View Properties',       description: 'Browse and search property listings' },
      { key: 'properties.create',    label: 'Create Property',       description: 'Add new property to the platform' },
      { key: 'properties.edit',      label: 'Edit Property',         description: 'Update property details and valuation' },
      { key: 'properties.delete',    label: 'Delete Property',       description: 'Remove property from platform' },
      { key: 'properties.appraise',  label: 'Appraise Property',     description: 'Set and update estimated property value' },
    ],
  },
  {
    key: 'loans',
    label: 'Loans',
    description: 'Manage refinance and financing applications between banks and property owners',
    children: [
      { key: 'loans.view',      label: 'View Loans',       description: 'Browse and search loan records' },
      { key: 'loans.create',    label: 'Create Loan',      description: 'Initiate a new financing application' },
      { key: 'loans.review',    label: 'Review Loan',      description: 'Underwrite and review applications' },
      { key: 'loans.approve',   label: 'Approve / Reject', description: 'Final approval or rejection of loans' },
      { key: 'loans.disburse',  label: 'Disburse Funds',   description: 'Release loan funds to borrower' },
    ],
  },
  {
    key: 'users',
    label: 'Users',
    description: 'User accounts and profiles',
    children: [
      { key: 'users.view',    label: 'View Users',          description: 'Browse and search user accounts' },
      { key: 'users.create',  label: 'Create User',         description: 'Add new user to the platform' },
      { key: 'users.edit',    label: 'Edit User',           description: 'Update user profile and contact info' },
      { key: 'users.suspend', label: 'Suspend / Reactivate',description: 'Manage user account status' },
      { key: 'users.delete',  label: 'Delete User',         description: 'Permanently remove user account' },
    ],
  },
  {
    key: 'lenders',
    label: 'Lenders',
    description: 'Bank and lending partner management',
    children: [
      { key: 'lenders.view',       label: 'View Lenders',      description: 'Browse lending partners' },
      { key: 'lenders.create',     label: 'Add Lender',        description: 'Onboard a new lending partner' },
      { key: 'lenders.edit',       label: 'Edit Lender',       description: 'Update lender details and rates' },
      { key: 'lenders.deactivate', label: 'Deactivate Lender', description: 'Deactivate lending partner' },
    ],
  },
  {
    key: 'bankAccounts',
    label: 'Bank Accounts',
    description: 'Linked bank accounts for property owners and lenders',
    children: [
      { key: 'bankAccounts.view',   label: 'View Accounts',  description: 'Browse all linked bank accounts' },
      { key: 'bankAccounts.link',   label: 'Link Account',   description: 'Add a new bank account to the platform' },
      { key: 'bankAccounts.edit',   label: 'Edit Account',   description: 'Update account details' },
      { key: 'bankAccounts.verify', label: 'Verify Account', description: 'Verify bank account ownership' },
      { key: 'bankAccounts.freeze', label: 'Freeze / Unfreeze',description: 'Freeze or unfreeze bank accounts' },
    ],
  },
  {
    key: 'permissions',
    label: 'Permissions',
    description: 'PBAC roles and permission assignments',
    children: [
      { key: 'permissions.view',     label: 'View Permissions',     description: 'Browse roles and permission tree' },
      { key: 'permissions.assign',   label: 'Assign Roles',         description: 'Assign or revoke admin roles' },
      { key: 'permissions.editTree', label: 'Edit Permission Tree', description: 'Modify the permission tree structure' },
    ],
  },
  {
    key: 'auditLogs',
    label: 'Audit Logs',
    description: 'Immutable audit trail',
    children: [
      { key: 'auditLogs.view',   label: 'View Audit Logs', description: 'Browse the full audit trail' },
      { key: 'auditLogs.export', label: 'Export Logs',     description: 'Export audit logs for compliance' },
    ],
  },
];

// ── Role-Permission Matrix ──────────────────────────
export const roleMatrix = [
  {
    role: 'Super Admin',
    description: 'Full access to all modules and settings',
    permissions: {
      'properties.view': 'full', 'properties.create': 'full', 'properties.edit': 'full', 'properties.delete': 'full', 'properties.appraise': 'full',
      'loans.view': 'full', 'loans.create': 'full', 'loans.review': 'full', 'loans.approve': 'full', 'loans.disburse': 'full',
      'users.view': 'full', 'users.create': 'full', 'users.edit': 'full', 'users.suspend': 'full', 'users.delete': 'full',
      'lenders.view': 'full', 'lenders.create': 'full', 'lenders.edit': 'full', 'lenders.deactivate': 'full',
      'bankAccounts.view': 'full', 'bankAccounts.link': 'full', 'bankAccounts.edit': 'full', 'bankAccounts.verify': 'full', 'bankAccounts.freeze': 'full',
      'permissions.view': 'full', 'permissions.assign': 'full', 'permissions.editTree': 'full',
      'auditLogs.view': 'full', 'auditLogs.export': 'full',
    },
  },
  {
    role: 'Admin',
    description: 'Manage operations without permission editing',
    permissions: {
      'properties.view': 'full', 'properties.create': 'full', 'properties.edit': 'full', 'properties.delete': 'none', 'properties.appraise': 'full',
      'loans.view': 'full', 'loans.create': 'full', 'loans.review': 'full', 'loans.approve': 'full', 'loans.disburse': 'full',
      'users.view': 'full', 'users.create': 'full', 'users.edit': 'full', 'users.suspend': 'full', 'users.delete': 'none',
      'lenders.view': 'full', 'lenders.create': 'full', 'lenders.edit': 'full', 'lenders.deactivate': 'full',
      'bankAccounts.view': 'full', 'bankAccounts.link': 'full', 'bankAccounts.edit': 'full', 'bankAccounts.verify': 'full', 'bankAccounts.freeze': 'full',
      'permissions.view': 'read-only', 'permissions.assign': 'none', 'permissions.editTree': 'none',
      'auditLogs.view': 'full', 'auditLogs.export': 'full',
    },
  },
  {
    role: 'Compliance Officer',
    description: 'Audit, review, and compliance oversight',
    permissions: {
      'properties.view': 'read-only', 'properties.create': 'none', 'properties.edit': 'none', 'properties.delete': 'none', 'properties.appraise': 'read-only',
      'loans.view': 'full', 'loans.create': 'none', 'loans.review': 'full', 'loans.approve': 'read-only', 'loans.disburse': 'none',
      'users.view': 'full', 'users.create': 'none', 'users.edit': 'none', 'users.suspend': 'read-only', 'users.delete': 'none',
      'lenders.view': 'full', 'lenders.create': 'none', 'lenders.edit': 'none', 'lenders.deactivate': 'read-only',
      'bankAccounts.view': 'full', 'bankAccounts.link': 'none', 'bankAccounts.edit': 'none', 'bankAccounts.verify': 'read-only', 'bankAccounts.freeze': 'read-only',
      'permissions.view': 'read-only', 'permissions.assign': 'none', 'permissions.editTree': 'none',
      'auditLogs.view': 'full', 'auditLogs.export': 'full',
    },
  },
  {
    role: 'Loan Officer',
    description: 'Process loans and manage borrower interactions',
    permissions: {
      'properties.view': 'full', 'properties.create': 'full', 'properties.edit': 'full', 'properties.delete': 'none', 'properties.appraise': 'none',
      'loans.view': 'full', 'loans.create': 'full', 'loans.review': 'full', 'loans.approve': 'none', 'loans.disburse': 'none',
      'users.view': 'full', 'users.create': 'full', 'users.edit': 'full', 'users.suspend': 'none', 'users.delete': 'none',
      'lenders.view': 'full', 'lenders.create': 'none', 'lenders.edit': 'none', 'lenders.deactivate': 'none',
      'bankAccounts.view': 'read-only', 'bankAccounts.link': 'none', 'bankAccounts.edit': 'none', 'bankAccounts.verify': 'none', 'bankAccounts.freeze': 'none',
      'permissions.view': 'none', 'permissions.assign': 'none', 'permissions.editTree': 'none',
      'auditLogs.view': 'read-only', 'auditLogs.export': 'none',
    },
  },
];

// ── Staff & agent teams ─────────────────────────────
export const agentDirectory = {
  'Emily Rodriguez': { role: 'Super Admin',  supervisor: null },
  'Linda Park':      { role: 'Admin',        supervisor: 'Emily Rodriguez' },
  'Marcus Webb':     { role: 'Loan Officer', supervisor: 'Linda Park' },
  'Sarah Johnson':   { role: 'Loan Officer', supervisor: 'Linda Park' },
  'Michael Chen':    { role: 'Agent',        supervisor: 'Sarah Johnson' },
};

// ── Dashboard KPIs ──────────────────────────────────
export const dashboardKPIs = [
  { label: 'Total Properties',    value: '1,284',  change: '+12.4%',  positive: true,  icon: 'Home',       color: 'teal', target: { page: 'properties' } },
  { label: 'Active Loans',        value: '836',    change: '+5.2%',   positive: true,  icon: 'Landmark',   color: 'dark', target: { page: 'loans', filter: 'Active' } },
  { label: 'Total Loan Volume',   value: '$284M',  change: '+8.7%',   positive: true,  icon: 'DollarSign', color: 'teal', target: { page: 'loans' } },
  { label: 'Registered Users',    value: '12,408', change: '+18.9%',  positive: true,  icon: 'Users',      color: 'dark', target: { page: 'users' } },
];

// ── Dashboard Activity Feed ─────────────────────────
export const recentActivity = [
  { id: 1, user: 'Sarah Johnson',   action: 'submitted a loan application',  property: '123 Maple Ave',  time: '5 min ago',  type: 'loan' },
  { id: 2, user: 'Michael Chen',    action: 'registered a new property',     property: '455 Oak St',     time: '22 min ago', type: 'property' },
  { id: 3, user: 'Emily Rodriguez', action: 'approved a $1.2M loan',         property: '789 Pine Rd',    time: '1 hour ago', type: 'loan' },
  { id: 4, user: 'James Wilson',    action: 'updated price for',             property: '321 Cedar Ln',   time: '2 hours ago',type: 'price' },
  { id: 5, user: 'Linda Park',      action: 'linked a new bank account',     property: '—',              time: '3 hours ago',type: 'bank' },
  { id: 6, user: 'Robert Garcia',   action: 'connected Wells Fargo as lender', property: '—',           time: '5 hours ago',type: 'lender' },
];

// ── Properties ──────────────────────────────────────
export const PROPERTY_TYPES = ['HDB', 'Private', 'Commercial'];

export const properties = [
  { id: 'P-1001', address: '123 Maple Ave, Portland, OR',  owner: 'Sarah Johnson',   agent: 'Michael Chen',  type: 'Private',    bedrooms: 3, bathrooms: 2, sqft: 1850, estimatedValue: '$520,000', ltv: '58%', status: 'Active' },
  { id: 'P-1002', address: '455 Oak St, Seattle, WA',      owner: 'Michael Chen',    agent: 'Sarah Johnson', type: 'HDB',        bedrooms: 2, bathrooms: 1, sqft: 1200, estimatedValue: '$410,000', ltv: '45%', status: 'Active' },
  { id: 'P-1003', address: '789 Pine Rd, Denver, CO',      owner: 'Emily Rodriguez', agent: 'Marcus Webb',   type: 'Private',    bedrooms: 4, bathrooms: 3, sqft: 2400, estimatedValue: '$680,000', ltv: '62%', status: 'Pending' },
  { id: 'P-1004', address: '321 Cedar Ln, Austin, TX',     owner: 'James Wilson',    agent: 'Sarah Johnson', type: 'Private',    bedrooms: 5, bathrooms: 4, sqft: 3200, estimatedValue: '$890,000', ltv: '71%', status: 'Under Review' },
  { id: 'P-1005', address: '677 Birch Blvd, Miami, FL',    owner: 'Robert Garcia',   agent: 'Marcus Webb',   type: 'HDB',        bedrooms: 1, bathrooms: 1, sqft: 950,  estimatedValue: '$340,000', ltv: '38%', status: 'Sold' },
  { id: 'P-1006', address: '200 Elm Dr, Chicago, IL',      owner: 'Linda Park',      agent: 'Linda Park',    type: 'Commercial', bedrooms: 6, bathrooms: 4, sqft: 4200, estimatedValue: '$1,200,000', ltv: '55%', status: 'Active' },
  { id: 'P-1007', address: '11 Willow Way, Boston, MA',    owner: 'David Kim',       agent: 'Michael Chen',  type: 'Private',    bedrooms: 3, bathrooms: 2, sqft: 1950, estimatedValue: '$750,000', ltv: '60%', status: 'Active' },
  { id: 'P-1008', address: '88 Spruce Ct, Phoenix, AZ',    owner: 'Anna Lopez',      agent: 'Sarah Johnson', type: 'HDB',        bedrooms: 3, bathrooms: 2, sqft: 2100, estimatedValue: '$430,000', ltv: '48%', status: 'Pending' },
];

// ── Loans ───────────────────────────────────────────
export const LOAN_STATUSES = ['Pending', 'Under Review', 'Approved', 'Rejected', 'Active'];

export const loans = [
  { id: 'L-2001', borrower: 'Sarah Johnson',   property: '123 Maple Ave',  agent: 'Sarah Johnson',  amount: '$310,000', rate: '6.2%', term: '30yr', ltv: '58%', lender: 'Wells Fargo',     status: 'Approved',     submitted: 'Oct 10, 2026', lockOutDate: 'Nov 20, 2026', advisoryDate: 'Oct 25, 2026' },
  { id: 'L-2002', borrower: 'Michael Chen',    property: '455 Oak St',     agent: 'Michael Chen',   amount: '$185,000', rate: '5.8%', term: '15yr', ltv: '45%', lender: 'Bank of America',  status: 'Active',       submitted: 'Oct 08, 2026', lockOutDate: 'Dec 15, 2026', advisoryDate: 'Oct 20, 2026' },
  { id: 'L-2003', borrower: 'Emily Rodriguez', property: '789 Pine Rd',    agent: 'Linda Park',     amount: '$420,000', rate: '6.5%', term: '30yr', ltv: '62%', lender: 'Chase',            status: 'Under Review', submitted: 'Oct 12, 2026', lockOutDate: 'Nov 09, 2026', advisoryDate: 'Oct 28, 2026' },
  { id: 'L-2004', borrower: 'James Wilson',    property: '321 Cedar Ln',   agent: 'Marcus Webb',    amount: '$630,000', rate: '6.8%', term: '30yr', ltv: '71%', lender: 'Quicken Loans',    status: 'Pending',      submitted: 'Oct 14, 2026', lockOutDate: 'Nov 30, 2026', advisoryDate: 'Oct 30, 2026' },
  { id: 'L-2005', borrower: 'Robert Garcia',   property: '677 Birch Blvd', agent: 'Sarah Johnson',  amount: '$130,000', rate: '5.5%', term: '15yr', ltv: '38%', lender: 'Wells Fargo',      status: 'Active',       submitted: 'Oct 05, 2026', lockOutDate: 'Jan 05, 2027', advisoryDate: 'Nov 01, 2026' },
  { id: 'L-2006', borrower: 'Linda Park',      property: '200 Elm Dr',     agent: 'Michael Chen',   amount: '$660,000', rate: '6.3%', term: '25yr', ltv: '55%', lender: 'CitiBank',         status: 'Rejected',     submitted: 'Oct 01, 2026', lockOutDate: 'Nov 01, 2026', advisoryDate: 'Oct 15, 2026' },
  { id: 'L-2007', borrower: 'David Kim',       property: '11 Willow Way',  agent: 'Linda Park',     amount: '$450,000', rate: '6.1%', term: '30yr', ltv: '60%', lender: 'Bank of America',  status: 'Approved',     submitted: 'Oct 11, 2026', lockOutDate: 'Nov 28, 2026', advisoryDate: 'Oct 22, 2026' },
  { id: 'L-2008', borrower: 'Anna Lopez',      property: '88 Spruce Ct',   agent: 'Marcus Webb',    amount: '$210,000', rate: '5.9%', term: '20yr', ltv: '48%', lender: 'Chase',            status: 'Pending',      submitted: 'Oct 15, 2026', lockOutDate: 'Dec 02, 2026', advisoryDate: 'Nov 05, 2026' },
];

// ── Price Tracking ──────────────────────────────────
export const priceRecords = [
  { id: 'PT-01', address: '123 Maple Ave, Portland, OR',  lastPrice: '$495,000', currentPrice: '$520,000', change: '+$25,000',   changePct: '+5.1%',  positive: true,  lastUpdated: 'Oct 14, 2026', area: 'Portland' },
  { id: 'PT-02', address: '455 Oak St, Seattle, WA',      lastPrice: '$425,000', currentPrice: '$410,000', change: '-$15,000',   changePct: '-3.5%',  positive: false, lastUpdated: 'Oct 13, 2026', area: 'Seattle' },
  { id: 'PT-03', address: '789 Pine Rd, Denver, CO',      lastPrice: '$650,000', currentPrice: '$680,000', change: '+$30,000',   changePct: '+4.6%',  positive: true,  lastUpdated: 'Oct 14, 2026', area: 'Denver' },
  { id: 'PT-04', address: '321 Cedar Ln, Austin, TX',     lastPrice: '$850,000', currentPrice: '$890,000', change: '+$40,000',   changePct: '+4.7%',  positive: true,  lastUpdated: 'Oct 15, 2026', area: 'Austin' },
  { id: 'PT-05', address: '677 Birch Blvd, Miami, FL',    lastPrice: '$355,000', currentPrice: '$340,000', change: '-$15,000',   changePct: '-4.2%',  positive: false, lastUpdated: 'Oct 12, 2026', area: 'Miami' },
  { id: 'PT-06', address: '200 Elm Dr, Chicago, IL',      lastPrice: '$1,150,000',currentPrice: '$1,200,000',change: '+$50,000', changePct: '+4.3%',  positive: true,  lastUpdated: 'Oct 15, 2026', area: 'Chicago' },
];

// ── Users ───────────────────────────────────────────
export const EMPLOYEE_ROLES = ['Admin', 'Agent'];

export const users = [
  { id: 'U-001', name: 'Sarah Johnson',   email: 'sarah.j@email.com',     role: 'Borrower',       status: 'Active',    joined: 'Jan 15, 2026', lastLogin: 'Oct 19, 2026', properties: 2 },
  { id: 'U-002', name: 'Michael Chen',    email: 'm.chen@email.com',      role: 'Agent',          status: 'Active',    joined: 'Feb 03, 2026', lastLogin: 'Oct 18, 2026', properties: 12, linkedAccount: '****7013' },
  { id: 'U-003', name: 'Emily Rodriguez', email: 'emily.r@treehouse.com', role: 'Admin',          status: 'Active',    joined: 'Dec 01, 2025', lastLogin: 'Oct 19, 2026', properties: 0, linkedAccount: '****1408' },
  { id: 'U-004', name: 'James Wilson',    email: 'jwilson@email.com',     role: 'Property Owner', status: 'Active',    joined: 'Mar 22, 2026', lastLogin: 'Oct 17, 2026', properties: 3 },
  { id: 'U-005', name: 'Linda Park',      email: 'linda.p@email.com',     role: 'Lender',         status: 'Active',    joined: 'Nov 10, 2025', lastLogin: 'Oct 19, 2026', properties: 0 },
  { id: 'U-006', name: 'Robert Garcia',   email: 'rgarcia@email.com',     role: 'Borrower',       status: 'Inactive',  joined: 'Apr 05, 2026', lastLogin: 'Sep 28, 2026', properties: 1 },
  { id: 'U-007', name: 'David Kim',       email: 'dkim@email.com',        role: 'Property Owner', status: 'Active',    joined: 'May 12, 2026', lastLogin: 'Oct 18, 2026', properties: 8 },
  { id: 'U-008', name: 'Anna Lopez',      email: 'alopez@email.com',      role: 'Borrower',       status: 'Suspended', joined: 'Jun 20, 2026', lastLogin: 'Oct 01, 2026', properties: 1 },
];

// ── Lenders ─────────────────────────────────────────
export const lenders = [
  { id: 'LE-1', name: 'Wells Fargo',     type: 'National Bank', avgRate: '6.1%', activeLoans: 142, totalVolume: '$48.2M',  status: 'Active',   contact: 'lending@wf.com',      bankAccount: '****2230' },
  { id: 'LE-2', name: 'Bank of America', type: 'National Bank', avgRate: '5.9%', activeLoans: 118, totalVolume: '$39.6M',  status: 'Active',   contact: 'mortgages@bofa.com',  bankAccount: '****4401' },
  { id: 'LE-3', name: 'Chase',           type: 'National Bank', avgRate: '6.3%', activeLoans: 95,  totalVolume: '$32.1M',  status: 'Active',   contact: 'loans@chase.com',     bankAccount: '****7765' },
  { id: 'LE-4', name: 'Quicken Loans',   type: 'Online Lender', avgRate: '6.5%', activeLoans: 78,  totalVolume: '$28.4M',  status: 'Active',   contact: 'support@quicken.com', bankAccount: '****8812' },
  { id: 'LE-5', name: 'CitiBank',        type: 'National Bank', avgRate: '6.2%', activeLoans: 64,  totalVolume: '$22.8M',  status: 'Inactive', contact: 'mortgage@citi.com',   bankAccount: '****5599' },
];

export const bankers = [
  { id: 'BK-1', name: 'Daniel Brooks', title: 'Senior Mortgage Banker', email: 'dbrooks@wf.com',     lender: 'Wells Fargo' },
  { id: 'BK-2', name: 'Priya Nair',    title: 'Relationship Manager',   email: 'pnair@bofa.com',     lender: 'Bank of America' },
  { id: 'BK-3', name: 'Tom Alvarez',   title: 'Loan Underwriter',       email: 'talvarez@chase.com', lender: 'Chase' },
  { id: 'BK-4', name: 'Grace Lin',     title: 'Digital Lending Lead',   email: 'glin@quicken.com',   lender: 'Quicken Loans' },
  { id: 'BK-5', name: 'Omar Haddad',   title: 'Mortgage Banker',        email: 'ohaddad@citi.com',   lender: 'CitiBank' },
];

// ── Bank Accounts ───────────────────────────────────
export const bankAccounts = [
  { id: 'BA-01', holder: 'Treehouse Operating',  holderType: 'Treehouse Operating',  bank: 'First National Bank', accountNumber: '****8422', routing: '021000021', balance: '$1,250,000',  status: 'Verified',             linkedDate: 'Jan 01, 2026' },
  { id: 'BA-03', holder: 'Sarah Johnson',        holderType: 'Property Owner',       bank: 'Chase',               accountNumber: '****3092', routing: '026013576', balance: '$85,400',     status: 'Verified',             linkedDate: 'Jan 20, 2026' },
  { id: 'BA-04', holder: 'James Wilson',         holderType: 'Property Owner',       bank: 'Wells Fargo',         accountNumber: '****5523', routing: '121042882', balance: '$142,800',    status: 'Verified',             linkedDate: 'Mar 25, 2026' },
  { id: 'BA-05', holder: 'Wells Fargo',          holderType: 'Lender',               bank: 'Wells Fargo',         accountNumber: '****2230', routing: '121042882', balance: '$48,200,000', status: 'Verified',             linkedDate: 'Nov 12, 2025' },
  { id: 'BA-06', holder: 'CitiBank',             holderType: 'Lender',               bank: 'CitiBank',            accountNumber: '****3344', routing: '021000089', balance: '$22,800,000', status: 'Frozen',               linkedDate: 'Nov 10, 2025' },
  { id: 'BA-07', holder: 'David Kim',            holderType: 'Property Owner',       bank: 'Bank of America',     accountNumber: '****6610', routing: '026009593', balance: '$67,200',     status: 'Pending Verification', linkedDate: 'May 15, 2026' },
  { id: 'BA-08', holder: 'Anna Lopez',           holderType: 'Property Owner',       bank: 'Chase',               accountNumber: '****1192', routing: '026013576', balance: '$12,400',     status: 'Frozen',               linkedDate: 'Jun 22, 2026' },
];

// ── Audit Logs ──────────────────────────────────────
export const auditLogs = [
  { id: 'AL-0001', actor: 'Emily Rodriguez', actorRole: 'Super Admin',  action: 'Approved loan L-2001',         category: 'Loan',          target: 'L-2001',           severity: 'Info',    timestamp: 'Oct 16, 2026 14:35:22', ip: '10.0.1.42',   detail: 'Approved $310,000 loan for Sarah Johnson' },
  { id: 'AL-0003', actor: 'Sarah Johnson',   actorRole: 'Loan Officer', action: 'Submitted loan application',    category: 'Loan',          target: 'L-2008',           severity: 'Info',    timestamp: 'Oct 15, 2026 22:10:05', ip: '73.14.22.108',detail: 'New loan application for $210,000 on 88 Spruce Ct' },
  { id: 'AL-0004', actor: 'James Wilson',    actorRole: 'Loan Officer', action: 'Updated property appraisal',    category: 'Property',      target: 'P-1004',           severity: 'Info',    timestamp: 'Oct 15, 2026 18:44:33', ip: '73.14.22.205',detail: 'Estimated value updated from $850,000 to $890,000' },
  { id: 'AL-0005', actor: 'Emily Rodriguez', actorRole: 'Super Admin',  action: 'Froze bank account',            category: 'Bank Account',  target: 'BA-08',            severity: 'Warning', timestamp: 'Oct 15, 2026 16:20:00', ip: '10.0.1.42',   detail: 'Froze Anna Lopez account ****1192 due to suspicious activity' },
  { id: 'AL-0007', actor: 'Emily Rodriguez', actorRole: 'Super Admin',  action: 'Assigned role to user',         category: 'Permission',    target: 'U-007',            severity: 'Warning', timestamp: 'Oct 14, 2026 11:30:45', ip: '10.0.1.42',   detail: 'Changed David Kim role from Borrower to Property Owner' },
  { id: 'AL-0008', actor: 'Linda Park',      actorRole: 'Admin',        action: 'Added lender',                  category: 'Lender',        target: 'LE-5',             severity: 'Info',    timestamp: 'Oct 14, 2026 10:15:20', ip: '10.0.2.18',   detail: 'Onboarded CitiBank as a lending partner' },
  { id: 'AL-0010', actor: 'Robert Garcia',   actorRole: 'Loan Officer', action: 'Failed login attempt',         category: 'Auth',          target: 'U-006',            severity: 'Warning', timestamp: 'Oct 13, 2026 03:12:55', ip: '192.168.5.99',detail: '3 consecutive failed login attempts — account temporarily locked' },
  { id: 'AL-0011', actor: 'Emily Rodriguez', actorRole: 'Super Admin',  action: 'Updated permission matrix',     category: 'Permission',    target: 'Compliance Officer',severity: 'Warning', timestamp: 'Oct 12, 2026 15:00:00', ip: '10.0.1.42',   detail: 'Granted auditLogs.export to Compliance Officer role' },
  { id: 'AL-0012', actor: 'System',          actorRole: 'Super Admin',  action: 'Scheduled price update',        category: 'Property',      target: 'PT-06',            severity: 'Info',    timestamp: 'Oct 15, 2026 02:00:00', ip: '—',           detail: 'Automated price tracking update for 200 Elm Dr, Chicago' },
];

// ── Bar chart data (Dashboard) ──────────────────────
export const loanVolumeData = [
  { month: 'May',  value: 32 },
  { month: 'Jun',  value: 40 },
  { month: 'Jul',  value: 38 },
  { month: 'Aug',  value: 52 },
  { month: 'Sep',  value: 48 },
  { month: 'Oct',  value: 61 },
];

export const propertyStatusData = [
  { label: 'Active',       count: 842,  color: '#00c0a5' },
  { label: 'Pending',      count: 218,  color: '#0a5b6c' },
  { label: 'Sold',         count: 156,  color: '#5eead4' },
  { label: 'Under Review', count: 68,   color: '#94a3b8' },
];

// ── Financial Summary (Dashboard) ───────────────────
export const financialSummary = [
  { label: 'Active Loan Volume',   value: '$284M',   icon: 'Landmark',   color: 'dark', target: { page: 'loans', filter: 'Active' } },
  { label: 'Platform Fee (MTD)',   value: '$184K',   icon: 'DollarSign', color: 'teal', target: { page: 'loans' } },
  { label: 'Connected Banks',      value: '5',       icon: 'Building2',  color: 'dark', target: { page: 'lenders' } },
  { label: 'Loan Applications',    value: '836',     icon: 'FileText',   color: 'teal', target: { page: 'loans' } },
];
