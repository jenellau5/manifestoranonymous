/* Shared gate station data for Gates Radio pages.
   Update this list to keep the Gates preview (gates.html) and the full gate chart (gates-radio.html)
   in sync. The preview page shows a few featured online gates; the full chart page uses the same
   data to keep gate names/taglines and playlist links consistent.
*/

const GATE_STATIONS = [
    {
        gate: 22,
        title: "Grace",
        tagline: "Mood · Presence · Emotional influence",
        playlist: "https://open.spotify.com/playlist/4dRtSluSyPUpDwhcJE0r8D?si=DIvyJYSxTe22yfONcGSUPQ",
        status: "online",
    },
    {
        gate: 36,
        title: "Crisis",
        tagline: "Transition · Experience · Emotional intensity",
        playlist: "https://open.spotify.com/playlist/7fpUSkCC0DRZ3zVvh0w2Mp?si=Qf4XW3A3RvKYBHQOdjZXeg",
        status: "online",
    },
    {
        gate: 12,
        title: "Caution",
        tagline: "Timing · Emotional voice · Shy-bold",
        playlist: "https://open.spotify.com/playlist/5JiFAS4gmNyzNQfzadFjjd?si=4e_LNCaASx-QLtSNkz2sAg",
        status: "online",
    },
    {
        gate: 17,
        title: "Opinions",
        tagline: "Beliefs · Perspective · Rightness",
        playlist: "https://open.spotify.com/playlist/6tZuukDRMO4VcTzy9YbMPh?si=6gsssL4dTHe66H_2VZ3fgA",
        status: "online",
    },
    {
        gate: 21,
        title: "Control",
        tagline: "Authority · Resources · Order",
        playlist: "https://open.spotify.com/playlist/2rPXSj4E4XGCDG3atSjxbH?si=GrH78FBHQ3K2-LOsPKr2bw",
        status: "online",
    },
    {
        gate: 25,
        title: "Spirit of the Self",
        tagline: "Innocence · Universal love · Open heart",
        playlist: "https://open.spotify.com/playlist/4RKZ6E1uGBGWs561iO4hFR?si=xoFkKCB9SpGWTYX5QQPzrw",
        status: "online",
    },
    {
        gate: 38,
        title: "Struggle",
        tagline: "Purpose · Resistance · The right fight",
        playlist: "https://open.spotify.com/playlist/5FK9BMpMUkhXuYe7u3d2kS?si=4f3pjKydQlSNHPYS5P5y-Q",
        status: "online",
    },
];

function getOnlineGates() {
    return GATE_STATIONS.filter((s) => s.status === "online");
}

function formatGateLabel(station) {
    return `Gate ${station.gate} · ${station.title}`;
}

function formatOnlineGateList(stations) {
    return stations.map(formatGateLabel).join(" · ");
}

function updateOnlineGateSummary(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const online = getOnlineGates();
    if (online.length === 0) {
        el.textContent = "No gates are streaming right now.";
        return;
    }
    el.textContent = `Online gates: ${formatOnlineGateList(online)}`;
}
