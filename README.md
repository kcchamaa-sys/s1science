# Mochi Science Pals · 麻糬科學小夥伴

A bilingual (English / 繁體中文) pet-raising revision game for Hong Kong **S1 Science** (Units 1–6).
Single file: `index.html` (HTML + CSS + vanilla JS, no build step, no images – all pets and items are SVG).

## What's inside
- **6 units → 29 sub-topics → 650 questions** (Units 1–6 incl. Energy and Matter as particles; Unit 1 has **45 per sub-topic**, others at least 18; 142 with pictures), tagged by Bloom level (Remember → Create). Each quiz = **15 questions in random order**; the last 30 seen are skipped, so 3 visits to a Unit 1 sub-topic cover all 45. Stars: ★★★ = 14–15 correct, ★★ = 11+, ★ = 8+.
- **Study notes** per sub-topic (key points + bilingual key terms); a 20-second read with your pet earns coins + XP (once per sub-topic per day).
- **Science Pals 科學小夥伴** (the main characters): 12 original pets (Mochi, Matcha, Sakura, Pudding, Soda, Taro, Kinako, Goma, Mikan, Nori, Ume, Wata) with Energy, Happiness and Level; moods (overjoyed, happy, sleepy, hungry, lonely, studying); 3 evolution stages.
- **Care loop**: feed snacks, play *Term Match* (EN ↔ 中文), dress up (1 item per slot: hat, glasses, accessory, handheld), decorate the room (1 item per group: wallpaper, science corner, nature corner, cosy corner, science sticker, fun sticker).
- **Special items**: 29 themed collectibles (one per sub-topic) unlock free with a 3/5+ quiz score, with an animated reveal.
- **Streak pop-ups**: animated reminders on return, celebration on each new day, milestone confetti (3/7/14/21/30/50/75/100/150/200 days), Streak Freeze and welcome-back messages.
- **British pronunciation**: every key term (232) has 🔊 normal and 🐢 slow playback in an en-GB voice (Web Speech API) plus British IPA; each unit has a *Listen & Repeat* vocab list; English Term Match cards speak when flipped; quiz questions can be read aloud in English mode.
- **Context & pictures**: experiment-based questions show a 📋 context box so students don't need to remember the textbook set-up; 37 picture questions use inline SVG diagrams (hazard symbols, apparatus, measuring cylinder, Bunsen flames, heating curve, water cycle, filtration, distillation, animals, plant cell, microscope, reproductive system, foetus, bar chart vs histogram, Sankey, convection, particle model, bimetallic strip, displacement, density column, identification key).
- **Dictation (默書)**: two ways – 🔊 *Listen & spell* (British voice) or 🖼️ *Meaning / picture* (a short definition for all 232 terms, plus diagrams for about 50 terms). Choose a whole unit, one sub-topic or *My missed words*; 2 tries per word, letter-count boxes, hint (Chinese + first letters), results recorded for teachers (most-misspelled words, dictation accuracy per student, Excel sheet).
- **Pictures** (`img/*.svg`): original illustrations drawn in the style of the school's S1 Ch 1 revision notes (school-style hazard symbols, safety equipment, apparatus, Bunsen burner parts, sectional diagrams, measuring instruments). Used in quizzes, dictation and the study notes.
- **Study notes with pictures**: 60+ diagrams sit directly under the note point they explain, each with a caption and a colour key (letter → English + 中文). Tap 🔍 to enlarge. Unit 5 (Energy) diagrams follow the textbook: forms of energy, energy-conversion chains, swinging bean bag, can on a ramp, Sankey diagram of a fan, conduction along a copper rod, convection with smoke, sea/land breezes, black vs silver flasks, vacuum flask, energy sources, greenhouse effect and the energy label. Every label line ends in a dot on the exact part. Biology diagrams (microscope, plant cell, reproductive systems, foetus, specialised cells) are drawn with textbook-accurate shapes in a soft, age-appropriate style. An automatic check (every figure, English and Chinese) confirms no text or drawing goes outside its picture or its box.
- **Pet chat**: the pet shares 47 fun science facts (Hong Kong examples included) and personalised encouragement on the home screen, in study notes and after quizzes.
- **Rarity tiers**: Common / Rare / Epic / Legendary. Sub-topic items need 3★ (earlier unlocks are kept); unit-mastery rewards are Epic; Legendary items and the legendary pet come from very hard milestones (see the 🎯 Quests tab). 19 new items and 3 new pets (+25%), plus 5 Hong Kong / Gen Z items (pineapple-bun hat, egg-waffle cone, ding-ding tram, neon street wallpaper, 「科學好正！」 sticker).
- **🌈 Mythic tier** (rarest): 10 original outfits inspired by popular cartoon styles (thunder-creature hood, piglet ears, magical-girl moon tiara and starlight wand, superhero cape, festival fox mask, fireworks castle wallpaper, monster-trainer cap, power gauntlet, anime sailor collar). Unlocked only by 40–200-day streaks or huge challenges (all sub-topics 3★ + 50-day streak, 1,500 correct answers, 500 dictation words). No official names, logos or artwork are used.
- **Class login**: students on the school name list sign in with Google; progress syncs to the cloud and every quiz/study session is recorded. Teachers (教職員) get a 📊 dashboard with a 📈 Charts view (accuracy by class, students taking part, monthly progress by class, accuracy by unit, a pie chart of how students practise and a pie chart of who is active – each with a one-line 💡 insight and tap/hover numbers), a 📋 Tables view with class and individual statistics, and an Excel export. Guests can still play offline. Setup: `server/SETUP.md` (server code: `server/Code.gs`). Student names are never stored in this repo.
- **🐾 Pets for your Science Pal** (12 companion pets based on real species, each with a bilingual background story and a science fact): Hong Kong shop cat, British Shorthair, Ragdoll, Maine Coon, Shiba Inu, Hong Kong local dog (唐狗), Pembroke Welsh Corgi, Golden Retriever (guide dog), and Hong Kong butterflies – Plain Tiger, Paris Peacock, Orange Oakleaf and Common Birdwing. They are unlocked **only** by dictation challenges (words spelled, perfect rounds, dictation days) and long study streaks. The chosen pet lives in Mochi's room.
- **Phone layout fixes**: tab rows (shop, collection, teacher views) wrap onto extra lines instead of hiding off-screen; the bottom nav shares the width evenly however many tabs it has (fits 360 px phones); the home Science Pal advert's buttons wrap; teacher data tables turn into one card per row on phones (every column labelled, sort buttons shown as chips), so nothing is cut off.
- **Lucky Capsule 幸運扭蛋** (replaces the old daily gift on Home):
  - One capsule a day, unlocked by today's first quiz or study session, so every capsule is also a streak day.
  - A cute gachapon "Lucky Lab" machine: crank turns, capsules mix, one drops and bounces. It can **upgrade** (blue → purple → gold → rainbow) with flashes, then bursts open into a prize card with spinning rays. Legendary and mythic pulls get a banner, screen shake and confetti.
  - **Luck rises with the streak** at 20 / 40 / 60 / 80 / 100 days (shown as a luck meter with the current odds):

    | Streak | Common | Rare | Epic | Legendary | Mythic |
    |---|---|---|---|---|---|
    | 0–19 days | 60% | 28% | 9% | 2.5% | 0.5% |
    | 100+ days | 20% | 28% | 28% | 16% | 8% |

  - Pity rule: epic or better is guaranteed within 10 draws.
  - **Prizes**: coins, snacks, Streak Freezes, shop decor you don't own yet, and capsule-only items:
    - 10 new apparatus / measuring-tool decorations:
      - Rare: thermometer, tape measure, measuring cylinder.
      - Epic: Bunsen burner, stopwatch, tripod & bubbling beaker.
      - Legendary: Newton's spring balance, rainbow titration set.
      - Mythic: galaxy hourglass, apparatus-constellation wallpaper.
    - 3 new capsule-only Science Pals:
      - **Bunsen** (legendary Bunsen burner, +10% quiz coins).
      - **Cylie** (legendary measuring cylinder, +6% XP).
      - **Gram 克克** (mythic electronic balance with TARE/ON buttons, a spirit-level antenna and a "♥520.00 g" screen; +6% coins & XP).
  - Prize cards can set a new pal as active or place a decoration in the room straight away. Save codes moved to version 14 (older codes still load).
- **Fog battle 2.0 (Nobel Quest boss)**:
  - **Knowledge Points**: a right answer earns 1 KP (max 5). On your turn, spend them: Quick Strike (1 KP, 100), Mend (2 KP, +1 heart) or the chapter's Heavy Blast (3 KP, 300, e.g. Radium Radiance). Or save them. Wrong answers heal Murk and cost a heart; answering in under 2.5 s is "dodged".
  - **Pal stances** (chosen before the battle): Striker (3-combo Nobel-winner assist), Protector (your pal absorbs the next 2 wrong-answer hits) or Scholar (one wrong option fades on every other question).
  - **Chapter rewards are now battle gear** (equip 2):
    - Radium vial: damage over time.
    - Lead-lined box: blocks the first hit.
    - Mould and qinghao items: halve Murk's healing.
    - Culture kit and herb jar: cheaper Mend.
    - Fibre items: extra countdown time; the fibre lamp also clears 2 wrong options once.
    - Alpha sticker: weakens the shield.
    - Gold foil: stronger Heavy Blast.
    - Gene scissors: stronger Quick Strike.
    - DNA helix: extra KP on combos.
  - **Phase 2 at half HP**: Murk raises a Fog Shield (half damage) that only cracks with "Shield Breaker" science questions, and a countdown timer starts (time-out = wrong). Murk can't skip this phase.
  - **Murk absorbs the task you leave for last**:
    - Illusion Fog: trick true/false + timer from the start.
    - Chrono Murk: date questions, all timed.
    - Babel Murk: word questions, heals +150.
    - Brute Murk: 1,200 HP.
    - Mirror Murk: thicker shield.
    - Textbook Murk: S1 textbook questions.
  - **Opening bonus from your first task in a chapter**: Storyteller (+1 KP), Speed Reader (+6 s), Chronologist / Articulate / Textbook Ace (1.5× damage after date / word / science questions), Field Experience (an extra pal heart), Sharp Eye (first wrong answer doesn't heal Murk). The chapter page shows both your bonus and the Murk you'll meet.
  - **Knowledge as keys in the Story**: if you did the Timeline first, its dates glow in the story (tap for the event + 5 coins). The scientist also remembers whether you've done the Lab mission or Word Vault.
  - **Question pool**: 90–110 per chapter instead of 16. The 16 originals, plus 48 new bilingual science-concept questions (8 per chapter, used as Shield Breakers), plus the linked S1 textbook section, plus date, timeline-order, word (EN↔中) and true/false questions generated fresh each battle with new distractors. Option order is shuffled and recently seen questions are pushed to the back.
  - **Fixes**: the VS intro no longer covers the names or your pal; HP/hearts sit in a bar above the arena so they never cover Murk; lost hearts now visibly grey out.
- **❄️ Streak Freeze 連勝凍結** (shop tab right after Science Pals):
  - Every student starts with **3**; after that **1 free freeze refills each new month** (never above 3).
  - Extra freezes cost **150 🪙** each, so they stay precious.
  - If a day is missed, a freeze **switches on by itself** and keeps the streak (2 missed days use 2). Frozen days show as ❄ on the home week row, a pop-up explains it on return, and pets don't get sick on covered days.
- **Streak-risk reminder**: when a student hasn't studied yet today, their Science Pal appears at the top of Home with a speech bubble. It shows the time left today and the freezes left, plus Quick quiz / Read notes buttons. It turns red and pulses in the last 3 hours or when no freezes are left, and says so when a freeze has just been used.
- **Trophy cards 3.0** (collectible trading-card layout: title bar + rarity symbol, illustration window, description, progress or date stamp + reward):
  - Every card shows **two Science Pals in a "lab incident"**, set in one of 5 lab rooms: chemistry lab, observatory, physics lab, library attic, greenhouse. Incidents are foam mishaps, eureka moments, powering a reactor together, reading/napping, dress-up with a score paddle, and growing a giant flower.
  - Effects use ink-brush outlines, speed lines, bloom glows and particles (bubbles, spores, sparks, embers).
  - 4 rarity frames: matte bronze, silver holo with a sweeping sheen, embossed gold with an inner glow, and a new **rainbow secret rare** with stardust for the biggest goals.
  - Progressive reveal: under 25% shows a dark silhouette behind frosted glass with a glowing padlock; 25–60% lets colours bleed through; 60–90% shows the art under thinning glass; 90%+ is fully visible with a pulsing "Almost there!" banner.
  - New unlocks play a ceremony: smoke and glowing cracks, a slash with two inverted impact frames, a snap-zoom on the pal, then a springy settle.
  - Tapping a pal on an opened card makes it flinch with a spark burst. Tilting or dragging moves the layers and tips the liquids.
  - In the grid each scene is drawn once as a cached image, so scrolling stays smooth; full animation plays when a card is opened.
- **No more system emoji**: all ~190 emoji in the game (buttons, tips, pop-ups, quests, nutrition, food) are swapped for original 2-tone icons in the game's own style (mochi faces for emoji faces, the shop's food art for food), so the game looks the same on every phone and computer.
- **Pets 2.0 art**: all 14 companion pets are redrawn as chubby mochi-bean mascots, with thick chocolate-brown outlines, soft 2-tone shading, a warm rim light and a soft drop shadow. Each keeps the real species markings so students can recognise it:
  - Maine Coon ear tufts and a bushy tail wrapped round the body.
  - British Shorthair round cheeks, slate-grey plush coat and copper eyes.
  - Calico/tabby shop cat with a red market collar and bell.
  - Ragdoll dark face mask and blue eyes.
  - Corgi giant ears and heart-shaped peach behind.
  - Shiba donut tail and cream urajiro cheeks.
  - 唐狗 lean erect ears and black muzzle.
  - Golden Retriever floppy ears, chest feathering and open smile.
  - Accurate wing patterns for Paris Peacock, Common Birdwing, Orange Oakleaf (blue/orange top, leaf-vein underside hint) and Plain Tiger.
  - Hong Kong newt with orange warning spots, and Romer's tree frog.
  The Nobel scientists are redrawn in the same soft-shaded style but stay human. All art is original SVG.
- **🏥 Pet health**: if the study streak stops, the pets get sick, and a longer break makes it worse (1 missed day = hungry, 2–3 = cold, 4–6 = fever, 7+ = very sick; days covered by a Streak Freeze don't count). Students buy medicine at the clinic (15 / 35 / 70 / 120 🪙). Until the pets are cured, Mochi's outfits are hidden, dress-up is locked, and Mochi gives gentle, encouraging messages.
- **🎤 Read aloud (朗讀)**: students hear the British pronunciation, then say the word. The browser's speech recognition (en-GB) checks it, and gives 3 tries, "so close" feedback, and a "My tricky words" list. If the browser or microphone is not available, it switches to self-rating. Teachers see read-aloud records and the hardest words to say (also in the Excel export).
- **💚 Health tips by time of day** (device clock): breakfast and water in the morning, water and exercise in the afternoon, the 20-20-20 eye rule in the evening, and "sleep by 10:30 or you'll be sleepy at school tomorrow" on school nights. Late at night (after 10 pm) Mochi looks sleepy and a gentle "time to rest" pop-up appears once an hour. A long session (40+ min) triggers a break reminder.
- **🏆 Class leaderboard** on the Home screen (signed-in students only): top 20 for 🌟 Effort (total XP), 🔥 current streak and 🎀 collection (with 👑 legendary / 🌈 mythic counts), for "My class" or "All S1". Full names are shown (only to signed-in students on the class list), the top 3 get thank-you messages, and each student sees their own rank.
- **✨ Epic unlock effects**: legendary unlocks get a golden light burst, beams, a falling-gold shower, a crown drop and a fanfare. Mythic unlocks get a night-sky aurora, a rainbow light orb and flash, a holographic card flip, rainbow beams, star showers and a harp sound. There are preview buttons in 🎯 Quests. Pets wearing legendary / mythic outfits glow with a gold or rotating rainbow aura.
- **🦈🦉 Mythic Science Pals**: Finn the shark (2,000 🪙) and Luna the moon owl (5,000 🪙) can only be adopted with coins, with a mythic unlock animation and a rainbow aura.
- **🍱 Food 2.0**: 20 foods, each with its own original drawing (e.g. HK milk tea in a cup, iced lemon tea with ice and a lemon slice, pineapple bun, siu mai, egg tart) and a 🔍 nutrition card (approx. energy, carbohydrate, protein, fat, sugar and salt per typical serving, a 🟢 everyday / 🟡 sometimes / 🔴 treat rating and a one-line analysis); prices from 3 🪙 to 200 🪙 (Hong Kong favourites such as curry fish balls, siu mai, egg tarts, pineapple buns and wonton noodles). Foods change energy, happiness and XP differently. Boost foods multiply XP and/or coins for 20–30 minutes (🫐 ×1.3 XP, 🌰 ×1.5 XP, 🍵 ×1.3 coins, 🥮 ×2 both). Every pet has a ❤️ favourite food (double happiness). Eating 3 sugary snacks in one day causes a "sugar crash" (−15 energy) and a healthy-eating tip.
- **📅 Daily mission**: one mission a day on the Home screen, chosen from 30 story events (e.g. "Detective Mochi", "Boss battle", "Power cut!", "Radio host"). It targets what each student avoids or finds hardest: their weakest sub-topic or unit, unread notes, mistakes waiting in 錯題本, missed dictation words, read-aloud practice or Term Match. Completing it gives 40 🪙 and a snack.
- **📚 45 questions in every sub-topic (Units 1–6, 1,305 in total)**: Units 2–6 got about 650 new bilingual questions (round 4, in the same style as the Unit 1 expansion): new scenarios, calculations, true/false traps, "which is BEST" judgements and design-a-test questions across all six thinking levels. They are appended after the old ones, so saved progress and mistake lists stay valid. Each quiz still picks 15 at random.
- **🃏 Trophy cards 2.0**: each card is an action scene. A Science Pal performs inside an ink-brush elemental effect: bronze = Mochi running through swirling vines and autumn leaves; silver = a crimson-gold fire dragon circling Mochi or Solara; gold = Petal or Nova floating in electric-blue / gold / violet lightning with a crackling halo. Scenes loop gently, have scroll and tilt parallax (background, pal and foreground move at different depths), and play a reveal the first time a card is earned (smoke, the frame slams in, the pal bursts out, a quick 3D tilt).
  - **Teaser board** instead of a wall of locks: earned cards first, then "in reach" cards (≥ 50%) with full art and a "N more to unlock" ribbon (pulsing gold at ≥ 90%), then silhouette cards (glowing rim light, frosted glass that clears as progress rises), then secret holographic foil cards for the hardest gold trophies.
  - **Tap to peep**: a locked card opens a big preview with its goal, a progress bar and a button that goes straight to the right activity (quiz, 錯題本, dictation, shop, read-aloud…).
- **⚡ Smooth trophy page**: scenes no longer use the costly ink filter, blur or blend effects. Brush texture now comes from layered strokes, and shimmer effects slide instead of repainting. Only cards on screen animate, and locked cards are still pictures. Measured on a 4× slowed CPU: idle 13 → 60 fps, scrolling 6 → 49 fps.
- **🛍️ Shop**: Science Pals is now the first and default tab. The tab has a glowing gradient, a sliding shine and a HOT badge. The pals page opens with a "Collect every Science Pal!" header (owned pals in colour, others as silhouettes, a rainbow progress bar and perk chips), and the rarest pals are listed first.
- **🌟 Featured Pal advert (home)**: a banner for a legendary or mythic pal you don't own yet. The pal's head and ears pop out above the frame. Legendary pals get a golden-hour background with sweeping light beams; mythic pals get a rotating holographic rainbow with stardust. The banner also shows:
  - floating particles for the pal's science branch (biology / chemistry / physics / astronomy & Earth);
  - a perk badge, the pal's unlock progress, and an arrow carousel to browse the other pals;
  - a 3D button that goes straight to how to earn the pal: "🪙 2000 ADOPT" (shop), "🔬 UNLOCK IN UNIT 3" (that unit's dictation), "Nobel Quest", or "Study now".
- **🔤 Fonts**: Chinese text uses Huninn (粉圓, rounded Traditional Chinese), so every character, including 糬, matches. English letters and numbers keep M PLUS Rounded 1c, which is loaded as a Latin-only subset so it never draws Chinese.
- **🌤️ Login screen**: Mochi (safety goggles + flask, waving) and Petal (rising light motes) bob on a floating grassy island over a cream-to-sky gradient with drifting flasks, atoms, leaves and DNA. Big Google-blue sign-in button on a 3D base, a language pill and music toggle at the top right, and two teaser cards ("Study science daily", "Raise Mochi, Petal & 23+ pals"). The backdrop has a faint lab dot-grid with a scan-line, breathing lavender/mint glows, three glowing 3D atomic orbit rings behind the pals, and three particle depths (stardust, floating science icons, blurred foreground bubbles) that move with the mouse or phone tilt.
- **🔐 Sign-in**: students on the S1 class list sign in with their school Google account. **School guest mode**: other accounts on the school's Google domain that are not on the class list can still play, with progress saved only on that device (stored per account). They get no leaderboard, no class records and no cloud save. Accounts outside the school domain are refused. If a device still has old guest progress, the student is asked once whether to move it into their account (only if it's theirs). Copies with class sign-in switched off (e.g. the preview artifact) show a **Preview mode** for teachers instead.
- **🎨 UI 2.0 (tactile game style)**:
  - Custom 2-tone vector icons replace system emojis in the header, stats, action grid, streak card, nav bar and rarity badges, so they look the same on every device.
  - "Clay" buttons, chips and tabs have a darker bottom edge and sink when pressed. Progress bars are thicker, with a gloss line and a darker lower edge.
  - Speech bubble has a tail, a typewriter effect and quick-action chips (Quick quiz, plus Feed / Play / Clinic / Dictation depending on the pal's needs). A bobbing idea bulb starts a quiz when today's study isn't done yet.
  - Legendary cards have a gold light sweep, glow and rising gold dust. Mythic cards have a rotating rainbow holo border, foil shimmer and an orbit ring. Both tilt in 3D on hover and burst sparkles on tap.
  - Locked pals show a glowing silhouette (gold / rainbow), a gold or crystal padlock and a progress bar to their unlock goal.
  - Legendary / mythic unlocks play a ceremony: a gift box shakes 3 times, bursts open with rays, the card flips in, and a "Set as my active pal" button appears.
  - Leaderboard: top-3 podium (crown, medals, gold / silver / bronze frames), bigger avatars with level badges, coloured score pills and a sticky "my position" bar ("only N more to pass #4 …").
  - Trophies are trading cards: bronze matte, silver reverse-holo and gold ultra-rare finishes, rarity symbol, +20 coin reward corner, completion stamp or progress bar. Locked cards are dark "mystery foil". Tap a card to inspect it and tilt it by dragging (or tilting the phone).
- **👑 Legendary Unit Pals (dictation mastery)**: 6 dessert / flower pals, one per unit, each showing its unit:
  - **Professor Flan 布甸博士** (U1 lab safety): caramel pudding with safety goggles and a test tube.
  - **Lotus Dewdrop 蓮露露** (U2 water): lotus on a lily pad with a water drop and waves.
  - **Dandy 蒲蒲** (U3 living things): dandelion seed-puff crown, leaves and a ladybird.
  - **Strawberry Daifuku 草莓大福** (U4 cells): its tummy is a cell (membrane, cytoplasm, strawberry nucleus).
  - **Solara 陽陽** (U5 energy): sunflower petals and a lightning badge.
  - **Gelato 粒粒** (U6 particles): mint gelato with sprinkle "particles".
  - **Unlock:** master 90% of the unit's dictation words. A word is *mastered* after a first-try, no-hint correct answer on 2 different days. Progress shows in the dictation setup; results show "+N words mastered".
- **✨ Pal perks** (only for the active pal, kept small): Nova +8% XP; Finn +8% coins; Luna +20% on 錯題本 / missed-word practice; Petal +12% quiz XP; Riccio +5% coins & XP; each Unit Pal +15% coins & XP on its own unit's quizzes, dictation and read-aloud.
- **🧗 Tougher evolution** for legendary & mythic pals:
  - Legendary: Lv 7 / 13 and 250 / 600 🪙. Unit Pals also need 2★ (then 3★) in every sub-topic of their unit, plus every unit word mastered for the final stage. Nova needs a 7-day best streak, then 3★ in 15 sub-topics.
  - Mythic: Lv 8 / 15 and 400 / 900 🪙, plus a 14-day best streak, then 3★ in 22 sub-topics and 120 mastered dictation words.
- **🌈 Evolution routes**: every pet evolves into one of 3 colour variations (same character, new colours + a small mark). 🌿 Scholar (finish 8 quizzes with that pet), 🌊 Ocean (feed it 10 healthy meals) and a 🌌 secret Galaxy route that shows only as a silhouette until its hidden challenge is done (3 brain-boost foods + a 5-day streak). Students can re-choose at the next evolution, or change look at the final stage for 150 🪙.
- **Home layout**: on wide screens the Home page uses two balanced columns (room, streak, daily mission, Mochi's pets | pet card, chat, leaderboard, next step); phones keep one column.
- **Retention**: daily streak with reward multiplier (up to ×1.5) and ❄️ Streak Freezes, daily gift, 30+ trophies (streak trophies up to 200 days), collection gallery.
- **錯題本 Mistake Bank**: wrong answers are saved automatically; answer one right twice in a row to clear it (+6 coins).
- **Saving**: auto-saves to `localStorage` key `s1SciencePals_v1`; 💾 gives a save code + share link (`…/#CODE`) to move devices, with preview and checksum. Codes from every earlier version (v1–v6) still load; the current format is v16 (v13 added the 6 Unit Pals, v14 the capsule items, v15 the co-op pal Lumi, v16 raised the per-pal XP limit from 20,475 to 327,675).

## 🏅 Nobel Time Quest (season event, Oct 2026 – Mar 2027)
- A separate **Nobel** tab with its own dark neon style, holographic cards and synth music (a faster track for the boss battle).
- **Story arc:** Murk, the Fog of Forgetting, has trapped two Science Pals. Students learn from six Nobel Prize winners to win six *Sparks of Discovery*.
- **One chapter unlocks on the 1st of each month:** Marie Curie (Oct), Alexander Fleming (Nov), Charles Kao (Dec), Tu Youyou (Jan), Ernest Rutherford (Feb), Jennifer Doudna & Emmanuelle Charpentier (Mar). Chapters stay open once unlocked, so late starters can catch up.
- **8 tasks per chapter (about 30–45 minutes):** 🎬 visual-novel story (8 scenes, Nobel winners drawn as cartoons talking with your Science Pal and Murk) · 📖 reading (6 pages, about 550 words, a check on every page) · 🧩 timeline (6 events) · 🔤 word vault (8 words) · 🧪 lab mission (hands-on: order the method, read data, aim a laser, fire alpha particles, match DNA bases…) · 🕵️ claim check (true/false AND the right evidence) · ⚔️ fog battle · 🔬 textbook quiz link.
- **No winning by guessing:** reading: a wrong answer costs a heart, starts a 12-second re-read timer and swaps in a different question (4 hearts); timeline / word vault: 3 wrong = fail; claim check: need 5 of 6 with the right evidence; lab: 4 mistakes = fail; boss: a wrong answer heals Murk and triggers one of his attacks, answers faster than 2.5 s are dodged. A failed task locks for 1–3 minutes.
- **Rewards after every task:** 1–3 ★ grade by mistakes, coins, food, and 18 story decor items unique to the quest (per chapter: a sticker for Reading, a decor piece for the Lab mission, a wallpaper for the Fog battle).
- **Painterly storybook films:** a watercolour prologue (golden hour → ink-dark dusk → the Lantern's gold) and a finale after the Chapter 6 fog battle (ink storm → black-sun eclipse → constellation of Nobel winners → gilded brushstroke → watercolour splash sunrise). Multiplane parallax, spirit pollen, dust beams, ink-wash tendrils, shattering shadow-glass. Replay both from the Nobel page. The art direction and ready-to-use AI prompts are in `docs/NOBEL_FX_BRIEF.md`.
- **Scientist medallions:** each chapter card shows the Nobel winner inside a round frame over the original symbol art, so nothing covers the chapter title.
- **Fog battle:** Murk has horns, claws, a glowing core, a rage phase and four named attacks (Fog Tide, Oblivion Beam, Shadow Hail, Mind Mist); 3 right answers in a row bring in the chapter's Nobel winner for a special assist.
- **Rewards (shown in full on the quest page to advertise it):** 3 Sparks → Perk 1 "Garden of Virtue" in school blue (value: 立己立人, build yourself up and help others grow): Petal the Blossom Fawn, Kai the Hong Kong newt, a blue scholar beret and a 「立己立人」 scroll. 6 Sparks → Perk 2 "Hall of Star Maps" in maroon and white (sporty values: dare as much as you are able; train, cheer and win together): Riccio 利奇 the Star-Map Pangolin (team captain with a headband), Romer's tree frog, a maroon & white #93 team jersey and a hall sports trophy with an 搏盡 plaque.
- **Cut-scenes and battles:** letterboxed cut-scenes with camera moves, scene effects and typewriter text; turn-based boss battles with a VS intro, projectile attacks, hit bursts, damage numbers, combos and critical hits, an enraged phase, and victory/defeat screens (keys 1–4 and Enter work on a keyboard).
- **Advertising:** a glowing neon banner at the top of Home, a pop-up once before the season and once when each new chapter opens, and a red "!" on the Nobel tab.
- **Teacher dashboard:** a separate 🏅 Nobel Quest tab (join rate, Sparks per chapter and per class, progress groups, task heat-map, students not started, per-student table) plus a "Nobel 諾貝爾" sheet in the Excel download. Needs the latest `server/Code.gs` deployed (it adds two columns to the progress sheet).
- **Preview:** teacher accounts see every chapter; you can also add `#nobel-preview` to the web address.
- Content lives in `nobeldata.js` (in the build) and progress is stored in save code v11.

## 🏝️ Mochi Science Island 麻糬科學島 (co-op, class accounts only)
- A new **Island 小島** tab appears only for students and teachers signed in from the class list (not guests). It needs the latest `server/Code.gs` **and** `server/Coop.gs` deployed.
- **Squads of 2–4**, any class. One student creates a squad and shares a 6-letter invite code. Each player picks a role: Chemist (Units 2 & 6 ×1.5 materials), Biologist (3 & 4), Physicist (5 & 1) or Engineer (+20% everything, clears more Fog).
- **Materials come from real study:** every correct quiz / mistake-practice / dictation answer gives 1 material of that unit. **Soft cap:** full speed up to 30 a day, then 1 material per 3 correct (up to 45), plus 2 bonus coins per extra correct answer (up to 100 a day) for the normal game.
- **Co-op tasks:**
  - Daily **blueprint puzzle**: each member answers one part. If a part is wrong, a teammate can rescue it (+1 Eureka spark). All parts right = 1 Blueprint.
  - **Repair quizzes** clear the Fog (+1 Fog Crystal).
  - The **weekly Murk Raid** checks the squad's total correct answers on Sunday night.
- **Streak pressure (gentle):**
  - Construction only moves forward on days when **every** member studies.
  - A missed day uses a Squad Freeze (1 a week). After that, each absent member adds 1 Fog (max 10).
  - Fog 3+ switches off a building's perk. Fog 9+ lets Murk steal materials. A lost raid adds +3 Fog.
  - Squad-streak milestones (7 / 14 / 30 / 60 days) give Star Plans.
- **9 buildings:**
  - 6 unit buildings with 3 levels each: Safety Lab, Water Works, Greenhouse, Cell Clinic, Power Station, Particle Factory. Their perks help the squad: fewer repair questions, Fog blocks, daily snacks, +XP, +coins, material trading.
  - 3 wonders: Observatory, Science Museum, and the **Fog-Sealing Lighthouse**.
  - Costs grow fast (Lv 3 needs Star Plans and 5 squad days), so the island takes about a term.
- **End-of-term prize:** building the Lighthouse gives every member the mythic co-op pal **Lumi 燈燈** (+7% coins & XP) and the **Fog Sealers** trading-card trophy (save code v15).
- **Look & feel (Island 2.0):** a dark, cinematic ink style (original art, inspired by modern action anime): heavy ink lines and hatching, cold purple-grey gloom for Murk's fog, and glowing amber / cyan / neon science tech for the rebuilt town.
  - Each building has 3 stages, from hut to landmark: Safety Lab (shed → copper-pipe lab → glass-dome lab), Water Works (hand pump → filter tower → aqueduct citadel with glowing falls), Greenhouse (plastic sheet → glasshouse → geodesic biosphere), Cell Clinic (tent + microscope → clinic + pod → DNA-ring spire), Power Station (one panel + crank → panel array + coil → solar tower with lightning rods), Particle Factory (ice box → state-change chamber → accelerator ring with solid/liquid/gas orbs).
  - Fog is living ink smoke with tentacles that grows with the Fog meter. A fogged building turns grey with static, and reclaimed land glows with energy lines from the central sigil.
  - Motion effects: a level-up sequence (charge-up → black/white impact frames → shockwave that blows the fog away), a shockwave when a repair clears Fog, fog-creep tentacles when Fog rises, and materials flying into storage. Reduced-motion settings turn the flashes and movement off.
- **Teacher view** (on the Island tab): every squad with members, materials given, days studied and last study day. Teachers can remove a student and turn on **holiday mode**, which pauses the Fog.

### 🌧️ Living Island 3.0 – Phase 1: weather + the water system (automatic, on by default)
- **One Island Day (10–20 min):**
  1. Read last night's **Field Report** (what happened → why, with the S1 section → what next, plus an optional 1-question "Why?" check).
  2. **Study** as normal: every study day gives each member **+2 Ops** (island action points; up to 4 carry over).
  3. **Prepare** for tonight's weather.
  4. Do one **island task**.

  An **Island today** card shows the 4 steps as a ring and highlights only the next one.
- **Shared Hong Kong weather:**
  - The same for every squad on the same date (calm, cloudy, light rain, heavy rain or rainstorm), weighted by season: wet June–September, dry winter.
  - Tonight is certain. Tomorrow shows a chance of rain.
  - Mercy rules: never two severe nights in a row, at most 2 in any 7 days, a dry recovery night after every crisis, and a 7-night tutorial for new worlds (calm → light rain → heavy rain on night 3).
- **The water system is the science (S1 Unit 2):**
  1. Rain makes runoff (green space from the Greenhouse soaks some up).
  2. Storm drains and a retention pond carry it away.
  3. Too much runoff overflows as sewage pollution.
  4. The **treatment plant** cleans it: sedimentation → filtration → chlorination → fluoridation.
  5. What is left lowers **Clean Water** and **Health**.

  Without chlorination, germs make people ill. Fluoride protects teeth but does not kill germs.
- **Action + Reason prep:** clear the drains, lower the pond or store clean water. After choosing an action, students pick the scientific reason from 3 options (1 real concept, 2 real misconceptions). The right reason doubles the effect.
- **Treatment Plant puzzle:** the squad arranges its built stages in order. The right order runs at 100%, a wrong order at 50%, and the misplaced stages are explained. It is redone after each new stage, with 2 tries a day.
- **Task board:** 3 squad tasks a day, issued by the server so they cannot be re-rolled.
  - **Order the chain:** treatment works, water cycle, distillation, filtering, heating ice, scientific investigation.
  - **Sort and classify:** pollutes/saves water, separation methods, soluble/insoluble, solid/liquid/gas, absorbs/releases energy, what each treatment step does.
  - Rewards are Ops and Clean Water, never coins. Repeating a task within 7 days pays nothing.
- **Island Codex:** 6 concept cards (water cycle, runoff, sewage overflow, treatment order, chlorine vs fluoride, reservoirs), each with a Hong Kong example.
- **Never punishing study:**
  - The world never removes coins, XP, pets or materials.
  - A crisis adds at most +1 Fog, and never beyond Fog 5, so Murk's theft at 9+ still only comes from missed study.
  - Nights with absent members do half damage, and no meter falls below 15 (20 on missed days).
  - Holiday mode freezes the world.
- **Fully automatic:** the weather comes from the date and each night resolves the next time anyone in the squad opens the game or studies (missed nights are caught up), so no timers or daily teacher steps are needed.
- **Teacher view:** switch the world off/on and choose **gentle** mode (half the rain load); squads in crisis last night are listed.
- **How to play:** a button at the top of the Island tab opens **9 animated story cards** (swipe or Next) where the pals face Murk. Each card has a short looping scene and 2–3 "how it works" lines:
  1. The island is in trouble.
  2. How a day works (the loop).
  3. Team up.
  4. Study → materials.
  5. Build on squad days.
  6. Miss a day → Murk strikes (freeze shield, fog, repair beam).
  7. Puzzle rescue + Sunday raid.
  8. Weather + Prepare ×2.
  9. The Lighthouse seals Murk → Lumi.

  Reduced motion shows still frames.
- **Explore the island:**
  - Tap anywhere on the island (or use the arrow keys) and your own pal walks there, bobbing as it walks.
  - Stop next to a building, decoration, the plaza or a teammate to get an action chip: building science facts and info, "build here", the quest, or **Cheer** a teammate (they wave back with hearts).
  - Teammates' pals stand at fixed spots. Your position is saved on your device only.
- **Plan your own island (free building):**
  - The 6 science buildings can stand on any of **9 plots**. The first time you build one, a map opens: pick a plot, then press *Build here*.
  - **Neighbour links:** some pairs work better side by side (about one plot apart). The picker previews them before you build:
    - Water Works + Greenhouse = **Irrigation** (+10% Unit 2 and 3 materials)
    - Safety Lab + Cell Clinic = **Safe clinic** (+10% Unit 1 and 4)
    - Power Station + Particle Factory = **Energy link** (+10% Unit 5 and 6)
    - Power Station + Water Works = **Pumps** (+1 drainage on rainy nights, +10% Unit 5 and 2)
    - Water Works + Cell Clinic = **Clean & healthy** (+1 island health a night, +10% Unit 2 and 4)
  - A fogged building switches its links off, so clearing the Fog matters more.
  - **Move** a finished building for 1 Blueprint (Build tab). Links show as golden dotted lines on the island.
- **Daily island incidents + Murk's 10 minions:**
  - Every day the squad gets one incident (30 in total). 20 come from **Murk's minions**, each a bad lab habit or science attitude:
    Sloppo 亂糟糟 (messy bench), Sniffer 嗅嗅怪 (sniffs/tastes chemicals), Rushbolt 急急鬼 (skips instructions), Fibbit 作假怪 (makes up data), Blinkle 無鏡怪 (no safety spectacles),
    Cherrypick 揀揀怪 (keeps only results it likes), Copycat 抄抄貓 (copies without evidence), Knowall 自大王 (ignores evidence), Wastrel 嘥嘥鬼 (wastes water and energy), Mixup 亂變怪 (unfair tests).
  - 10 are lucky discoveries (dew, solar panels, a new beetle…).
  - Each one has a short story, a science question (3 choices) and an explanation. Each member gets one try; the first right answer solves it for the squad (bonus: water, health, Ops, Fog or materials) and catches the minion for the **Minion file** (Squad tab). Every right answer also gives +2 materials.
  - The minion stands on the island until it is stopped. If nobody stops it, it escapes overnight and adds a little pollution (world on only). Nothing is ever taken away.
- **Walking hint:** your pal wears a pink **YOU / 你** tag; a tap demo and a hint under the island show on the first visits.
- **The village:** grass, flowers and three villagers (Grandpa Oak, Farmer Bao, Fisher Mei). Walk up to them for tips that change with the weather, the Fog and your buildings. Free plots say "Build here" when you walk next to them.
- **Island UI 4.0 (picture-first):**
  - The screen splits into tabs: **Today / Build / Water / Squad**.
  - A **Today's quest** bar shows 4 icons with ticks and one "next step" button.
  - Daily jobs are icon tiles with one number each.
  - Weather shows as a big icon with water and health gauges.
  - The Field Report is "rain vs drains" bars plus one key line, with the full story under "More".
  - The water system is a tap-to-build **flow diagram** (rain → drains → pond → reservoir; sedimentation → filtration → chlorination → fluoridation → homes).

## 🧠 Learning rewards (anti-grinding)
- **Fresh topics pay more:** 🌱 a never-tried sub-topic ×1.5, 🔁 not played for 7+ days ×1.25; the same quiz again within 20 hours pays ×0.5, then ×0.25, then ×0.1. The same applies to each dictation and read-aloud set ("missed words" practice always pays in full).
- **New knowledge beats repeats:** 4 🪙 for a question answered correctly for the first time, 1 🪙 for one already known.
- **No coins for guesses:** a correct answer given in under 2 s (true/false) or 3 s (multiple choice, +1 s with a picture) earns nothing, and 5 or more of these cap the quiz at 1★ ("Guess alert").
- **"Why?" check:** after each quiz, students fill the key word in the explanation (or pick the right explanation) for 2 questions they got right. Correct = +5 🪙; wrong = the question goes to 錯題本, because the answer was remembered but not understood.
- **Explorer of the week:** try 6 different sub-topics or dictation sets in a week for +60 🪙, with 3 "fresh picks" suggested on the Study page.

## Editing questions
All content is in the `CHAPTERS` array near the top of the first `<script>`.
- `M(bloom, qEN, qZH, [[correctEN,correctZH], [wrongEN,wrongZH], ...], explainEN, explainZH)` – first option is the correct one (shuffled in game).
- `T(bloom, statementEN, statementZH, true|false, explainEN, explainZH)` – true/false.
Add new questions only at the **end** of a section's `qs` list so saved progress stays matched.

### 🔥 Streak celebration + fold bars (less on screen at once)
- **Streak-up ceremony:** the first exercise of the day plays a full-screen celebration. The flame charges up, the number rolls like an odometer (99 → 100), there's an impact burst, today's circle in the week strip gets stamped, and the pal cheers. Milestones (3, 7, 14, 21, 30, 50, 75, 100 … and every 100) turn gold with spinning rays and confetti. Tap to skip; Continue to close. It waits until any open quiz or popup is closed. Reduced motion shows the final frame. Tap the 🔥 chip at the top to replay today's celebration.
- **Fold bars:** tap a bar to open or close it; the game remembers your choice on this device, and closed bars show a small peek (like 0/14).
  - Study: Extra practice (explore, dictation, read aloud), and each unit (only the unit you're working on starts open).
  - Home: the pal's tips, the pet list and the class leaderboard.
  - Shop and Collection: Science Pals grouped by rarity.
  - Nobel: the rescue rewards.
  - Island: neighbour links, trade & decorations, my role, Minion file and squad diary.

### 🛡️ Progress sync between devices (streak fix)
- A game tab left open on another device used to upload its old progress when hidden, and its next study then reset the streak. Now:
  - the server refuses a copy that is older (earlier last study day, or fewer active days) and sends the newer one back;
  - when the game comes back to the front it fetches the cloud copy first;
  - on login, a streak that was wrongly reset is rebuilt from the student's finished activities in **Science Records** (missed days are never revived; Streak Freeze days still bridge gaps).
- Restoring a save code still replaces progress on purpose.
- What counts for the streak: finishing a study session, a quiz, Mistake practice, dictation or read-aloud. Just logging in does not count.
