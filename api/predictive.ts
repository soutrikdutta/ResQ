import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      predictions: [
        {
          id: 'pred-1',
          facility: 'Science Hall Projectors (Rooms 201-208)',
          predictedIssue: 'Laser Diode / Bulb Overheat Risk during peak lectures',
          riskScore: 89,
          timeWindow: 'Next 45 mins',
          preEmptiveAction: 'Pre-reserved secondary Smart Display suites in Block D; cached lecture slides to podium tablet.',
          confidence: 94
        },
        {
          id: 'pred-2',
          facility: 'East Wing Wi-Fi Access Points',
          predictedIssue: 'Spectrum Saturation & DHCP Starvation',
          riskScore: 78,
          timeWindow: 'Next 25 mins',
          preEmptiveAction: 'Dynamic load-balancing pre-spinning Wi-Fi 6 micro-cells.',
          confidence: 91
        },
        {
          id: 'pred-3',
          facility: 'Central Library Heavy Printers (Floor 1 & 2)',
          predictedIssue: 'Toner & Feed Roller Exhaustion prior to deadline',
          riskScore: 84,
          timeWindow: 'Next 1.5 hours',
          preEmptiveAction: 'Rerouting student print spool queue to Auxiliary Printing Stations in Dorm Commons.',
          confidence: 88
        }
      ]
    });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
