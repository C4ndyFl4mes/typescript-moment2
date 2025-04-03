import { TPriority } from "../utilities/types";

/**
 * Hjälpfunktioner.
 */


/**
 * Kollar om priority finns i arrayen. Sant konverteras priority från number till TPriority. Falskt sker ingen konvertering.
 * @param priority - ett prioritetsvärde.
 * @returns ett konverterat datatyp från number till TPriority om talet är tillåtet (1, 2 eller 3) i TPriority. Otillåtet värde returnerar null.
 */
export function toTPriority(priority: number): TPriority | null {
    return [1, 2, 3].includes(priority) ? (priority as TPriority) : null;
}