import { useState } from "react";

export default function StatusCard() {
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const statuses = {
    idle: {
      label: "SYSTEM IDLE",
      color: "from-slate-600 to-slate-800",
    },
    healthy: {
      label: "SYSTEM HEALTHY",
      color: "from-emerald-400 to-green-600",
    },
    warning: {
      label: "SYSTEM WARNING",
      color: "from-amber-400 to-orange-600",
    },
  };

  const checkStatus = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/status");
    const data = await res.json();
    setStatus(data.status);
    setLoading(false);
  };

  return (
    <div
      className={`relative w-96 p-8 rounded-3xl bg-gradient-to-br ${statuses[status].color}
      shadow-2xl transition-all duration-700 ease-out hover:scale-[1.02]`}
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-3xl blur-2xl opacity-30 bg-white"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-black/80">
        <h2 className="text-2xl font-semibold tracking-wide">
          {statuses[status].label}
        </h2>

        <p className="mt-4 text-black/80">
          Real-time backend signal with smooth UI transitions
        </p>

        <button
          onClick={checkStatus}
          disabled={loading}
          className="mt-8 px-6 py-3 rounded-full bg-white/20 backdrop-blur-lg
          hover:bg-white/30 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>
      </div>
    </div>
  );
}
