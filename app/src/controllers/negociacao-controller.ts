import { domInjector } from "../decorator/dom-injector.js";
import { inspect } from "../decorator/inspect.js";
import { logarTempoDeExecucao } from "../decorator/logar-tempo-de-execucao.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { NegociacoesServices } from "../services/negociacoes-service.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController {
    @domInjector('#data')
    private inputData: HTMLInputElement;
    @domInjector('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInjector('#valor')
    private inputValor: HTMLInputElement;
    private negociacoes = new Negociacoes();
    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');
    private negociacoesService = new NegociacoesServices();

    constructor() {
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect()
    @logarTempoDeExecucao()
    adiciona(): void {
        const negociacao = Negociacao.criaDe(
            this.inputData.value,
            this.inputQuantidade.value,
            this.inputValor.value
        );
        if (negociacao.data.getDay() > DiasDaSemana.domingo && negociacao.data.getDay() < DiasDaSemana.sabado) {
            this.negociacoes.adiciona(negociacao);
            this.atualizaView();
            this.limparFormulario();
        } else {
            this.mensagemView.update('Apenas negociações em dias úteis são aceitas.')
        }   
       } 

    importaDados(): void {
        this.negociacoesService
        .obterNegociacoesDoDia()
        .then(negociacoesDeHoje => {
            return negociacoesDeHoje.filter(negociacaoDeHoje => {
                return !this.negociacoes.lista().some(negociacao => negociacao.ehIgual(negociacaoDeHoje))
            })
        })
        .then(negociacoesDeHoje => {
            for(let negociacao of negociacoesDeHoje) {
                this.negociacoes.adiciona(negociacao)
            }
            this.negociacoesView.update(this.negociacoes)
        })
    }   

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update("Negociação adicionada com sucesso");
    }
}