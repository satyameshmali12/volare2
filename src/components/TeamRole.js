export default function TeamRole({ title, text }) {
  return (
    <div className="border-b border-black/10 pb-5">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-neutral-900">{title}</p>
        <span className="text-black">→</span>
      </div>
      <p className="mt-2 text-sm text-black/45">{text}</p>
    </div>
  );
}
