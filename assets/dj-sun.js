/* Shared DJ sun data for index.html + gates.html
   This keeps the current Sun gate info in sync across pages.
   Update the values below to change both pages at once.
*/

const DJ_SUN = {
    // main headline / track name
    trackTitle: "OPINION RADIO",

    // gate labels
    gate: "Gate 17 · Opinions",
    tags: "Logic · Pattern recognition · Mental pressure · Organizing ideas",

    // metadata for index.html
    dates: "March 24–29",
    setId: "SET 017",
    artist: "Collective – Understanding Circuit",

    // copy for index.html / gates.html
    reason: "Gate 17 carries Opinions — logical insight, pattern recognition, and the pressure to organize ideas into something that makes sense. This set feels like scanning the bigger picture, spotting what is off, and forming a sharper perspective on what could work better.",
    description: "Your opinion is not the truth. It is a pattern check. When you stop forcing certainty and let your insight stay sharp but open, your Manifestor mind becomes a cleaner signal instead of a pressure chamber.",

    // gates.html specific fields
    gateLabel: "Gate 17 · Opinions",
    gateTitle: "Gate 17 · Opinions mix",
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