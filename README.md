# Mochi Science Pals · 麻糬科學小夥伴

A bilingual (English / 繁體中文) pet-raising revision game for Hong Kong **S1 Science** (Units 1–6).
Single file: `index.html` (HTML + CSS + vanilla JS, no build step, no images – all pets and items are SVG).

## What's inside
- **6 units → 29 sub-topics → 392 questions** (Units 1–6 incl. Energy and Matter as particles), tagged by Bloom level (Remember → Create). Each quiz = 5 fresh questions that climb Bloom levels.
- **Study notes** per sub-topic (key points + bilingual key terms); a 20-second read with your pet earns coins + XP (once per sub-topic per day).
- **Pets**: 12 original pets (Mochi, Matcha, Sakura, Pudding, Soda, Taro, Kinako, Goma, Mikan, Nori, Ume, Wata) with Energy, Happiness and Level; moods (overjoyed, happy, sleepy, hungry, lonely, studying); 3 evolution stages.
- **Care loop**: feed snacks, play *Term Match* (EN ↔ 中文), dress up, decorate the room.
- **Special items**: 29 themed collectibles (one per sub-topic) unlock free with a 3/5+ quiz score, with an animated reveal.
- **Streak pop-ups**: animated reminders on return, celebration on each new day, milestone confetti (3/7/14/21/30…), shield and welcome-back messages.
- **British pronunciation**: every key term (232) has 🔊 normal and 🐢 slow playback in an en-GB voice (Web Speech API) plus British IPA; each unit has a *Listen & Repeat* vocab list; English Term Match cards speak when flipped; quiz questions can be read aloud in English mode.
- **Context & pictures**: experiment-based questions show a 📋 context box so students don't need to remember the textbook set-up; 37 picture questions use inline SVG diagrams (hazard symbols, apparatus, measuring cylinder, Bunsen flames, heating curve, water cycle, filtration, distillation, animals, plant cell, microscope, reproductive system, foetus, bar chart vs histogram, Sankey, convection, particle model, bimetallic strip, displacement, density column, identification key).
- **Dictation (默書)**: two ways – 🔊 *Listen & spell* (British voice) or 🖼️ *Meaning / picture* (a short definition for all 232 terms, plus diagrams for about 50 terms). Choose a whole unit, one sub-topic or *My missed words*; 2 tries per word, letter-count boxes, hint (Chinese + first letters), results recorded for teachers (most-misspelled words, dictation accuracy per student, Excel sheet).
- **School revision-note pictures** (`img/`): photos and symbols cropped from the S1 Chapter 1 revision notes – school-style hazard symbols, safety equipment, apparatus, Bunsen burner parts, sectional diagrams and measuring instruments – used in quizzes, dictation and a 📷 gallery in the 1.3 / 1.4 study notes. Labels that would give answers away were replaced by letters.
- **Rarity tiers**: Common / Rare / Epic / Legendary. Sub-topic items need 3★ (earlier unlocks are kept); unit-mastery rewards are Epic; Legendary items and the legendary pet come from very hard milestones (see the 🎯 Quests tab). 19 new items and 3 new pets (+25%).
- **Class login**: students on the school name list sign in with Google; progress syncs to the cloud and every quiz/study session is recorded. Teachers (教職員) get a 📊 dashboard with class and individual statistics and an Excel export. Guests can still play offline. Setup: `server/SETUP.md` (server code: `server/Code.gs`). Student names are never stored in this repo.
- **Retention**: daily streak with reward multiplier (up to ×1.5) and streak shields, daily gift, 18 trophies, collection gallery.
- **錯題本 Mistake Bank**: wrong answers are saved automatically; answer one right twice in a row to clear it (+6 coins).
- **Saving**: auto-saves to `localStorage` key `s1SciencePals_v1`; 💾 gives a save code + share link (`…/#CODE`) to move devices, with preview and checksum. Codes from the first version (v1) still load.

## Editing questions
All content is in the `CHAPTERS` array near the top of the first `<script>`.
- `M(bloom, qEN, qZH, [[correctEN,correctZH], [wrongEN,wrongZH], ...], explainEN, explainZH)` – first option is the correct one (shuffled in game).
- `T(bloom, statementEN, statementZH, true|false, explainEN, explainZH)` – true/false.
Add new questions only at the **end** of a section's `qs` list so saved progress stays matched.
