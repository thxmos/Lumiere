"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/modules/shared/components/ui/dialog";
import { SOCIAL_PLATFORMS } from "@/config/constants/social-media";

export interface SocialMediaAuthProps {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export interface SocialMediaIntegrationsMenuProps extends SocialMediaAuthProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialMediaIntegrationsMenu = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
}: SocialMediaIntegrationsMenuProps) => {
  const handleSocialAuth = async (
    platform: (typeof SOCIAL_PLATFORMS)[number],
  ) => {
    try {
      // since the method is gonna be async
      await new Promise((resolve) => setTimeout(resolve, 1000));

      switch (platform.type) {
        case "APPLE_MUSIC":
          console.log("Authenticating with Apple Music");
          break;
        case "FACEBOOK":
          console.log("Authenticating with Facebook");
          break;
        case "INSTAGRAM":
          console.log("Authenticating with Instagram");
          break;
        case "PATREON":
          console.log("Authenticating with Patreon");
          break;
        case "SPOTIFY":
          console.log("Authenticating with Spotify");
          break;
        case "TIKTOK":
          console.log("Authenticating with TikTok");
          break;
        case "TWITTER_X":
          console.log("Authenticating with Twitter");
          break;
        case "YOUTUBE":
          console.log("Authenticating with YouTube");
          break;
        default:
          throw new Error("Unsupported platform");
      }

      // Simulate successful authentication
      onSuccess();
      onClose();
    } catch (error) {
      console.error(`Authentication error for ${platform.label}:`, error);
      onError(
        error instanceof Error ? error : new Error("Authentication failed"),
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Social Media</DialogTitle>
          <DialogDescription>
            Choose a platform to connect to your profile
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {SOCIAL_PLATFORMS.map((platform) => (
            <button
              key={platform.label}
              onClick={() => handleSocialAuth(platform)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <platform.icon className="w-6 h-6" />
              <span className="font-medium">{platform.label}</span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
