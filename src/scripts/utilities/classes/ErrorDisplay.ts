import { ErrorHandler } from "./ErrorHandler";


/**
 * En utility klass för att visa felmeddelanden på webbsidan.
 */


export class ErrorDisplay {
    private static container: HTMLElement | null;

    /**
     * Initialiserar error container.
     */
    static init(): void {
        this.container = document.createElement("div");
        this.container.id = "error-container";

        // Får se vilket element den kommer att hamna i.
        // document.body.appendChild(this.container); 
    }

    /**
     * Lägger till ett felmeddelande på webbsidan.
     * @param error - rubriken av vad det är för felmeddelande.
     * @param context - förklaring av felmeddelande.
     */
    static showError(error: string, context: string): void {
        if(!this.container) this.init();
        const errorARTICLE: HTMLElement = document.createElement("article");
        errorARTICLE.className = "error-item";
        errorARTICLE.innerHTML = `
            <h3>${error}</h3>
            <p>${context}</p>
        `;
        this.container!.appendChild(errorARTICLE);
        this.container!.style.display = "flex";
    }

    /**
     * Rensar alla felmeddelanden.
     */
    static clearErrors(): void {
        if (this.container) {
            this.container.innerHTML = "";
            this.container.style.display = "none";
            ErrorHandler.clearAllErrors();
        }
    }
}