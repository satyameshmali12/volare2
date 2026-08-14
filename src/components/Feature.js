export default function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-neutral-100 text-black">
        {icon}
      </div>
      <p className="font-medium text-neutral-900">{title}</p>
    </div>
  );
}
