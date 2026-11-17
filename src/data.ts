import { CampusIssue, PredictiveAlert, CampusStats } from './types';

export const INITIAL_ISSUES: CampusIssue[] = [
  {
    id: 'iss-1',
    category: 'projector',
    title: 'HDMI Output & Lamp Failure',
    reportedLocation: 'Hall C-104 (Lecture Hall 2)',
    building: 'Science & Tech Complex',
    floor: '1st Floor',
    severity: 'high',
    timeReported: '3 mins ago',
    status: 'rerouting',
    description: 'Projector blinks amber with lamp error right before CS302 presentation. 48 students waiting.',
    backupOption: {
      name: 'Hall B-202 (Interactive Smart Screen + 4K Laser)',
      location: 'Science Wing B, 2nd Floor',
      distance: '65 meters',
      walkTime: '1.5 min walk',
      availability: 'Vacant for next 2 hours (Verified via Smart Sensors)',
      specs: ['Dual 4K HDMI + Wireless Casting', '120-seat capacity', 'Lapel & Podium Mic sync'],
      directions: [
        'Exit Hall C-104 and turn left toward East Atrium.',
        'Take Staircase B to Floor 2.',
        'Hall B-202 is second door on your right (Room unlocked via ResQ NFC pass).'
      ]
    }
  },
  {
    id: 'iss-2',
    category: 'wifi',
    title: 'AP Packet Drop & DNS Blackout',
    reportedLocation: 'Engineering Library Level 3',
    building: 'Main Campus Library',
    floor: '3rd Floor Quiet Zone',
    severity: 'high',
    timeReported: '7 mins ago',
    status: 'rerouting',
    description: 'Access Point AP-LIB-302 experiencing 94% packet loss. Exam submissions blocked.',
    backupOption: {
      name: 'North Study Pavilion Mesh Node-09',
      location: 'Library Annex, Mezzanine North',
      distance: '40 meters',
      walkTime: '1 min walk',
      availability: '1.2 Gbps dedicated Wi-Fi 6E backhaul (42 seats open)',
      specs: ['Low-latency 14ms', '22 Power outlets along window booths', 'Direct Ethernet ports at study desks'],
      directions: [
        'Take the skybridge from Level 3 to North Pavilion.',
        'Connect directly to SSID: CampusMesh-HighQ (Zero login re-prompt).'
      ]
    }
  },
  {
    id: 'iss-3',
    category: 'printer',
    title: 'Paper Jam & Toner Depleted',
    reportedLocation: 'Student Union Print Hub A',
    building: 'Student Life Pavilion',
    floor: 'Ground Floor',
    severity: 'medium',
    timeReported: '12 mins ago',
    status: 'rerouting',
    description: 'High-speed printer jammed with duplex gear error. Queue of 14 students with assignments due.',
    backupOption: {
      name: 'Architecture Lab Print Hub Alpha',
      location: 'Design Center, Room 112',
      distance: '95 meters',
      walkTime: '2 min walk',
      availability: 'Ready: 3x Canon Laser Multi-function units idle',
      specs: ['Auto-spooled print jobs synced via ResQ Cloud', 'Full color & heavy cardstock ready', 'Contactless ID tap release'],
      directions: [
        'Exit Student Union through West Glass Doors.',
        'Cross Courtyard into Architecture Building.',
        'Scan student QR at Terminal 2; your queued files are already transferred.'
      ]
    }
  },
  {
    id: 'iss-4',
    category: 'lab',
    title: 'Linux Lab Overbooked & GPU Grid Full',
    reportedLocation: 'Turing Computer Lab 4',
    building: 'Computing Sciences Tower',
    floor: '4th Floor',
    severity: 'medium',
    timeReported: '18 mins ago',
    status: 'rerouting',
    description: 'Unscheduled robotics workshop occupying all 32 RTX workstations. Lab session displaced.',
    backupOption: {
      name: 'Quantum Innovation Pod Lab 2',
      location: 'Foundry Building, Ground Wing',
      distance: '140 meters',
      walkTime: '3 min walk',
      availability: '24 Free Workstations with RTX 4080 + Docker/CUDA pre-loaded',
      specs: ['Dual 27-inch 144Hz monitors', 'Ubuntu 24.04 LTS identical image', 'Git repo state mirrored'],
      directions: [
        'Take Turing elevator down to G level.',
        'Cross covered walkway to Foundry Building.',
        'Room G-18 is auto-unlocked for your course cohort.'
      ]
    }
  },
  {
    id: 'iss-5',
    category: 'classroom',
    title: 'Sudden AC Flood & Power Cut',
    reportedLocation: 'Room 305 (Macroeconomics Seminar)',
    building: 'Humanities & Social Hall',
    floor: '3rd Floor',
    severity: 'high',
    timeReported: '22 mins ago',
    status: 'rerouting',
    description: 'Overhead AC condensate drip flooded lectern. Safety breaker tripped.',
    backupOption: {
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
  }
];

export const PREDICTIVE_ALERTS: PredictiveAlert[] = [
  {
    id: 'pred-1',
    facility: 'Science Hall Projectors (Rooms 201-208)',
    predictedIssue: 'Laser Diode / Bulb Overheat Risk during 2:00 PM peak lectures',
    riskScore: 89,
    timeWindow: 'Next 45 mins (Est. 13:45 - 14:30)',
    preEmptiveAction: 'Automatically reserved secondary Smart Display suites in Block D; cached lecture slides to podium tablet.',
    confidence: 94,
    triggerFactor: 'Thermal sensor telemetry shows 78°C + continuous 6-hour runtime pattern.'
  },
  {
    id: 'pred-2',
    facility: 'East Wing Wi-Fi Access Points',
    predictedIssue: 'Spectrum Saturation & DHCP Starvation during midterm interval',
    riskScore: 78,
    timeWindow: 'Next 25 mins',
    preEmptiveAction: 'Dynamic load-balancing pre-spinning Wi-Fi 6 micro-cells and offloading non-academic traffic.',
    confidence: 91,
    triggerFactor: 'Classroom schedule ingest indicates 620 students transitioning between lectures.'
  },
  {
    id: 'pred-3',
    facility: 'Central Library Heavy Printers (Floor 1 & 2)',
    predictedIssue: 'Toner & Feed Roller Exhaustion prior to 5:00 PM submission deadline',
    riskScore: 84,
    timeWindow: 'Next 1.5 hours',
    preEmptiveAction: 'Rerouting student print spool queue to Auxiliary Printing Stations in Dorm Commons.',
    confidence: 88,
    triggerFactor: '3,400 pages spooled in last 20 minutes across 4 course modules.'
  }
];

export const PLATFORM_STATS: CampusStats = {
  issuesResolvedToday: 148,
  avgRerouteTimeSeconds: 42,
  uptimePreservedPercentage: 99.4,
  activeCampuses: 36
};
