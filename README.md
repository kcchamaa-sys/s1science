# Mochi Science Pals · 麻糬科學小夥伴

A bilingual (English / 繁體中文) pet-raising revision game for Hong Kong **S1 Science** (Units 1–6).
Single file: `index.html` (HTML + CSS + vanilla JS, no build step, no images – all pets and items are SVG).

## What's inside
- **6 units → 29 sub-topics → 355 questions** (Units 1–6 incl. Energy and Matter as particles), tagged by Bloom level (Remember → Create). Each quiz = 5 fresh questions that climb Bloom levels.
- **Study notes** per sub-topic (key points + bilingual key terms); a 20-second read with your pet earns coins + XP (once per sub-topic per day).
- **Pets**: 12 original pets (Mochi, Matcha, Sakura, Pudding, Soda, Taro, Kinako, Goma, Mikan, Nori, Ume, Wata) with Energy, Happiness and Level; moods (overjoyed, happy, sleepy, hungry, lonely, studying); 3 evolution stages.
- **Care loop**: feed snacks, play *Term Match* (EN ↔ 中文), dress up, decorate the room.
- **Special items**: 29 themed collectibles (one per sub-topic) unlock free with a 3/5+ quiz score, with an animated reveal.
- **Streak pop-ups**: animated reminders on return, celebration on each new day, milestone confetti (3/7/14/21/30…), shield and welcome-back messages.
- **Retention**: daily streak with reward multiplier (up to ×1.5) and streak shields, daily gift, 18 trophies, collection gallery.
- **錯題本 Mistake Bank**: wrong answers are saved automatically; answer one right twice in a row to clear it (+6 coins).
- **Saving**: auto-saves to `localStorage` key `s1SciencePals_v1`; 💾 gives a save code + share link (`…/#CODE`) to move devices, with preview and checksum. Codes from the first version (v1) still load.

## Editing questions
All content is in the `CHAPTERS` array near the top of the first `<script>`.
- `M(bloom, qEN, qZH, [[correctEN,correctZH], [wrongEN,wrongZH], ...], explainEN, explainZH)` – first option is the correct one (shuffled in game).
- `T(bloom, statementEN, statementZH, true|false, explainEN, explainZH)` – true/false.
Add new questions only at the **end** of a section's `qs` list so saved progress stays matched.
