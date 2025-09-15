import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.4e6798346a914ef98d59e92ba297df45',
  appName: 'fiker-way-logistics',
  webDir: 'dist',
  server: {
    url: 'https://4e679834-6a91-4ef9-8d59-e92ba297df45.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a5930',
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#1a5930'
    },
    Keyboard: {
      resize: 'ionic'
    }
  }
};

export default config;