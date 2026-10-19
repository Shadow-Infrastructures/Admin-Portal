import { FileText, Download, Calendar, Filter, BarChart3, PieChart, FileSpreadsheet, TrendingUp } from 'lucide-react';
import { Card, SectionHeader, GhostButton, PrimaryButton } from '@/components/ui';

const reportTemplates = [
  { title: 'Loan Portfolio Summary', desc: 'All active loans with rates, terms, and LTV ratios',     icon: FileText,       type: 'PDF' },
  { title: 'Property Valuation Report',desc: 'Current estimated values and price trends by area',     icon: BarChart3,      type: 'PDF' },
  { title: 'User Activity Report',   desc: 'Registration, login frequency, and engagement metrics',  icon: PieChart,       type: 'Excel' },
  { title: 'Lender Performance',     desc: 'Loan volume, average rates, and approval rates by lender',icon: FileSpreadsheet,type: 'Excel' },
  { title: 'Monthly Operations',     desc: 'Platform-wide KPIs and month-over-month comparisons',     icon: Calendar,       type: 'PDF' },
  { title: 'Price Movement Analysis',desc: 'Detailed breakdown of property price changes by region',  icon: TrendingUp,     type: 'PDF' },
];

export function ReportsPage() {
  return (
    <div className="space-y-5">
      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-teal/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-charcoal">48</p>
              <p className="text-xs text-gray-500">Reports Generated</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-dark/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-brand-dark" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-charcoal">12</p>
              <p className="text-xs text-gray-500">This Month</p>
            </div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-brand-teal/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-brand-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-charcoal">156</p>
              <p className="text-xs text-gray-500">Total Downloads</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Report builder */}
      <Card className="p-5">
        <SectionHeader title="Generate Report" />
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Report Type</label>
            <select className="w-full px-3 py-2 rounded-lg bg-gray-100 text-sm text-brand-charcoal border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all">
              <option>Loan Portfolio Summary</option>
              <option>Property Valuation Report</option>
              <option>User Activity Report</option>
              <option>Lender Performance</option>
              <option>Monthly Operations</option>
              <option>Price Movement Analysis</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Date Range</label>
            <select className="w-full px-3 py-2 rounded-lg bg-gray-100 text-sm text-brand-charcoal border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>Year to date</option>
              <option>All time</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Format</label>
            <select className="w-full px-3 py-2 rounded-lg bg-gray-100 text-sm text-brand-charcoal border border-transparent focus:border-brand-teal focus:bg-white focus:outline-none transition-all">
              <option>PDF</option>
              <option>Excel (.xlsx)</option>
              <option>CSV</option>
            </select>
          </div>
          <div className="flex items-end">
            <PrimaryButton onClick={() => {}}><span className="flex items-center gap-1.5"><Filter className="w-4 h-4" /> Generate</span></PrimaryButton>
          </div>
        </div>
      </Card>

      {/* Report templates */}
      <div>
        <h2 className="text-base font-semibold text-brand-charcoal mb-4">Available Report Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {reportTemplates.map((r) => (
            <Card key={r.title} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-lg bg-brand-dark/10 flex items-center justify-center shrink-0">
                  <r.icon className="w-5 h-5 text-brand-dark" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-brand-charcoal">{r.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-400">{r.type}</span>
                <GhostButton onClick={() => {}}><span className="flex items-center gap-1.5"><Download className="w-4 h-4" /> Download</span></GhostButton>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


