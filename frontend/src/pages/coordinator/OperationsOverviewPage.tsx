import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidFlow } from '../../context/AidFlowContext';
import { SeverityBadge } from '../../components/SeverityBadge';
import { Download, AlertTriangle } from 'lucide-react';

export const OperationsOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { requests, overrideLogs } = useAidFlow();

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = 'ID,Town,Need,Status,ModelSeverity,AssignedSeverity,OverrideReason\n';
    const rows = requests
      .map(
        r =>
          `"${r.id}","${r.town}","${r.needType}","${r.status}","${r.modelSeverity}","${r.assignedSeverity}","${r.overrideReason || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aidflow-operations-log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const oldestUntouched = [
    { id: 'Request-31', need: 'Shelter', town: 'Westfield', waitTime: '2 h 14 min', severity: 'S3' },
    { id: 'Request-29', need: 'Debris', town: 'Carmel', waitTime: '1 h 58 min', severity: 'S4' },
    { id: 'Request-33', need: 'Food and Water', town: 'Carmel', waitTime: '1 h 40 min', severity: 'Unscored' },
    { id: 'Request-36', need: 'Shelter', town: 'Westfield', waitTime: '1 h 22 min', severity: 'S3' },
  ];

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2.6rem', lineHeight: 1 }}>Operations Overview</h1>

        <button
          onClick={handleExportCSV}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1.15rem',
            borderRadius: '8px',
            border: '1.5px solid #16202a',
            backgroundColor: '#ffffff',
            fontWeight: 700,
            fontSize: '0.85rem',
            color: '#16202a',
            transition: 'all 0.15s ease',
          }}
        >
          <Download size={14} />
          <span>Export log (CSV)</span>
        </button>
      </div>

      {/* 4 KPI Cards matching screenshot */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1dcce', padding: '1.25rem 1.5rem' }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3.2rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            31
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#16212c', marginTop: '0.35rem' }}>
            New
          </div>
          <div style={{ fontSize: '0.78rem', color: '#68737d' }}>
            Not yet assigned
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1dcce', padding: '1.25rem 1.5rem' }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3.2rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            11
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#16212c', marginTop: '0.35rem' }}>
            Assigned
          </div>
          <div style={{ fontSize: '0.78rem', color: '#68737d' }}>
            Team picked, not started
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1dcce', padding: '1.25rem 1.5rem' }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3.2rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            18
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#16212c', marginTop: '0.35rem' }}>
            In Progress
          </div>
          <div style={{ fontSize: '0.78rem', color: '#68737d' }}>
            Team en route or on site
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e1dcce', padding: '1.25rem 1.5rem' }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: '3.2rem', fontWeight: 800, lineHeight: 1, color: '#16212c' }}>
            27
          </div>
          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#16212c', marginTop: '0.35rem' }}>
            Resolved
          </div>
          <div style={{ fontSize: '0.78rem', color: '#68737d' }}>
            Since the event opened
          </div>
        </div>
      </div>

      {/* Middle Row: Severity breakdown + Area breakdown + Oldest untouched */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.35fr', gap: '1.25rem', alignItems: 'stretch' }}>
        {/* Open by Severity */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e1dcce', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '1.25rem' }}>Open by severity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { level: 'S1', name: 'Critical', count: 5, color: '#741f17', barWidth: '35%' },
              { level: 'S2', name: 'High', count: 11, color: '#d65b2d', barWidth: '78%' },
              { level: 'S3', name: 'Moderate', count: 14, color: '#e8b776', barWidth: '100%' },
              { level: 'S4', name: 'Low', count: 7, color: '#b4bdc6', barWidth: '50%' },
              { level: 'Unscored', name: 'Unscored', count: 5, color: '#7b7264', dashed: true, barWidth: '35%' },
            ].map(item => (
              <div key={item.level} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div style={{ width: '90px' }}>
                  <SeverityBadge level={item.level as any} size="sm" />
                </div>
                <div style={{ flex: 1, height: '10px', backgroundColor: '#efebe2', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: item.barWidth,
                      height: '100%',
                      backgroundColor: item.color,
                      border: item.dashed ? '1px dashed #595044' : 'none',
                      borderRadius: '999px',
                    }}
                  />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', minWidth: '18px', textAlign: 'right' }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open by Area */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e1dcce', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '1.25rem' }}>Open by area</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { town: 'Carmel', count: 14, barWidth: '100%', color: '#2d404e' },
              { town: 'Westfield', count: 13, barWidth: '92%', color: '#2d404e' },
              { town: 'Noblesville', count: 9, barWidth: '64%', color: '#2d404e' },
              { town: 'Fishers', count: 6, barWidth: '42%', color: '#d65b2d', isAlert: true },
              { town: 'Cicero', count: 0, barWidth: '0%', color: '#ded9ce' },
              { town: 'Sheridan', count: 0, barWidth: '0%', color: '#ded9ce' },
              { town: 'Arcadia', count: 0, barWidth: '0%', color: '#ded9ce' },
            ].map(item => (
              <div key={item.town} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <span style={{ width: '90px', fontSize: '0.88rem', fontWeight: item.isAlert ? 700 : 500, color: item.isAlert ? '#c44d25' : '#16212c' }}>
                  {item.town}
                </span>
                <div style={{ flex: 1, height: '10px', backgroundColor: '#efebe2', borderRadius: '999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: item.barWidth,
                      height: '100%',
                      backgroundColor: item.color,
                      borderRadius: '999px',
                    }}
                  />
                </div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', minWidth: '18px', textAlign: 'right', color: item.isAlert ? '#c44d25' : '#16212c' }}>
                  {item.count}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#c44d25', fontWeight: 600 }}>
            Fishers has 0 volunteers.{' '}
            <button onClick={() => navigate('/coordinator/map')} style={{ color: '#c44d25', textDecoration: 'underline', fontWeight: 700 }}>
              See map
            </button>
          </div>
        </div>

        {/* Oldest Untouched Requests */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e1dcce', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.65rem', marginBottom: '1.25rem' }}>Oldest untouched requests</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {oldestUntouched.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: '#fbfaf7',
                  border: '1px solid #ede8de',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <SeverityBadge level={item.severity as any} size="sm" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#16212c' }}>
                      {item.id}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#68727d' }}>
                      {item.need} · {item.town}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3d4651' }}>
                    {item.waitTime}
                  </span>
                  <button
                    onClick={() => navigate(`/coordinator/review/${item.id}`)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      border: '1.5px solid #16202a',
                      backgroundColor: '#ffffff',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#16202a',
                    }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Severity Overrides Audit Log matching screenshot 11 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '14px',
          border: '1px solid #e1dcce',
          padding: '1.5rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
        }}
      >
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.75rem', lineHeight: 1.1 }}>
            Severity overrides
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#68727d', marginTop: '0.2rem' }}>
            Every time a coordinator changes the model's rating
          </p>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee8dd', color: '#7a848e', fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>WHO</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>WHEN</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>REQUEST</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>FROM → TO</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>REASON</th>
              </tr>
            </thead>
            <tbody>
              {overrideLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #f4f0e6' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: '#16202a',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {log.initials}
                      </div>
                      <span style={{ fontWeight: 600, color: '#16202a' }}>{log.who}</span>
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 1rem', color: '#56606a' }}>
                    {log.when}
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      onClick={() => navigate(`/coordinator/review/${log.requestId}`)}
                      style={{ color: '#c44d25', textDecoration: 'underline', fontWeight: 700 }}
                    >
                      {log.requestId}
                    </button>
                  </td>

                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <SeverityBadge level={log.from} size="sm" />
                      <span style={{ color: '#7a848e', fontWeight: 700 }}>→</span>
                      <SeverityBadge level={log.to} size="sm" />
                    </div>
                  </td>

                  <td style={{ padding: '0.85rem 1rem', color: '#2d3742', maxWidth: '380px' }}>
                    {log.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
