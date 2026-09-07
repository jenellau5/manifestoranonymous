const PLAYGROUND_ACCESS_CODE = "MANIFESTOR97"; // Change this before launch.
const GATES = {
  "1": {
    "name": "Self Expression",
    "center": "G Center",
    "circuit": "Individual"
  },
  "2": {
    "name": "Higher Knowledge/Receptivity",
    "center": "G Center",
    "circuit": "Individual"
  },
  "3": {
    "name": "Ordering",
    "center": "Sacral",
    "circuit": "Individual"
  },
  "4": {
    "name": "Answers",
    "center": "Ajna",
    "circuit": "Collective"
  },
  "5": {
    "name": "Fixed Rhythms",
    "center": "Sacral",
    "circuit": "Collective"
  },
  "6": {
    "name": "Friction",
    "center": "Emotional",
    "circuit": "Tribal"
  },
  "7": {
    "name": "Role of Self",
    "center": "G Center",
    "circuit": "Collective"
  },
  "8": {
    "name": "Contribution",
    "center": "Throat",
    "circuit": "Individual"
  },
  "9": {
    "name": "Focus",
    "center": "Sacral",
    "circuit": "Collective"
  },
  "10": {
    "name": "Behaviour of the Self",
    "center": "G Center",
    "circuit": "Individual"
  },
  "11": {
    "name": "Ideas",
    "center": "Ajna",
    "circuit": "Collective"
  },
  "12": {
    "name": "Caution",
    "center": "Throat",
    "circuit": "Individual"
  },
  "13": {
    "name": "Listener",
    "center": "G Center",
    "circuit": "Collective"
  },
  "14": {
    "name": "Power Skills",
    "center": "Sacral",
    "circuit": "Individual"
  },
  "15": {
    "name": "Extremes",
    "center": "G Center",
    "circuit": "Collective"
  },
  "16": {
    "name": "Skills",
    "center": "Throat",
    "circuit": "Collective"
  },
  "17": {
    "name": "Opinions",
    "center": "Ajna",
    "circuit": "Collective"
  },
  "18": {
    "name": "Correction",
    "center": "Spleen",
    "circuit": "Collective"
  },
  "19": {
    "name": "Wanting",
    "center": "Root",
    "circuit": "Tribal"
  },
  "20": {
    "name": "The Now",
    "center": "Throat",
    "circuit": "Individual"
  },
  "21": {
    "name": "Tribal",
    "center": "Hunter/Huntress/Control",
    "circuit": "Ego"
  },
  "22": {
    "name": "Openness",
    "center": "Emotional",
    "circuit": "Individual"
  },
  "23": {
    "name": "Individual",
    "center": "Assimilation + Creativity",
    "circuit": "Throat"
  },
  "24": {
    "name": "Rationalising",
    "center": "Ajna",
    "circuit": "Individual"
  },
  "25": {
    "name": "Spirit of Self",
    "center": "G Center",
    "circuit": "Individual"
  },
  "26": {
    "name": "Egoist/Trickster",
    "center": "Ego",
    "circuit": "Tribal"
  },
  "27": {
    "name": "Caring",
    "center": "Sacral",
    "circuit": "Tribal"
  },
  "28": {
    "name": "Struggle",
    "center": "Spleen",
    "circuit": "Individual"
  },
  "29": {
    "name": "Yes/Perseverance",
    "center": "Sacral",
    "circuit": "Collective"
  },
  "30": {
    "name": "Desire",
    "center": "Emotional",
    "circuit": "Collective"
  },
  "31": {
    "name": "Leading/Influence",
    "center": "Throat",
    "circuit": "Collective"
  },
  "32": {
    "name": "Continuity",
    "center": "Spleen",
    "circuit": "Tribal"
  },
  "33": {
    "name": "Privacy",
    "center": "Throat",
    "circuit": "Collective"
  },
  "34": {
    "name": "Power",
    "center": "Sacral",
    "circuit": "Individual"
  },
  "35": {
    "name": "Throat Collective",
    "center": "Change + Personal",
    "circuit": "Stories"
  },
  "36": {
    "name": "Crisis",
    "center": "Emotional",
    "circuit": "Collective"
  },
  "37": {
    "name": "Friendship",
    "center": "Emotional",
    "circuit": "Tribal"
  },
  "38": {
    "name": "The Fighter",
    "center": "Root",
    "circuit": "Individual"
  },
  "39": {
    "name": "Provocateur",
    "center": "Root",
    "circuit": "Individual"
  },
  "40": {
    "name": "Aloneness",
    "center": "Ego",
    "circuit": "Tribal"
  },
  "41": {
    "name": "Contraction",
    "center": "Root",
    "circuit": "Collective"
  },
  "42": {
    "name": "Growth",
    "center": "Sacral",
    "circuit": "Collective"
  },
  "43": {
    "name": "Insight",
    "center": "Ajna",
    "circuit": "Individual"
  },
  "44": {
    "name": "Alertness",
    "center": "Spleen",
    "circuit": "Tribal"
  },
  "45": {
    "name": "Gatherer",
    "center": "Throat",
    "circuit": "Tribal"
  },
  "46": {
    "name": "Determination of Self",
    "center": "G Center",
    "circuit": "Collective"
  },
  "47": {
    "name": "Realising",
    "center": "Ajna",
    "circuit": "Collective"
  },
  "48": {
    "name": "Depth",
    "center": "Spleen",
    "circuit": "Collective"
  },
  "49": {
    "name": "Principles",
    "center": "Emotional",
    "circuit": "Tribal"
  },
  "50": {
    "name": "Location: Circuit: Spleen Tribal",
    "center": "Values/",
    "circuit": "World Changing"
  },
  "51": {
    "name": "Shock",
    "center": "Ego",
    "circuit": "Individual"
  },
  "52": {
    "name": "Stillness",
    "center": "Root",
    "circuit": "Collective"
  },
  "53": {
    "name": "Beginnings",
    "center": "Root",
    "circuit": "Collective"
  },
  "54": {
    "name": "Ambition",
    "center": "Root",
    "circuit": "Tribal"
  },
  "55": {
    "name": "Spirit",
    "center": "Emotional",
    "circuit": "Individual"
  },
  "56": {
    "name": "Stimulation",
    "center": "Throat",
    "circuit": "Collective"
  },
  "57": {
    "name": "Intuitive Insight",
    "center": "Spleen",
    "circuit": "Individual"
  },
  "58": {
    "name": "Joy of Life",
    "center": "Root",
    "circuit": "Collective"
  },
  "59": {
    "name": "Sexuality",
    "center": "Sacral",
    "circuit": "Tribal"
  },
  "60": {
    "name": "Acceptance",
    "center": "Root",
    "circuit": "Individual"
  },
  "61": {
    "name": "Mystery",
    "center": "Head",
    "circuit": "Individual"
  },
  "62": {
    "name": "Details",
    "center": "Throat",
    "circuit": "Collective"
  },
  "63": {
    "name": "Doubt",
    "center": "Head",
    "circuit": "Collective"
  },
  "64": {
    "name": "Confusion",
    "center": "Head",
    "circuit": "Collective"
  }
};
const CHANNELS = [
  {
    "a": 1,
    "b": 8,
    "name": "Inspiration",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 2,
    "b": 14,
    "name": "The Beat",
    "circuit": "Individual",
    "possible": false
  },
  {
    "a": 3,
    "b": 60,
    "name": "Mutation",
    "circuit": "Individual",
    "possible": false
  },
  {
    "a": 4,
    "b": 63,
    "name": "Logic",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 5,
    "b": 15,
    "name": "Rhythm",
    "circuit": "Collective",
    "possible": false
  },
  {
    "a": 6,
    "b": 59,
    "name": "Intimacy",
    "circuit": "Tribal",
    "possible": false
  },
  {
    "a": 7,
    "b": 31,
    "name": "Alpha",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 9,
    "b": 52,
    "name": "Concentration",
    "circuit": "Collective",
    "possible": false
  },
  {
    "a": 10,
    "b": 20,
    "name": "Awakening",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 10,
    "b": 34,
    "name": "Exploration",
    "circuit": "Individual",
    "possible": false
  },
  {
    "a": 10,
    "b": 57,
    "name": "Perfected Form",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 11,
    "b": 56,
    "name": "Curiosity",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 12,
    "b": 22,
    "name": "Openness",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 13,
    "b": 33,
    "name": "Prodigal",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 16,
    "b": 48,
    "name": "Wavelength",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 17,
    "b": 62,
    "name": "Acceptance",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 18,
    "b": 58,
    "name": "Judgment",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 19,
    "b": 49,
    "name": "Synthesis",
    "circuit": "Tribal",
    "possible": true
  },
  {
    "a": 20,
    "b": 34,
    "name": "Charisma",
    "circuit": "Individual",
    "possible": false
  },
  {
    "a": 20,
    "b": 57,
    "name": "Brainwave",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 21,
    "b": 45,
    "name": "Money Line",
    "circuit": "Tribal",
    "possible": true
  },
  {
    "a": 23,
    "b": 43,
    "name": "Structuring",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 24,
    "b": 61,
    "name": "Awareness",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 25,
    "b": 51,
    "name": "Initiation",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 26,
    "b": 44,
    "name": "Surrender",
    "circuit": "Tribal",
    "possible": true
  },
  {
    "a": 27,
    "b": 50,
    "name": "Preservation",
    "circuit": "Tribal",
    "possible": false
  },
  {
    "a": 28,
    "b": 38,
    "name": "Struggle",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 29,
    "b": 46,
    "name": "Discovery",
    "circuit": "Collective",
    "possible": false
  },
  {
    "a": 30,
    "b": 41,
    "name": "Recognition",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 32,
    "b": 54,
    "name": "Transformation",
    "circuit": "Tribal",
    "possible": true
  },
  {
    "a": 34,
    "b": 57,
    "name": "Power",
    "circuit": "Individual",
    "possible": false
  },
  {
    "a": 35,
    "b": 36,
    "name": "Transitoriness",
    "circuit": "Collective",
    "possible": true
  },
  {
    "a": 37,
    "b": 40,
    "name": "Community",
    "circuit": "Tribal",
    "possible": true
  },
  {
    "a": 39,
    "b": 55,
    "name": "Emoting",
    "circuit": "Individual",
    "possible": true
  },
  {
    "a": 42,
    "b": 53,
    "name": "Maturation",
    "circuit": "Collective",
    "possible": false
  },
  {
    "a": 47,
    "b": 64,
    "name": "Abstraction",
    "circuit": "Collective",
    "possible": true
  }
];

window.MA_GATES = Object.fromEntries(Object.entries(GATES).map(([num, g]) => [num, {
  ...g,
  core: `${g.name} is the core theme carried by Gate ${num}.`,
  high: `At its cleanest, ${g.name.toLowerCase()} becomes something you can recognize and use without forcing it.`,
  low: `Under pressure, this theme can become distorted, overused or acted out before your Authority has had a say.`,
  manifestor: `For a Manifestor, notice how ${g.name.toLowerCase()} affects initiation, impact, informing and the way other people experience your movement.`
}]));
window.MA_CHANNELS = Object.fromEntries(CHANNELS.map(c => [`${c.a}-${c.b}`, {
  ...c,
  core: `${c.name} is the consistent pathway created when Gates ${c.a} and ${c.b} connect.`,
  high: `In a clean expression, the channel can operate as a reliable pattern rather than something you have to manufacture.`,
  low: `Under conditioning or pressure, the same consistency can become rigid, reactive or overidentified with.`,
  manifestor: c.possible
    ? `A Manifestor can carry this channel fully defined. Watch how its consistency shapes your initiation, communication and impact.`
    : `A Manifestor cannot carry this channel fully defined because it would define the Sacral. You may still carry one side as a hanging gate.`
}]));
window.MA_CHANNEL_LIST = CHANNELS;
