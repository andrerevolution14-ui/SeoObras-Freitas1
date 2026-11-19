// Cue times follow the edit in films-v2, including its 0.4-second crossfades.
export const filmCopy = [
 {id:"opening",at:0,eyebrow:"OBRAS E REMODELAÇÕES EM AVEIRO",title:"Uma nova vida",accent:"para a sua casa.",body:["Chave na mão. Orçamento fechado.","Prazo em contrato e garantia escrita."]},
 {id:"cutting",at:2.3,eyebrow:"CORTE E PREPARAÇÃO",title:"Precisão",accent:"em cada corte.",body:["Cortes cuidados.","Acabamentos que fazem a diferença."]},
 {id:"kitchen",at:7.9,eyebrow:"COZINHAS À MEDIDA",title:"Uma cozinha.",accent:"À sua medida.",body:["Móveis, materiais e luz.","Tudo encontra o seu lugar."]},
 {id:"passage",at:13,eyebrow:"UMA CASA. UM PROJETO.",title:"De uma divisão",accent:"à seguinte.",body:["Cozinha e casa de banho.","A mesma atenção em toda a casa."]},
 {id:"bathroom",at:20.6,eyebrow:"CASAS DE BANHO",title:"Um novo começo.",accent:"Na sua casa.",body:["Do espaço de hoje","à casa de banho que imaginou."]},
 {id:"preparation",at:22.9,eyebrow:"PREPARAÇÃO DA PAREDE",title:"A base de tudo.",accent:"Bem preparada.",body:["Massa bem aplicada.","Uma superfície pronta a receber cerâmica."]},
 {id:"fitting",at:26.7,eyebrow:"ASSENTAMENTO DA CERÂMICA",title:"Peça a peça.",accent:"Tudo no lugar.",body:["Juntas alinhadas.","Cada peça no seu lugar."]},
 {id:"finished",at:30.5,eyebrow:"REMODELAÇÃO CHAVE NA MÃO",title:"Pronta para viver.",accent:"Feita para durar.",body:["Do primeiro plano à última chave.","Uma equipa, do princípio ao fim."]},
] as const;

export function filmCopyAt(seconds:number):number {
 if (!Number.isFinite(seconds)) return 0;
 for (let i=filmCopy.length-1;i>0;i--) if(seconds>=filmCopy[i].at)return i;
 return 0;
}
