TJ Labs Number Generator (Trial Task)

Setup:

Need Node.js installed
npm install then npm run dev: http://localhost:3000
/ = Sign in, /generator = Zahlengenerator
npm test for generator unit tests
npm run build + npm start for production


Project structure:

app/ — pages + global CSS tokens
components/layout/ — background, header, centered card shell
components/ui/ — Button, TextField, IconButton, icons, flag
components/signin/ + components/generator/ — each screen’s form/logic UI
lib/ — pure generateUniqueDigits + tests
public/images/ background photo (flags are inline SVGs)


Design implementation:

Rebuilt both Figma screens (desktop + mobile) in Next.js + TypeScript
No Tailwind, CSS Modules + CSS variables from Figma
Fonts: Public Sans (body/UI), Barlow SemiBold (headings) via next/font
Mobile first; desktop styles from 600px
Spacing, colors, radii, shadows, type sizes taken from the .fig file
Blurred background image + 90% white overlay like the design



Number generator:

Logic lives in lib/generateUniqueDigits.ts, not in the React component
Returns 6 unique digits from 0–9
Partial Fisher Yates shuffle: shuffle only the first 6 slots of a 0–9 pool
Uniqueness: each digit exists once in the pool, so no duplicates by design
Fairness: every ordered combination of 6 distinct digits is equally likely
Fast: O(6), no “pick and retry if duplicate”
Empty UI shows, in all boxes until first “Generieren” click
Tests: npm test



Use of AI:

Started and created the project using AI cursor to save time
Given instruction/ prompts to created loginauth screens and for another screen for number generator
Implimented logic using AI to generate numbers


Decisions:

Password eye toggle works (show/hide)
Simple client side validation on Sign in (invalid email / short password)
Valid Sign in (or “Generate numbers”) goes to /generator; “Zurück” goes home
Added a dotted line under the header because the brief mentioned it, not clearly visible as a real layer in the .fig / screenshots (might only be Figma selection UI)
Settings icon is visual only, no settings screen in the task
On mobile generator, settings is hidden (matches Figma)
Used Figma error helper style for validation messages



Open points:

Logo on the left: Figma Logo instance looked empty, nothing rendered
Confirm with reviewer whether a real dotted header line is intended
“Get started” has nowhere to go (registration not in scope)
Flags are indicators only, No language switch implemented

