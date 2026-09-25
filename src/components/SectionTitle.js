export default function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="dark:text-white">
      <p className="text-xs font-semibold tracking-[0.35em] text-black/45 dark:text-white">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
        {title}
      </h1>
      <div className="mt-7 h-px w-20 bg-black dark:text-white" />
      {description && (
        <p className="mt-6 max-w-2xl leading-8 text-black/50">{description}</p>
      )}
    </div>
  );
}
