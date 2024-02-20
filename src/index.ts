
// Chromatic scale with sharps and flats
import { chromaticScale } from "./objects/chromaticScale";

/**
 * Finds the index of a given note in the chromatic scale, considering enharmonic equivalents.
 * This helps in identifying the position of the note to facilitate transposition.
 * 
 * @param note - The musical note whose index is to be found
 * @returns The index of the note in the chromatic scale
 * @throws error if the note isn't found in the chromatic scale
 */
const getNoteIndex = (note: string): number => {
    for (let i = 0; i < chromaticScale.length; i++) {
        if (chromaticScale[i].includes(note)) {
            return i;
        }
    }
    throw new Error(`Note ${note} not found in chromatic scale.`);
}

/**
 * Chooses the appropriate enharmonic equivalent of a note based on the direction of transposition.
 * This function decides whether to use a sharp or flat representation after transposition.
 * 
 * @param note - The musical note for which the enharmonic equivalent is to be chosen.
 * @param direction - The direction of transposition (positive for ascending, negative for descending).
 * @returns The chosen enharmonic equivalent of the note.
 */
const chooseEnharmonic = (note: string, direction: number): string => {
    const enharmonics = note.split('/');
    // If transposing up and there's a sharp, or transposing down and there's a flat, choose that
    if (direction > 0 && enharmonics[0].includes('#')) {
        return enharmonics[0];
    } else if (direction < 0 && enharmonics[1].includes('b')) {
        return enharmonics[1];
    }
    return enharmonics[0];
}

/**
 * Transposes a chord by a specified interval of semitones.
 * This function adjusts the root note of the chord according to the given interval,
 * taking into account the correct enharmonic equivalent for the transposed note.
 * 
 * @param chord - The chord to be transposed.
 * @param interval - The interval in semitones by which the chord is to be transposed.
 * @returns The transposed chord.
 * @throws Error if the chord format is invalid.
 */
const transposeChord = (chord: string, interval: number): string => {
    // Extract the root note and the chord quality (m, 7, etc.)
    const rootMatch = chord.match(/[A-G](#|b)?/);
    if (!rootMatch) {
        throw new Error(`Invalid chord format: ${chord}`);
    }
    const root = rootMatch[0];
    const quality = chord.slice(root.length);

    // Get the root note index and calculate the new index
    const rootIndex = getNoteIndex(root);
    let newIndex = (rootIndex + interval + chromaticScale.length) % chromaticScale.length;

    // Get the new root note, choosing the appropriate enharmonic if necessary
    let newRoot = chromaticScale[newIndex];
    if (newRoot.includes('/')) {
        newRoot = chooseEnharmonic(newRoot, interval);
    }

    // Return the transposed chord
    return newRoot + quality;
}

const transposeChords = (chords: string, interval: number): string => {
    return chords.split(' ')
        .map(chord => transposeChord(chord, interval))
        .join(' ');
}

// Example usage:
const originalChords = 'C G Am F';
const interval = 7;

const transposedChords = transposeChords(originalChords, interval);

console.log(`Original Chords: ${originalChords}`);
console.log(`Transposed Chords: ${transposedChords}`);