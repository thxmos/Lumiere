export default function BackgroundVideo({ bgVideo }: { bgVideo: string }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
}
