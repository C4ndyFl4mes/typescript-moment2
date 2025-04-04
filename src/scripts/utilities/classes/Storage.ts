import { ErrorHandler } from "./ErrorHandler";


/**
 * En utility klass för att spara och ladda in värden från localStorage.
 */


export class UStorage {

    /**
     * Sätter ett värde i localStorage.
     * @param key - Namnet på item.
     * @param value - Vad för värde som ska lagras i item.
     */
    static setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Hämtar ett värde från localStorage.
     * @param key - Namnet på det item som ska hämtas.
     * @returns det som finns i det angivna key, eller null om det inte finns ett item med det angivna key.
     */
    static getItem<T>(key: string): T | null {
        const item: string | null = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }


    /**
     * Kollar om item existerar.
     * @param key - Namnet på det item som ska kollas.
     * @returns om item finns eller inte.
     */
    static hasItem(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    /**
     * Tömmer localStorage.
     */
    static clearItems(): void {
        localStorage.clear();
    }

    /**
     * Raderar ett specifikt item från localStorage.
     * @param key - Namnet på det item som ska raderas.
     */
    static clearSpecificItem(key: string): void {
        if (this.hasItem(key)) {
            localStorage.removeItem(key);
            if (this.hasItem(key)) {
                ErrorHandler.logError("LS-0", "LocalStorage", `Kunde inte radera ${key}.`);
            }
        } else {
            ErrorHandler.logError("LS-1", "LocalStorage", `Kunde inte radera ${key} eftersom det existerar inte.`);
        }
    }
}