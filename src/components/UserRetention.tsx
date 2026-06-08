import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function UserRetention() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Bookmark Prompt Logic
    const hasSeenBookmarkPrompt = localStorage.getItem('hasSeenBookmarkPrompt');
    
    if (!hasSeenBookmarkPrompt) {
      const bookmarkTimer = setTimeout(() => {
        const isMac = navigator.userAgent.toLowerCase().includes('mac');
        const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
        
        toast('Never lose this verifier!', {
          description: `Press ${shortcut} to bookmark us for future routing number checks safe & secure.`,
          duration: 8000,
          position: 'bottom-right',
          action: {
            label: 'Got it',
            onClick: () => {
              localStorage.setItem('hasSeenBookmarkPrompt', 'true');
            },
          },
          onDismiss: () => {
            localStorage.setItem('hasSeenBookmarkPrompt', 'true');
          }
        });
        
        // Ensure it acts correctly by closing automatically if unseen
        localStorage.setItem('hasSeenBookmarkPrompt', 'true');
      }, 5000);

      return () => clearTimeout(bookmarkTimer);
    }
  }, []);

  useEffect(() => {
    // 2. PWA Install Prompt Logic (Add to Home Screen)
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    // Show PWA install prompt slightly after it becomes available to avoid stacking 
    // too heavily with the bookmark prompt
    if (deferredPrompt) {
      const hasSeenInstallPrompt = localStorage.getItem('hasSeenInstallPrompt_v2');
      
      if (!hasSeenInstallPrompt) {
        const installTimer = setTimeout(() => {
          toast.success('Install for Offline Use', {
            description: 'Add our app to your home screen for instant routing lookups anytime.',
            duration: 20000,
            position: 'bottom-center',
            action: {
              label: 'Install App',
              onClick: async () => {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                setDeferredPrompt(null);
                localStorage.setItem('hasSeenInstallPrompt_v2', 'true');
              },
            },
            cancel: {
              label: 'Maybe later',
              onClick: () => {
                localStorage.setItem('hasSeenInstallPrompt_v2', 'true');
              }
            },
          });
        }, 3000);

        return () => clearTimeout(installTimer);
      }
    }
  }, [deferredPrompt]);

  useEffect(() => {
    // 3. Exit Intent Prompt Logic
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the top of the viewport (indicating closing tab or switching)
      if (e.clientY <= 0) {
        const hasSeenExitPrompt = localStorage.getItem('hasSeenExitPrompt');
        
        if (!hasSeenExitPrompt) {
          const isMac = navigator.userAgent.toLowerCase().includes('mac');
          const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
          
          toast.message('Leaving so soon?', {
            description: `Don't forget to bookmark us (${shortcut}) before you go for your next wire transfer!`,
            duration: 10000,
            position: 'top-center',
          });
          
          localStorage.setItem('hasSeenExitPrompt', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return null;
}
