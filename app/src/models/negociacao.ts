import { Comparavel } from "../interfaces/comparavel.js";

export class Negociacao implements Comparavel<Negociacao> {
  constructor(
    private _data: Date,
    readonly quantidade: number,
    readonly valor: number
  ) {}

  get data(): Date {
    const data = new Date(this._data.getTime());
    return data;
  }

  get volume(): number {
    return this.quantidade * this.valor;
  }

  public static criaDe(
    dataString: string,
    quantidadeString: string,
    valorString: string
  ): Negociacao {
    const exp = /-/g;
    const data = new Date(dataString.replace(exp, ","));
    const quantidade = parseInt(quantidadeString);
    const valor = parseFloat(valorString);
    return new Negociacao(data, quantidade, valor);
  }

  ehIgual(negociacao: Negociacao): boolean {
    return this.data.getDate() === negociacao.data.getDate()
    && this.data.getMonth() === negociacao.data.getMonth()
    && this.data.getFullYear() === negociacao.data.getFullYear()
  }
}
