import { Comparavel } from "../interfaces/comparavel.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Comparavel<Negociacoes>{

    private negociacoes: Negociacao[] = [];

    adiciona(negociacao: Negociacao) {
        this.negociacoes.push(negociacao);
    }

    lista(): readonly Negociacao[] {
        return this.negociacoes
    }

    ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.lista());
    }
}