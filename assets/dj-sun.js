/* Shared DJ sun data for index.html + gates.html
   This keeps the ‘current Sun gate’ info in sync across pages.
   Update the values below to change both pages at once.
*/

const DJ_SUN = {
    // main headline / track name
    trackTitle: "CRISIS RADIO",

    // gate labels
    gate: "Gate 36 · Crisis",
    tags: "Emotional storm · Unknown · Initiation · Compassion",

    // metadata for index.html
    dates: "March 18–23",
    setId: "SET 036",
    artist: "Collective – Sensing Circuit",

    // copy for index.html / gates.html
    reason: "Gate 36 carries the Gate of Crisis. This set holds the emotional storm – the dark hallway between who you were and who you’re about to become as a Manifestor.",
    description: "Crisis is not you failing. It’s your ignition point. When your emotional field goes dark, that’s often the moment your next Manifestor initiation is trying to come through.",

    // gates.html specific fields
    gateLabel: "Gate 36 · Crisis",
    gateTitle: "Gate 36 · Crisis mix",
};

function updateElementText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function syncDjSun() {
    // index.html
    updateElementText("djTrackTitle", DJ_SUN.trackTitle);
    updateElementText("djGate", DJ_SUN.gate);
    updateElementText("djTags", DJ_SUN.tags);
    updateElementText("djDates", DJ_SUN.dates);
    updateElementText("djSetId", DJ_SUN.setId);
    updateElementText("djArtist", DJ_SUN.artist);
    updateElementText("djReason", DJ_SUN.reason);
    updateElementText("djDescription", DJ_SUN.description);

    // gates.html
    updateElementText("sunGateLabel", DJ_SUN.gateLabel);
    updateElementText("sunGateTitle", DJ_SUN.gateTitle);
    updateElementText("sunGateTags", DJ_SUN.tags);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncDjSun);
} else {
    syncDjSun();
}
