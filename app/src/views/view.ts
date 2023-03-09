import { inspect } from "../decorator/inspect.js";
import { logarTempoDeExecucao } from "../decorator/logar-tempo-de-execucao.js";

export abstract class View<T> {
    protected elemento: HTMLElement;

    constructor(seletor: string){
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else { 
            throw Error(`Seletor ${seletor} não existe no DOM. Veriique!`)
        }
    }

    protected abstract template(model: T): string;

    update(model: T): void {
        let template = this.template(model);
        this.elemento.innerHTML = template;
    }
}