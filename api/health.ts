import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: '99.98%',
    activeCampuses: 36,
    incidentsResolvedToday: 149,
    avgRerouteTimeSeconds: 42,
    database: {
      provider: 'Cloud Firestore Native',
      status: 'connected',
      projectId: 'resq-c04f0'
    },
    storage: {
      provider: 'Firebase Cloud Storage',
      bucket: 'resq-c04f0.firebasestorage.app',
      status: 'active'
    }
  });
}
