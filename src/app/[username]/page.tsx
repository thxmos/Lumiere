import Image from "next/image";
import placeholder from "@/assets/product-default.svg";
import { getUserByUsername } from "@/actions/user.actions";
import { TabSelector } from "@/app/[username]/components/tab-selector";
import { COUNTRIES, SOCIAL_PLATFORMS } from "@/utils/constants/constants";
import { X } from "lucide-react";
import { getActiveLinksByUserId } from "./actions";
import { getTheme } from "@/actions/theme.actions";
import BackgroundVideo from "./components/background-video";
import { BLACK, WHITE } from "@/utils/colors";

const bgVideo =
  "https://fg92krreal8mypv5.public.blob.vercel-storage.com/urlfern/these%20clouds%20spotify%20canvas-BgxPR1YQkp3sjStMxVCz2lfTSFARD9.mp4";

export default async function ArtistPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);
  if (!user) return <div>User not found</div>;

  const links = await getActiveLinksByUserId(user.id);
  const theme = await getTheme(user.id);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        fontFamily: theme.fontFamily || "system-ui, sans-serif",
      }}
    >
      {theme.backgroundType === "color" && (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{ backgroundColor: theme.backgroundColor || "#000000" }}
        ></div>
      )}
      {theme.backgroundType === "image" && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${theme.backgroundImageUrl})` }}
        ></div>
      )}
      {theme.backgroundType === "video" && (
        <BackgroundVideo bgVideo={bgVideo} />
      )}

      <div className="relative z-10 min-h-screen  px-4 py-16 flex flex-col">
        <div className="max-w-md mx-auto flex-grow">
          {/* Profile Info */}
          <div className="flex items-center mb-6 justify-center">
            <Image
              src={user.avatar || placeholder}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-200 flex-shrink-0"
              style={{
                borderColor: theme.borderColor || BLACK,
                borderWidth: theme.borderWidth ? `${theme.borderWidth}px` : 1,
                borderStyle: theme.borderStyle || "solid",
              }}
            />
            <div className="ml-4 flex flex-col items-start">
              <span className="flex items-end">
                <h1
                  className="text-3xl font-bold"
                  style={{
                    color: theme.fontColor || BLACK,
                  }}
                >
                  {user.username}
                </h1>
                {user.displayCountry && user.country && (
                  <span className="ml-2">
                    {
                      COUNTRIES.find((country) => country.code === user.country)
                        ?.emoji
                    }
                  </span>
                )}
              </span>
              <p
                className="mt-2 max-w-sm"
                style={{
                  color: theme.secondaryColorFont || WHITE,
                }}
              >
                {user.description}
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <TabSelector links={links} theme={theme} />

          {/* Social Links */}
          <div className="mt-8 flex justify-center space-x-4">
            {SOCIAL_PLATFORMS.filter(
              (platform) => user[platform.value as keyof typeof user],
            ).map((platform, index) => (
              <a
                key={index}
                href={
                  platform.prefix + user[platform.value as keyof typeof user] ||
                  ""
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors"
              >
                {platform.icon ? (
                  <platform.icon
                    size={24}
                    style={{
                      color: theme.iconColor || WHITE,
                    }}
                  />
                ) : (
                  <X size={24} style={{ color: theme.iconColor || WHITE }} />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
