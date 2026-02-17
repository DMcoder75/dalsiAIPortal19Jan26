import { getAnalytics, logEvent, setUserProperties, setUserId } from 'firebase/analytics'
import { app } from './firebase'

// Initialize Firebase Analytics
let analytics = null

try {
  analytics = getAnalytics(app)