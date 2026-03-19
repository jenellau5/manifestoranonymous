// variables-vending-machine.js

document.addEventListener("DOMContentLoaded", () => {
    // ============================================================
    // TOPICS / FOCUS AREAS
    // ============================================================
    const focusContent = {
        work: {
            key: "work",
            label: "Work & Output",
            title: "Running Your Variables Through Work & Output",
            intro:
                "This run looks at how your variables shape the way you show up to tasks, roles and responsibilities. It does not tell you what job to have; it shows you how your system actually functions while you work.",
            wrap:
                "When your variables are honoured in work, your output stops feeling like you are constantly forcing yourself through a wall. You still initiate and you still move fast, but it starts to feel more like a clean surge of creation and less like dragging your body and brain behind your own urges.",
            journal:
                "Where in your current work rhythm do you feel the most resistance—your brain input, your environment, the way you see the work, or the way you aim your efforts—and what is one experiment you are willing to try there?"
        },
        business: {
            key: "business",
            label: "Business & Offers",
            title: "Running Your Variables Through Business & Offers",
            intro:
                "This run translates your variables into business: offers, launches, marketing and the behind‑the‑scenes machine under your work.",
            wrap:
                "When your variables are honoured in business, the back‑end of what you build starts to feel like a runway for your urges instead of a cage.",
            journal:
                "Looking at your current business or offers, what feels most out of sync with how you naturally take in, move through, and aim life—and what is one concrete way you can let your design lead instead of industry rules?"
        },
        money: {
            key: "money",
            label: "Money & Resources",
            title: "Running Your Variables Through Money & Resources",
            intro:
                "This run maps your variables onto earning, spending, pricing and receiving, so money becomes more about alignment than punishment.",
            wrap:
                "When your variables are respected with money, your decisions become cleaner and less reactive. Money stops being a constant trigger and starts becoming a resource you can direct.",
            journal:
                "Where are you currently pushing yourself into money patterns that feel off for your variables, and what is one practical way to bring your money life closer to how you actually function?"
        },
        relationships: {
            key: "relationships",
            label: "Relationships",
            title: "Running Your Variables Through Relationships",
            intro:
                "This run looks at how your variables show up in your closest relationships: how you meet people, absorb them, see them and care.",
            wrap:
                "When your variables are met in relationships, the people in your life get access to your clean Manifestor impact instead of the defended, exhausted version of you.",
            journal:
                "In your closest relationship right now, where do you most feel like you are managing your natural way of digesting life, being in space, seeing, or caring—and what is one boundary or request you are willing to make?"
        },
        visibility: {
            key: "visibility",
            label: "Visibility & Being Seen",
            title: "Running Your Variables Through Visibility & Being Seen",
            intro:
                "This run explores how your variables shape the way you are seen—online, on stage, and in any space where your aura is public.",
            wrap:
                "When your variables are supported in visibility, you are not forcing yourself to be constantly present. You are choosing visibility moments your system can actually sustain, so your impact lands in fewer, cleaner hits.",
            journal:
                "Where does visibility currently feel most misaligned with how you naturally take in life, move through space, see, or care—and what is one boundary or experiment you can put in place for the next month?"
        },
        rest: {
            key: "rest",
            label: "Rest & Creative Cycles",
            title: "Running Your Variables Through Rest & Creative Cycles",
            intro:
                "This run maps your variables onto your on/off rhythm: urges, downtime, burnout, and recovery.",
            wrap:
                "When your variables are honoured in rest, your creative surges feel less like emergencies and more like waves you can ride.",
            journal:
                "When you look at your current rest and creative cycle, where are you forcing yourself against your variables, and what is one way you can let your design set the pace instead?"
        },
        transference: {
            key: "transference",
            label: "Transference & Shadow Patterns",
            title: "Seeing Your Variables in Transference",
            intro:
                "This run shows how each variable looks when it slides into its shadow expression—when you are off‑track, compensating, or living from someone else’s rules.",
            wrap:
                "Seeing your variables in transference is not about making you wrong; it is about giving you a map for how to come home to yourself more quickly.",
            journal:
                "Which transference pattern feels most familiar right now, and what is one small, practical way you can signal to your system that it is safe to come back to your correct side?"
        }
    };

    // ============================================================
    // TONES
    // ============================================================
    const toneContent = {
        cognition: {
            "1": { name: "Smell", summary: "You sense atmospheres and subtle cues first, often before others notice anything." },
            "2": { name: "Taste", summary: "Discernment and preference are core to how you take life in and know what is correct." },
            "3": { name: "Outer Vision", summary: "What you see around you dramatically affects how you process and feel." },
            "4": { name: "Inner Vision", summary: "Your inner imagery and imagination shape how reality lands in your system." },
            "5": { name: "Feeling", summary: "You register the emotional tone and subtle feeling of a situation before details." },
            "6": { name: "Touch", summary: "Physical contact, temperature and texture are key to how you digest life." }
        },
        mental: {
            "1": { name: "Security", summary: "Your mind scans for what feels stable enough to trust or rely on." },
            "2": { name: "Uncertainty", summary: "Your mind is comfortable not knowing yet and resists premature closure." },
            "3": { name: "Action", summary: "Your thinking often clarifies once there is something concrete to do or test." },
            "4": { name: "Meditation", summary: "Insight comes after space, reflection and watching, not in the rush." },
            "5": { name: "Judgement", summary: "You naturally discern what is correct, useful or a waste of energy." },
            "6": { name: "Acceptance", summary: "Your mind sees most clearly when you let reality be what it is first." }
        }
    };

    const toneLabels = {
        cognition: [
            { value: "1", label: "1 – Smell" },
            { value: "2", label: "2 – Taste" },
            { value: "3", label: "3 – Outer Vision" },
            { value: "4", label: "4 – Inner Vision" },
            { value: "5", label: "5 – Feeling" },
            { value: "6", label: "6 – Touch" }
        ],
        mental: [
            { value: "1", label: "1 – Security" },
            { value: "2", label: "2 – Uncertainty" },
            { value: "3", label: "3 – Action" },
            { value: "4", label: "4 – Meditation" },
            { value: "5", label: "5 – Judgement" },
            { value: "6", label: "6 – Acceptance" }
        ]
    };

    // ============================================================
    // DETERMINATION DATA (FIRST ARROW) – STRUCTURE READY
    // ============================================================
    const determinationData = {
        label: "Top Left – Determination",
        archetypeLabel: "How your brain digests life so you can actually think.",
        toneSet: "cognition",
        intro:
            "Determination is the way your brain digests life: food, information, experiences, people and frequencies. It is the setting that lets your Manifestor mind run hot without burning out.",
        directionText: {
            L:
                "Left Determination is an active, focused brain. It likes rhythm, repetition and clear parameters so it can concentrate.",
            R:
                "Right Determination is a receptive, relaxed brain. It is built to passively take in a lot without being forced into a narrow focus."
        },
        colors: {
            // Color 1–6 placeholders so you know exactly where to paste content.
            "1": {
                name: "Appetite",
                overview: "[PASTE YOUR APPETITE OVERVIEW HERE]",
                variants: {
                    L: {
                        name: "Consecutive Appetite",
                        generalIntro: "[PASTE Consecutive general intro]",
                        whenSupported: "[PASTE Consecutive 'when supported']",
                        topic: {
                            work: { description: "[work desc]", examples: "[examples]", application: "[application]" },
                            business: { description: "[business desc]", examples: "[examples]", application: "[application]" },
                            money: { description: "[money desc]", examples: "[examples]", application: "[application]" },
                            relationships: { description: "[relationships desc]", examples: "[examples]", application: "[application]" },
                            visibility: { description: "[visibility desc]", examples: "[examples]", application: "[application]" },
                            rest: { description: "[rest desc]", examples: "[examples]", application: "[application]" },
                            transference: {
                                description: "[transference desc]",
                                examples: "[transference examples]",
                                application: "[how to come back]"
                            }
                        }
                    },
                    R: {
                        name: "Alternating Appetite",
                        generalIntro: "[PASTE Alternating general intro]",
                        whenSupported: "[PASTE Alternating 'when supported']",
                        topic: {
                            work: { description: "[work desc]", examples: "[examples]", application: "[application]" },
                            business: { description: "[business desc]", examples: "[examples]", application: "[application]" },
                            money: { description: "[money desc]", examples: "[examples]", application: "[application]" },
                            relationships: { description: "[relationships desc]", examples: "[examples]", application: "[application]" },
                            visibility: { description: "[visibility desc]", examples: "[examples]", application: "[application]" },
                            rest: { description: "[rest desc]", examples: "[examples]", application: "[application]" },
                            transference: {
                                description: "[transference desc]",
                                examples: "[transference examples]",
                                application: "[how to come back]"
                            }
                        }
                    }
                }
            },

            "2": {
                name: "Taste",
                overview: "[PASTE Taste overview here]",
                variants: {
                    L: {
                        name: "Open Taste",
                        generalIntro: "[Open Taste intro]",
                        whenSupported: "[Open Taste when supported]",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    },
                    R: {
                        name: "Closed Taste",
                        generalIntro: "[Closed Taste intro]",
                        whenSupported: "[Closed Taste when supported]",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    }
                }
            },

            "3": {
                name: "Thirst",
                overview: "[PASTE Thirst overview here]",
                variants: {
                    L: {
                        name: "Hot Thirst",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    },
                    R: {
                        name: "Cold Thirst",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    }
                }
            },

            "4": {
                name: "Touch",
                overview: "[Touch overview]",
                variants: {
                    L: {
                        name: "Calm Touch",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    },
                    R: {
                        name: "Nervous Touch",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    }
                }
            },

            "5": {
                name: "Sound",
                overview: "[Sound overview]",
                variants: {
                    L: {
                        name: "High Sound",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    },
                    R: {
                        name: "Low Sound",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    }
                }
            },

            "6": {
                name: "Light",
                overview: "[Light overview]",
                variants: {
                    L: {
                        name: "Direct Light",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    },
                    R: {
                        name: "Indirect Light",
                        generalIntro: "",
                        whenSupported: "",
                        topic: {
                            work: { description: "", examples: "", application: "" },
                            business: { description: "", examples: "", application: "" },
                            money: { description: "", examples: "", application: "" },
                            relationships: { description: "", examples: "", application: "" },
                            visibility: { description: "", examples: "", application: "" },
                            rest: { description: "", examples: "", application: "" },
                            transference: { description: "", examples: "", application: "" }
                        }
                    }
                }
            }
        }
    };

    // ============================================================
    // PLACEHOLDERS for OTHER ARROWS – CLEAR LABELS
    // ============================================================

    // TODO: ENVIRONMENT DATA
    const environmentData = {
        label: "Bottom Left – Environment",
        archetypeLabel: "The kinds of spaces and movement your body does best in.",
        toneSet: "cognition",
        intro:
            "[Write overall Environment explanation here]",
        directionText: {
            L: "[Left Environment explanation]",
            R: "[Right Environment explanation]"
        },
        colors: {
            // 1–6: Caves, Markets, Kitchens, Mountains, Valleys, Shores
        }
    };

    // TODO: MOTIVATION DATA
    const motivationData = {
        label: "Top Right – Motivation",
        archetypeLabel: "How your mind aims your message, plans and impact.",
        toneSet: "mental",
        intro:
            "[Write overall Motivation explanation here]",
        directionText: {
            L: "[Left Motivation explanation]",
            R: "[Right Motivation explanation]"
        },
        colors: {
            // 1–6: Fear/Hope, Desire/Need, Guilt/Innocence etc with transference
        }
    };

    // TODO: PERSPECTIVE DATA
    const perspectiveData = {
        label: "Bottom Right – Perspective",
        archetypeLabel: "How you are designed to see and understand the world.",
        toneSet: "mental",
        intro:
            "[Write overall Perspective explanation here]",
        directionText: {
            L: "[Left Perspective explanation]",
            R: "[Right Perspective explanation]"
        },
        colors: {
            // 1–6: Survival, Possibility, Power, Need, Guilt, Innocence etc with transference
        }
    };

    // ============================================================
    // MANIFESTOR NOTES + ACTION PROMPTS
    // (You can expand later; basic stubs so it runs)
    // ============================================================
    const manifestorNotes = {
        determination: {
            work:
                "For you as a Manifestor, Determination in work is about protecting the way your brain consumes life so your urges can actually form.",
            business:
                "In business, Determination is one of the quietest but most decisive levers for sustainable initiating.",
            money:
                "With money, Determination explains why certain ways of earning or tracking quietly drain you while others feel simple and doable.",
            relationships:
                "In relationships, honouring your Determination stops you from agreeing to rhythms that fry your circuits.",
            visibility:
                "In visibility, Determination is the backstage crew that makes your impact possible.",
            rest:
                "In rest and creative cycles, Determination shows you how to feed yourself so recovery actually works.",
            transference:
                "Seeing Determination in transference helps you catch when you are forcing or starving your mind instead of feeding it correctly."
        },
        environment: { work: "", business: "", money: "", relationships: "", visibility: "", rest: "", transference: "" },
        motivation: { work: "", business: "", money: "", relationships: "", visibility: "", rest: "", transference: "" },
        perspective: { work: "", business: "", money: "", relationships: "", visibility: "", rest: "", transference: "" }
    };

    const actionPrompts = {
        determination: {
            work: [
                "Where can I remove three daily micro‑decisions about food or workflow so my brain has more space?",
                "What is one repeatable start‑of‑day pattern I can test for the next two weeks?",
                "Which type of input reliably leaves my mind feeling clearer, not foggier, and how can I give it more room?"
            ],
            business: [
                "What is one business task I can ritualise so it always happens under similar conditions?",
                "Where am I forcing myself to consume strategies I already know do not work for my brain?",
                "If I treated my launches like a brain‑support project first, what would I change?"
            ],
            money: [
                "What is one money habit that is clearly too complex for my Determination, and how can I simplify it?",
                "Where am I ignoring my body’s signals about how and when to handle money?",
                "What is one small change I can make to feel more resourced when I sit down with my finances?"
            ],
            relationships: [
                "What kind of shared rhythms around food or time feel easiest on my system with the people I love?",
                "Where do I consistently override my body’s 'no' around social or sensory input?",
                "What is one boundary I can set around how and when I connect so my brain feels less taxed?"
            ],
            visibility: [
                "What pre‑visibility routines actually make my brain feel sharper, not just more 'prepared'?",
                "Where am I expecting myself to be 'on' without any cognitive support?",
                "If I only chose visibility moments my Determination could genuinely handle, what would stay?"
            ],
            rest: [
                "When I am tired, do I change my inputs in a way that truly supports my brain?",
                "What kinds of food, information or experiences actually feel restorative to my mind?",
                "What is one way I can make rest cycles simpler and more repetitive for my Determination?"
            ],
            transference: [
                "How do I know I am forcing or starving my Determination instead of feeding it correctly?",
                "What is one obvious over‑complication I can remove from my daily inputs?",
                "What would it look like to feed my mind in a way that feels kind instead of punishing?"
            ]
        },
        environment: {},
        motivation: {},
        perspective: {}
    };

    // ============================================================
    // STATE
    // ============================================================
    const selection = {
        determination: { direction: "", color: "", tone: "" },
        environment: { direction: "", color: "", tone: "" },
        motivation: { direction: "", color: "", tone: "" },
        perspective: { direction: "", color: "", tone: "" }
    };

    let selectedFocus = "work";
    let currentArrowKey = null;

    // ============================================================
    // DOM HOOKS
    // ============================================================
    const screenStatus = document.getElementById("screenStatus");
    const displayEl = document.getElementById("display");
    const configArea = document.getElementById("configArea");
    const directionRow = document.getElementById("directionRow");
    const colorRow = document.getElementById("colorRow");
    const toneRow = document.getElementById("toneRow");
    const toneNote = document.getElementById("toneNote");
    const arrowCount = document.getElementById("arrowCount");
    const arrowButtons = document.querySelectorAll(".arrow-btn");
    const vendBtn = document.getElementById("vendBtn");
    const journalBtn = document.getElementById("journalBtn");
    const readingDiv = document.getElementById("reading");
    const downloadPdfBtn = document.getElementById("downloadPdfBtn");
    const pdfActions = document.getElementById("pdfActions");
    const journalTeaser = document.getElementById("journalTeaser");
    const journalInfo = document.getElementById("journalInfo");
    const focusGrid = document.getElementById("focusGrid");

    // ============================================================
    // HELPERS
    // ============================================================
    function createSection(title, bodyHtml, metaHtml = "") {
        const sec = document.createElement("div");
        sec.className = "reading-section";
        sec.innerHTML = `
      <div class="reading-title">${title}</div>
      ${metaHtml ? `<div class="reading-meta">${metaHtml}</div>` : ""}
      <div class="reading-body">${bodyHtml}</div>
    `;
        return sec;
    }

    function listToHtml(items) {
        if (!items || !items.length) return "";
        return `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
    }

    function getToneRefinement(key, toneName, focus) {
        // Optional: you can add tailored lines later
        return "";
    }

    function renderFocusButtons() {
        focusGrid.innerHTML = "";
        Object.entries(focusContent).forEach(([key, item]) => {
            const btn = document.createElement("button");
            btn.className =
                "choice-btn focus-btn" + (selectedFocus === key ? " selected" : "");
            btn.dataset.focus = key;
            btn.innerHTML = `<strong>${item.label}</strong><span>${item.title}</span>`;
            btn.addEventListener("click", () => {
                selectedFocus = key;
                renderFocusButtons();
                if (!currentArrowKey) {
                    displayEl.innerHTML = `
            <div class="display-title">${item.title}</div>
            <div class="display-meta">${item.label} focus selected</div>
            <div class="display-body">${item.intro}</div>
          `;
                } else {
                    openArrow(currentArrowKey);
                }
            });
            focusGrid.appendChild(btn);
        });
    }

    function renderDirectionButtons(key) {
        directionRow.innerHTML = "";
        ["L", "R"].forEach(val => {
            const btn = document.createElement("button");
            btn.className =
                "choice-btn" + (selection[key].direction === val ? " selected" : "");
            btn.textContent = val === "L" ? "Left" : "Right";
            btn.addEventListener("click", () => {
                selection[key].direction = val;
                renderDirectionButtons(key);
                openArrow(key);
                updateCounts();
            });
            directionRow.appendChild(btn);
        });
    }

    function renderColorButtons(key, data) {
        colorRow.innerHTML = "";
        Object.entries(data.colors).forEach(([num, cfg]) => {
            const btn = document.createElement("button");
            btn.className =
                "choice-btn" + (selection[key].color === num ? " selected" : "");
            btn.textContent = `◯ ${num} — ${cfg.name}`;
            btn.addEventListener("click", () => {
                selection[key].color = num;
                renderColorButtons(key, data);
                openArrow(key);
                updateCounts();
            });
            colorRow.appendChild(btn);
        });
    }

    function renderToneButtons(key, toneSet) {
        toneRow.innerHTML = "";
        toneLabels[toneSet].forEach(item => {
            const btn = document.createElement("button");
            btn.className =
                "choice-btn" + (selection[key].tone === item.value ? " selected" : "");
            btn.textContent = `▲ ${item.label}`;
            btn.addEventListener("click", () => {
                selection[key].tone = item.value;
                renderToneButtons(key, toneSet);
                openArrow(key);
                updateCounts();
            });
            toneRow.appendChild(btn);
        });

        toneNote.textContent =
            toneSet === "cognition"
                ? "Determination and Environment use the cognition tone set."
                : "Motivation and Perspective use the mental tone set.";
    }

    function updateCounts() {
        const loaded = Object.values(selection).filter(
            x => x.direction && x.color && x.tone
        ).length;
        screenStatus.textContent =
            `${loaded} / 4 arrows loaded · Top Right = Motivation, Bottom Right = Perspective`;
        arrowCount.textContent = `${loaded} / 4 arrows loaded`;
        vendBtn.disabled = loaded !== 4;
        downloadPdfBtn.disabled = true;
        pdfActions.style.display = "none";
        journalTeaser.style.display = "none";

        arrowButtons.forEach(btn => {
            const key = btn.dataset.arrow;
            const s = selection[key];
            btn.classList.toggle("complete", !!(s.direction && s.color && s.tone));
        });
    }

    // ============================================================
    // OPEN ARROW
    // ============================================================
    function openArrow(key) {
        currentArrowKey = key;
        configArea.style.display = "block";

        if (key === "determination") {
            const det = determinationData;
            const sel = selection.determination;

            const directionLabel = sel.direction
                ? det.directionText[sel.direction]
                : "Direction not set";

            let colorText = "Color not set";
            if (sel.color && sel.direction) {
                const colorObj = det.colors[sel.color];
                const variantObj = colorObj.variants[sel.direction];
                colorText = `${colorObj.name} – ${variantObj.name}`;
            }

            const toneSet = det.toneSet;
            const tone = sel.tone ? toneContent[toneSet][sel.tone] : null;
            const toneText = tone ? tone.name : "Tone not set";

            displayEl.innerHTML = `
        <div class="display-title">${det.label}</div>
        <div class="display-meta">${focusContent[selectedFocus].label} focus • ${sel.direction ? (sel.direction === "L" ? "Left" : "Right") : "No"
                } direction • ${colorText} • ${toneText}</div>
        <div class="display-body">
          ${det.intro}
        </div>
      `;

            renderDirectionButtons("determination");
            renderColorButtons("determination", det);
            renderToneButtons("determination", det.toneSet);
            return;
        }

        // NOTE: environment/motivation/perspective will be wired the same way once their data objects are filled.
        displayEl.innerHTML = `
      <div class="display-title">Coming soon</div>
      <div class="display-meta">${key} content not wired yet</div>
      <div class="display-body">
        Determination is live. Environment, Motivation and Perspective will be added once their content is ready.
      </div>
    `;
        directionRow.innerHTML = "";
        colorRow.innerHTML = "";
        toneRow.innerHTML = "";
        toneNote.textContent = "";
    }

    // ============================================================
    // BUILD SECTIONS FOR SCAN
    // ============================================================
    function buildDeterminationSection() {
        const det = determinationData;
        const sel = selection.determination;
        const focus = selectedFocus;

        if (!sel.direction || !sel.color || !sel.tone) {
            return document.createElement("div");
        }

        const tone = toneContent[det.toneSet][sel.tone];
        const colorObj = det.colors[sel.color];
        const variantObj = colorObj.variants[sel.direction];
        const topicBlock = variantObj.topic[focus];
        const shadowBlock = variantObj.topic.transference;
        const toneRef = getToneRefinement("determination", tone.name, focus);

        const meta = `
      <span class="pill"><span class="pill-dot"></span>${sel.direction === "L" ? "Left" : "Right"} Determination</span>
      <span class="pill"><span class="pill-dot"></span>${colorObj.name} – ${variantObj.name}</span>
      <span class="pill"><span class="pill-dot"></span>${tone.name} tone</span>
    `;

        const body = `
      <p>${det.intro}</p>
      <p><strong>${sel.direction === "L" ? "Left" : "Right"} Determination:</strong> ${det.directionText[sel.direction]}</p>
      <p><strong>${colorObj.name} overview:</strong> ${colorObj.overview}</p>
      <p><strong>${variantObj.name} general:</strong> ${variantObj.generalIntro}</p>
      <p><strong>When supported:</strong> ${variantObj.whenSupported}</p>
      <p><strong>${focusContent[focus].label} expression:</strong> ${topicBlock.description}</p>
      <p>${topicBlock.examples}</p>
      <p><strong>How to apply it here:</strong> ${topicBlock.application}</p>
      <p><strong>${tone.name} tone:</strong> ${tone.summary}</p>
      ${toneRef ? `<p><strong>Tone in this topic:</strong> ${toneRef}</p>` : ""}
      <p><strong>Manifestor angle:</strong> ${manifestorNotes.determination[focus]}</p>
      <p><strong>Transference in this area:</strong> ${shadowBlock.description}</p>
      <p>${shadowBlock.examples}</p>
      <p><strong>Coming back from transference:</strong> ${shadowBlock.application}</p>
      ${listToHtml(actionPrompts.determination[focus])}
    `;

        return createSection(det.label, body, meta);
    }

    // ============================================================
    // EVENT HANDLERS
    // ============================================================
    arrowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            arrowButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            openArrow(btn.dataset.arrow);
        });
    });

    vendBtn.addEventListener("click", () => {
        readingDiv.innerHTML = "";

        const focus = focusContent[selectedFocus];

        readingDiv.appendChild(
            createSection(
                focus.title,
                `<p>${focus.intro}</p>
         <p>This run uses the same variables data but applies it specifically to ${focus.label.toLowerCase()}. It is designed for repeat use, not a one‑off generic report.</p>`
            )
        );

        // Determination section (live)
        readingDiv.appendChild(buildDeterminationSection());

        // TODO: add Environment, Motivation, Perspective once wired
        // readingDiv.appendChild(buildEnvironmentSection());
        // readingDiv.appendChild(buildMotivationSection());
        // readingDiv.appendChild(buildPerspectiveSection());

        readingDiv.appendChild(
            createSection(
                "How to Work With This Scan",
                `<p>Do not try to overhaul all four arrows at once. Pick the section that feels loudest in this focus and start with one experiment there. Variables come alive through lived testing, not memorisation.</p>`
            )
        );

        readingDiv.appendChild(
            createSection(
                "Manifestor Wrap‑Up",
                `<p>Your variables are not here to make you easier for others. They show the conditions where your cognition and energy stop wasting themselves on compensation. That difference is everything for a Manifestor who initiates in bursts and needs real recovery.</p>
         <p>${focus.wrap}</p>`
            )
        );

        readingDiv.appendChild(
            createSection(
                "Integration Prompt",
                `<p>${focus.journal}</p>
         <p>Answer this in your journal, make one practical shift, then come back and run another focus when a different part of life gets loud.</p>`
            )
        );

        journalTeaser.style.display = "block";
        journalInfo.textContent = focus.journal;
        readingDiv.style.display = "block";
        pdfActions.style.display = "block";
        downloadPdfBtn.disabled = false;
        readingDiv.scrollIntoView({ behavior: "smooth" });
    });

    journalBtn.addEventListener("click", () => {
        window.location.href = "./variables-journal.html";
    });

    downloadPdfBtn.addEventListener("click", () => {
        window.print();
    });

    // ============================================================
    // INIT
    // ============================================================
    renderFocusButtons();
    updateCounts();
});
