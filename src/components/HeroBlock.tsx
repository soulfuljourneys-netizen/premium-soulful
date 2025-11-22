import React from "react";

interface CTA {
  text: string;
  href: string;
}
interface Stat {
  label: string;
  value: string;
}

interface Props {
  title: string;
  subtitle?: string;
  description?: React.ReactNode;
  heroImage: string;
  thumbnails?: string[];
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  stats?: Stat[];
}

export default function HeroBlock({
  title,
  subtitle,
  description,
  heroImage,
  thumbnails = [],
  ctaPrimary,
  ctaSecondary,
  stats = [],
}: Props) {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-start py-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          {title}
        </h2>
        {subtitle && (
          <div className="text-sm text-slate-500 mt-2">{subtitle}</div>
        )}

        {description && (
          <p className="mt-6 text-slate-600 max-w-xl">{description}</p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {ctaPrimary && (
            <a
              href={ctaPrimary.href}
              className="px-4 py-2 rounded-lg bg-[#ff4c1b] text-white font-semibold text-sm"
            >
              {ctaPrimary.text}
            </a>
          )}
          {ctaSecondary && (
            <a
              href={ctaSecondary.href}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm"
            >
              {ctaSecondary.text}
            </a>
          )}
        </div>

        {stats.length > 0 && (
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col"
              >
                <div className="font-semibold">{s.label}</div>
                <div className="text-slate-600">{s.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="aspect-[5/3] w-full rounded-3xl overflow-hidden shadow-lg">
          <img
            alt="hero"
            className="object-cover w-full h-full"
            src={heroImage}
          />
        </div>
        {thumbnails && thumbnails.length > 0 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-3 w-[calc(100%-3rem)] md:w-[calc(100%-6rem)]">
            {thumbnails.slice(0, 3).map((src, i) => (
              <img
                key={i}
                alt={`thumb-${i}`}
                className="w-1/3 h-28 md:h-36 rounded-xl shadow-md object-cover"
                src={src}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
