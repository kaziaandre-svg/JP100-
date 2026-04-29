
export type Category = 'biometric' | 'antispy' | 'comm';

export interface ScanLog {
  id: string;
  timestamp: string;
  type: 'face' | 'eye';
  status: 'success' | 'denied';
  location?: { lat: number; lng: number };
  snapshotUrl?: string;
}

export interface VirusStats {
  scanned: number;
  threats: number;
  cleaned: number;
  isolated: number;
}

export interface CommLog {
  id: string;
  type: 'call' | 'sms';
  target: string;
  timestamp: string;
  duration?: string;
  content?: string;
  vpnLocation: string;
  status?: string;
}
