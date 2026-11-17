import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { db, storage } from '../firebase';
import { CampusIssue } from '../types';
import { INITIAL_ISSUES } from '../data';

const INCIDENTS_COLLECTION = 'campus_incidents';

/**
 * Upload an attachment or evidence image (e.g., photo of broken projector / room flood) to Firebase Cloud Storage.
 */
export async function uploadIncidentAttachment(file: File): Promise<string> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storageRef = ref(storage, `incident_evidence/${timestamp}_${sanitizedName}`);
  
  const uploadResult = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(uploadResult.ref);
  return downloadUrl;
}

/**
 * Report a new incident into Firestore database and broadcast to students.
 */
export async function saveIncidentToFirebase(issue: CampusIssue, attachmentUrl?: string): Promise<string> {
  const docRef = await addDoc(collection(db, INCIDENTS_COLLECTION), {
    ...issue,
    attachmentUrl: attachmentUrl || null,
    createdAt: serverTimestamp()
  });
  return docRef.id;
}

/**
 * Subscribe to real-time incident reports across campuses.
 */
export function subscribeToIncidents(callback: (issues: CampusIssue[]) => void) {
  const q = query(collection(db, INCIDENTS_COLLECTION), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_ISSUES);
      return;
    }

    const fetched: CampusIssue[] = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        category: data.category || 'projector',
        title: data.title || 'Campus Incident',
        reportedLocation: data.reportedLocation || 'Campus Wing',
        building: data.building || 'Main Complex',
        floor: data.floor || 'Floor 1',
        severity: data.severity || 'high',
        timeReported: data.timeReported || 'Just now',
        status: data.status || 'rerouting',
        description: data.description || '',
        attachmentUrl: data.attachmentUrl || undefined,
        backupOption: data.backupOption || {
          name: 'Verified Campus Backup Node',
          location: 'Adjacent Hall',
          distance: '50m',
          walkTime: '1.5 min walk',
          availability: 'Ready',
          specs: ['Full redundant backup'],
          directions: ['Proceed through corridor']
        }
      } as CampusIssue;
    });

    callback(fetched);
  }, (err) => {
    console.warn('Firestore live listener offline or initial permissions warming up, falling back to cached local state:', err);
    callback(INITIAL_ISSUES);
  });
}
