import React, { useEffect, useState } from "react";

type Props = {
  endpoint?: string;
};

export default function PhasePricing({ endpoint = "/price-phases.json" }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(endpoint)
      .then((res) => res.json())
      .then((d) => {
        if (mounted) setData(d);
      })
      .catch(() => {
        if (mounted) setData(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  if (loading) return <div>Loading pricing...</div>;
  if (!data) return <div>No pricing available</div>;

  // If the data is an array of phases, render a simple list/table.
  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((phase: any, idx: number) => (
          <div key={idx} className="p-3 border rounded">
            <div className="font-semibold">{phase.name || phase.phase || `Phase ${idx + 1}`}</div>
            <pre className="text-sm mt-2 whitespace-pre-wrap">{JSON.stringify(phase, null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  }

  // Fallback: dump the object
  return <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>;
}
