export interface CampusIssue {
  id: string;
  category: 'projector' | 'wifi' | 'printer' | 'lab' | 'classroom';
  title: string;
  reportedLocation: string;
  building: string;
  floor: string;
  severity: 'high' | 'medium' | 'low';
  timeReported: string;
  status: 'rerouting' | 'resolved' | 'investigating';
  description: string;
  attachmentUrl?: string;
  backupOption: {
    name: string;
    location: string;
    distance: string;
    walkTime: string;
    availability: string;
    specs: string[];
    directions: string[];
  };
}

export interface PredictiveAlert {
  id: string;
  facility: string;
  predictedIssue: string;
  riskScore: number; // 0-100
  timeWindow: string;
  preEmptiveAction: string;
  confidence: number;
  triggerFactor: string;
}

export interface CampusStats {
  issuesResolvedToday: number;
  avgRerouteTimeSeconds: number;
  uptimePreservedPercentage: number;
  activeCampuses: number;
}
