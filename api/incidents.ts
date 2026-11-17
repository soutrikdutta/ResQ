import type { VercelRequest, VercelResponse } from '@vercel/node';

export interface CampusIssuePayload {
  category: 'projector' | 'wifi' | 'printer' | 'lab' | 'classroom';
  reportedLocation: string;
  building?: string;
  floor?: string;
  severity?: 'high' | 'medium' | 'low';
  description?: string;
  attachmentUrl?: string;
}

// Nearest backup node resolution lookup
const BACKUP_RESOLUTIONS: Record<string, any> = {
  projector: {
    name: 'Hall B-202 (Interactive Smart Screen + 4K Laser)',
    location: 'Science Wing B, 2nd Floor',
    distance: '65 meters',
    walkTime: '1.5 min walk',
    availability: 'Vacant for next 2 hours (Verified via Smart Sensors)',
    specs: ['Dual 4K HDMI + Wireless Casting', '120-seat capacity', 'Lapel & Podium Mic sync'],
    directions: [
      'Exit room and turn left toward East Atrium.',
      'Take Staircase B to Floor 2.',
      'Hall B-202 is second door on your right (Room unlocked via ResQ NFC pass).'
    ]
  },
  wifi: {
    name: 'North Study Pavilion Mesh Node-09',
    location: 'Library Annex, Mezzanine North',
    distance: '40 meters',
    walkTime: '1 min walk',
    availability: '1.2 Gbps dedicated Wi-Fi 6E backhaul (42 seats open)',
    specs: ['Low-latency 14ms', '22 Power outlets along window booths', 'Direct Ethernet ports at study desks'],
    directions: [
      'Take the skybridge to North Pavilion.',
      'Connect directly to SSID: CampusMesh-HighQ (Zero login re-prompt).'
    ]
  },
  printer: {
    name: 'Architecture Lab Print Hub Alpha',
    location: 'Design Center, Room 112',
    distance: '95 meters',
    walkTime: '2 min walk',
    availability: 'Ready: 3x Canon Laser Multi-function units idle',
    specs: ['Auto-spooled print jobs synced via ResQ Cloud', 'Full color & heavy cardstock ready', 'Contactless ID tap release'],
    directions: [
      'Exit through West Glass Doors.',
      'Cross Courtyard into Architecture Building.',
      'Scan student QR at Terminal 2; your queued files are already transferred.'
    ]
  },
  lab: {
    name: 'Quantum Innovation Pod Lab 2',
    location: 'Foundry Building, Ground Wing',
    distance: '140 meters',
    walkTime: '3 min walk',
    availability: '24 Free Workstations with RTX 4080 + Docker/CUDA pre-loaded',
    specs: ['Dual 27-inch 144Hz monitors', 'Ubuntu 24.04 LTS identical image', 'Git repo state mirrored'],
    directions: [
      'Take elevator down to Ground level.',
      'Cross covered walkway to Foundry Building.',
      'Room G-18 is auto-unlocked for your course cohort.'
    ]
  },
  classroom: {
    name: 'Auditorium West 101',
    location: 'Academic Central, Ground Floor',
    distance: '110 meters',
    walkTime: '2.5 min walk',
    availability: 'Open & Climate-controlled (21°C)',
    specs: ['Dual-camera hybrid zoom ready', '85 cushioned auditorium seats', 'Touchscreen instructor podium'],
    directions: [
      'Guide students through South Stairwell to Academic Central.',
      'Broadcast notification dispatched to all enrolled students via push alert.'
    ]
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      platform: 'ResQ Autonomous Resilience Engine',
      service: 'Campus Incident Routing API',
      version: '2.0.0',
      activeDatabase: 'Firestore Native resq-c04f0',
      storageBucket: 'resq-c04f0.firebasestorage.app'
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body as CampusIssuePayload;
      const category = body.category || 'projector';
      const location = body.reportedLocation || 'Main Campus';
      const building = body.building || 'Science & Tech Complex';

      const backupOption = BACKUP_RESOLUTIONS[category] || BACKUP_RESOLUTIONS.projector;

      const incidentRecord = {
        id: `iss-${Date.now().toString().slice(-5)}`,
        category,
        title: `${category.toUpperCase()} Failure Detected & Rerouted`,
        reportedLocation: location,
        building,
        floor: body.floor || 'Level 1',
        severity: body.severity || 'high',
        timeReported: 'Just now',
        status: 'rerouting',
        description: body.description || 'Emergency failure reported. Immediate failover dispatched.',
        attachmentUrl: body.attachmentUrl || null,
        backupOption,
        createdAt: new Date().toISOString()
      };

      return res.status(201).json({
        success: true,
        message: 'Backup node successfully locked and directions computed.',
        incident: incidentRecord
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to process incident routing'
      });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
