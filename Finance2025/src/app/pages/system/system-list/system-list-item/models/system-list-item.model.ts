export interface ISystemItemDTO {
  id: string;
  mes: number;
  ano: number;
  diaFechamento: number;
  gerarCopiaDespesa: boolean;
  mesCopia: number;
  anoCopia: number;
  name: string;
  nomePropriedade: string;
  mensagem: string;
}

export interface ISystemItemOutput {
  name: string;
}
