import { useEffect, useState } from "react";

export type TripMeta = {
  dates?: string[];
  prices?: Record<string, any>;
  usePricePhases?: boolean;
  pricePhasesEndpoint?: string;
  pricePhases?: any;
  [key: string]: any;
};

export default function useTripMeta(slug: string) {
  const [meta, setMeta] = useState<TripMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchMeta() {
      try {
        setLoading(true);
        const res = await fetch(`/trips/${slug}.json`, { cache: "no-store" });
        if (!res.ok) {
          setMeta(null);
          return;
        }
        const json = await res.json();
        if (!mounted) return;
        setMeta(json);
      } catch (e) {
        if (!mounted) return;
        setMeta(null);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    fetchMeta();

    return () => {
      mounted = false;
    };
  }, [slug]);

  return { meta, loading };
}
