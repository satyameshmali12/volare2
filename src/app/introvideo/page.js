import HomeVideo from "@/components/HomeVideo";

export default function IntroVideo() {
  return (
    <div
      className="
            relative z-10 mx-auto w-full max-w-7xl
            px-6 pb-20 pt-32
            lg:px-10 lg:pb-24 lg:pt-40
          "
    >
      <div className="mt-14 sm:mt-16 lg:mt-20">
        <HomeVideo />
      </div>
    </div>
  );
}
