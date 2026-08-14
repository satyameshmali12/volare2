export default function ChallengeCard({ number, title, text }) {
  return (
    <div className="group rounded-3xl border border-black/10 bg-white p-8 transition duration-500 hover:-translate-y-2 hover:border-black/30 hover:shadow-xl">
      <span className="text-sm font-medium text-black/40">{number}</span>
      <h3 className="mt-10 text-3xl font-bold text-neutral-950">{title}</h3>
      <p className="mt-5 leading-7 text-black/50">{text}</p>
      <div className="mt-8 h-px w-full bg-black/10 transition group-hover:bg-black/30" />
    </div>
  );
}
