export interface DemoFeature {
  title: string
  description: string
  icon: string
}

export const demoFeatures: DemoFeature[] = [
  {
    title: 'Real-time Updates',
    description: 'Get live location updates every 30 seconds with precise GPS tracking.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Smart Filtering',
    description: 'Easily filter vehicles by type and status to focus on what matters.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Instant Alerts',
    description: 'Receive notifications for important events and status changes.',
    icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  },
  {
    title: 'Detailed Analytics',
    description: 'Access comprehensive reports and insights about your fleet.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
]

// Export a default that includes everything we need
const demo = {
  demoFeatures,
}

export default demo
