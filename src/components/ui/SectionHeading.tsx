import { Reveal } from "./Reveal";

type Props = {
  index: string; // e.g. "02"
  eyebrow: string;
  title: string;
};

export function SectionHeading({ index, eyebrow, title }: Props) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <span className="eyebrow">
        <span className="text-mint">▰</span> {eyebrow}
      </span>
      <div className="mt-4 flex items-end gap-4">
        <span className="font-display text-mint/40 text-xl md:text-3xl txt-pix select-none">
          {index}
        </span>
        <h2 className="font-display text-paper txt-pix text-2xl leading-tight md:text-4xl">
          {title}
        </h2>
      </div>
      <div className="mt-5 h-[3px] w-full max-w-xs bg-line" />
    </Reveal>
  );
}
