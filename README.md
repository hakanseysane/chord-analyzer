# Chord Analyzer

A TypeScript utility for transposing musical chords by a given number of semitones.

## Features

- Transpose a single chord or a space-separated sequence of chords by any semitone interval
- Handles enharmonic equivalents (sharps and flats) based on transposition direction
- Built on the full 12-note chromatic scale

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm

## Installation

```bash
npm install
```

## Usage

### Development (with hot reload)

```bash
npm start
```

Nodemon watches the `src/` directory and re-runs `ts-node ./src/index.ts` on every `.ts` file change.

### Running directly

```bash
npx ts-node src/index.ts
```

### Example

The default example in `src/index.ts` transposes the chord sequence `C G Am F` up by 7 semitones:

```
Original Chords:   C G Am F
Transposed Chords: G D Em C
```

To transpose your own chords, edit the variables at the bottom of `src/index.ts`:

```typescript
const originalChords = 'C G Am F';  // space-separated chords
const interval = 7;                  // semitones (positive = up, negative = down)
```

## Project Structure

```
chord-analyzer/
├── src/
│   ├── index.ts              # Entry point — transpose logic and example usage
│   └── objects/
│       └── chromaticScale.ts # 12-note chromatic scale definition
├── tsconfig.json
├── nodemon.json
└── package.json
```

## How It Works

1. **Chromatic scale** – Notes are stored as `'A', 'A#/Bb', 'B', …` so both enharmonic spellings are available.
2. **getNoteIndex** – Finds a note's position in the scale (handles both sharp and flat spellings).
3. **transposeChord** – Extracts the root note and quality (e.g. `m`, `7`, `maj7`) from a chord string, shifts the root by the requested interval, and re-attaches the quality.
4. **chooseEnharmonic** – When transposing up, prefers sharps; when transposing down, prefers flats.
5. **transposeChords** – Splits a chord string on spaces, transposes each chord, and rejoins.

## License

ISC
