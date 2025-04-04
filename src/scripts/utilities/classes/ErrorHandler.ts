import { IError } from "../../interfaces/error";
import { ErrorDisplay } from "./ErrorDisplay";

/**
 * En utility klass för att hantera felmeddelanden..
 */

export class ErrorHandler {
    private static errors: Array<IError>;

    /**
     * Loggar felmeddelanden.
     * @param error - en unik sträng som motsvarar endast ett felmeddelande.
     * @param header - en rubrik för ett felmeddelande.
     * @param context - en beskrivning av felmeddelandet.
     */
    static logError(error: string, header: string, context: string): void {
        ErrorDisplay.showError(header, context);
        this.errors.push({error: error, header: header, context: context});
    }

    /**
     * Laddar om felmeddelanden.
     */
    static reloadErrors(): void {
        ErrorDisplay.clearErrors();
        this.errors.forEach(error => {
            ErrorDisplay.showError(error.header, error.context);
        });
    }

    /**
     * Raderar ett felmeddelande.
     * @param error - felmeddelandet som ska raderas.
     */
    static removeError(error: string): void {
        this.errors = this.errors.filter(err => err.error !== error);
    }

    /**
     * Raderar alla felmeddelanden.
     */
    static clearAllErrors(): void {
        this.errors = [];
    }
}