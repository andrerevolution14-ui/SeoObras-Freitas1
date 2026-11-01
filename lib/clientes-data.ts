// ============================================================
// lib/clientes-data.ts — Dados de Clientes Reais, Avaliações e Fotos
// de Obras Concluídas pela Freitas Renovações em Aveiro e Arredores
// ============================================================

export type ClienteItemType = "review-with-photo" | "review-only" | "photo-only";

export type ClienteCategory =
  | "all"
  | "cozinhas"
  | "casas-de-banho"
  | "apartamentos-interiores"
  | "moradias-fachadas";

export interface ClienteFeedItem {
  id: string;
  type: ClienteItemType;
  category: Exclude<ClienteCategory, "all">;
  categoryLabel: string;
  headline: string;
  quote?: string[];
  clientName?: string;
  location: string;
  rating?: number;
  dateLabel?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  highlightTag?: string; // Ex: "Prazo cumprido: 5 semanas", "Orçamento respeitado ao cêntimo", "Obra à distância"
}

export const CLIENTES_CATEGORIES: { id: ClienteCategory; label: string; count?: number }[] = [
  { id: "all", label: "Todas", count: 26 },
  { id: "casas-de-banho", label: "Casas de Banho", count: 6 },
  { id: "cozinhas", label: "Cozinhas", count: 5 },
  { id: "apartamentos-interiores", label: "Apartamentos", count: 7 },
  { id: "moradias-fachadas", label: "Moradias", count: 8 },
];

export const CLIENTES_FEED_ITEMS: ClienteFeedItem[] = [
  // 1. Mariana Soares (Review original 01/04 — Cartão de Opinião)
  {
    id: "op-mariana-soares",
    type: "review-only",
    category: "cozinhas",
    categoryLabel: "OPINIÕES · COZINHA",
    headline: "Remodelação de cozinha",
    quote: [
      "Remodelámos a cozinha toda: tirámos a parede para a sala, mudámos as canalizações e pusemos bancada em pedra.",
      "A equipa cumpriu o prazo combinado (cerca de 5 semanas) e deixava tudo limpo ao fim de cada dia, o que com crianças em casa fez muita diferença.",
      "Houve um imprevisto com a tubagem antiga e explicaram-nos logo as opções e o custo antes de avançar. Recomendo sem hesitar.",
    ],
    clientName: "Mariana Soares",
    location: "Aveiro",
    rating: 5,
    highlightTag: "Limpeza diária & transparência em imprevistos",
  },

  // 2. Foto + Review: Casa de Banho em Madeira & Espelho LED Redondo
  {
    id: "obra-wc-madeira-led",
    type: "review-with-photo",
    category: "casas-de-banho",
    categoryLabel: "CASA DE BANHO · OBRA REAL",
    headline: "Casa de banho com painel ripado e espelho LED",
    image: "/clientes/wc-madeira-espelho-led.jpg",
    imageAlt: "Casa de banho remodelada em Aveiro com revestimento madeira, espelho redondo iluminado LED, lavatório de pousar e torneira dourada",
    quote: [
      "Queríamos uma casa de banho que fugisse ao branco frio tradicional. O Sr. Jorge ajudou-nos a escolher o revestimento a imitar madeira ripada e a conjugar com o móvel suspenso canelado e a torneira dourada.",
      "As prateleiras à medida por cima da sanita aproveitaram aquele recanto ao milímetro. Em 6 dias úteis tiraram tudo o que era antigo, meteram tubagem nova e deixaram a casa de banho pronta a estrear.",
    ],
    clientName: "Cláudia & Tiago Neves",
    location: "Glória e Vera Cruz, Aveiro",
    rating: 5,
    highlightTag: "Concluída em 6 dias úteis",
  },

  // 3. João Lopes (Review original 02/04 — Cartão de Opinião)
  {
    id: "op-joao-lopes",
    type: "review-only",
    category: "casas-de-banho",
    categoryLabel: "OPINIÕES · CASA DE BANHO",
    headline: "Casa de banho",
    quote: [
      "Tínhamos uma casa de banho dos anos 80 com banheira e azulejo rosa. Agora tem duche de chão, móvel suspenso e uma iluminação muito melhor.",
      "O que mais gostei foi a atenção aos acabamentos: as juntas, os cortes do azulejo à volta da torneira e os rodapés ficaram perfeitos. Foram sempre pontuais e responderam a todas as dúvidas por WhatsApp.",
    ],
    clientName: "João Lopes",
    location: "Esgueira, Aveiro",
    rating: 5,
    highlightTag: "Acabamentos milimétricos & contacto WhatsApp",
  },

  // 4. Foto + Review: Moradia com ripado de madeira exterior (obra-cobre.jpg)
  {
    id: "obra-moradia-ripado-madeira",
    type: "review-with-photo",
    category: "moradias-fachadas",
    categoryLabel: "MORADIA · FACHADA & EXTERIOR",
    headline: "Renovação exterior e revestimento em madeira",
    image: "/clientes/obra-cobre.jpg",
    imageAlt: "Moradia remodelada em Aveiro com fachada branca, revestimento em ripado de madeira vertical e janelas de corte térmico",
    quote: [
      "A nossa moradia precisava de uma intervenção séria nas fachadas e nas janelas por causa da humidade. Fizemos o isolamento exterior, pintura geral e este pormenor em ripado vertical à volta das janelas que mudou completamente a cara da casa.",
      "O orçamento foi fechado ao cêntimo desde o primeiro dia. Mesmo com dois dias de chuva a meio, a equipa compensou o ritmo e entregou tudo limpo, incluindo os muros e o telhado revisto.",
    ],
    clientName: "Eng.º Carlos Figueiredo",
    location: "São Bernardo, Aveiro",
    rating: 5,
    highlightTag: "Orçamento fechado sem derrapagens",
  },

  // 5. Só Foto: Fase de Demolição e Preparação de Obra (mostra organização real em obra)
  {
    id: "foto-demolicao-organizada",
    type: "photo-only",
    category: "apartamentos-interiores",
    categoryLabel: "BASTIDORES DE OBRA · DEMOLIÇÃO",
    headline: "Demolição controlada e abertura de Open Space",
    image: "/clientes/demolicao-remodelacao-integral.jpg",
    imageAlt: "Bastidores de obra de remodelação integral em Aveiro com demolição de paredes e entulho devidamente ensacado e organizado",
    imageCaption: "Transparência total desde o 1.º dia: demolição controlada, reforço estrutural e entulho ensacado diariamente para manter a obra limpa e segura.",
    location: "Aveiro Centro",
    highlightTag: "Remoção diária de entulhos",
  },

  // 6. Foto + Review: Cozinha Bicolor com lava-loiça estilo Farmhouse
  {
    id: "obra-cozinha-bicolor",
    type: "review-with-photo",
    category: "cozinhas",
    categoryLabel: "COZINHA · OBRA REAL",
    headline: "Cozinha por medida com lava-loiça de pousar",
    image: "/clientes/cozinha-bicolor-lava-loica.webp",
    imageAlt: "Cozinha remodelada pela Freitas Renovações em Aveiro com armários brancos até ao teto, móveis inferiores em madeira e lava-loiça estilo quinta",
    quote: [
      "Sonhava com este lava-loiça branco fundo debaixo da janela, mas outras empresas diziam que dava muito trabalho adaptar a bancada e os esgotos. A equipa do Jorge Freitas fez o corte na pedra ao milímetro e alinhou os armários até ao teto para ganharmos arrumação.",
      "Fizeram também a elétrica toda nova para a placa e forno sem deixar um único fio à vista. Ficou exatamente como tínhamos visto nas fotos de inspiração.",
    ],
    clientName: "Inês & Bernardo Silva",
    location: "Aradas, Aveiro",
    rating: 5,
    highlightTag: "Carpintaria e pedra por medida",
  },

  // 7. Patricia Susana (Review original 04/04 — Cartão de Opinião)
  {
    id: "op-patricia-susana",
    type: "review-only",
    category: "apartamentos-interiores",
    categoryLabel: "OPINIÕES · APARTAMENTO T2",
    headline: "Renovação integral de apartamento",
    quote: [
      "Comprámos um T2 para renovar por completo: elétrica nova, piso flutuante, janelas com corte térmico, pintura e cozinha.",
      "Moramos fora e tratámos de quase tudo à distância, com chamadas de vídeo e relatórios de progresso.",
      "Quando voltámos, o apartamento estava pronto a habitar. Já os recomendámos a dois amigos.",
    ],
    clientName: "Patricia Susana",
    location: "Aveiro Centro",
    rating: 5,
    highlightTag: "Gestão 100% à distância com vídeo-relatórios",
  },

  // 8. Foto + Review: Casa de Banho de Águas-Furtadas / Claraboia Branca
  {
    id: "obra-wc-claraboia-branco",
    type: "review-with-photo",
    category: "casas-de-banho",
    categoryLabel: "CASA DE BANHO · SUITE",
    headline: "Aproveitamento de esconso em casa de banho",
    image: "/clientes/wc-suite-claraboia-branco.jpg",
    imageAlt: "Casa de banho luminosa remodelada em Aveiro com sanita suspensa, duche walk-in em vidro e armário embutido sob claraboia",
    quote: [
      "O teto inclinado desta casa de banho tirava muito espaço e antes tínhamos uma banheira onde quase se batia com a cabeça. Passámos o duche para o lado mais alto com vidro fixo e fizeram aquele armário branco à medida do esconso para aproveitar o canto morto.",
      "Com a sanita suspensa e o espelho de parede a parede parece que a casa de banho duplicou de tamanho. Zero fugas, zero pó deixado nos quartos e muita simpatia de toda a equipa.",
    ],
    clientName: "Helena Marques",
    location: "Ílhavo (Gafanha da Nazaré)",
    rating: 5,
    highlightTag: "Otimização de espaço difícil",
  },

  // 9. Mario Gonçalves (Review original 03/04 — Cartão de Opinião)
  {
    id: "op-mario-goncalves",
    type: "review-only",
    category: "moradias-fachadas",
    categoryLabel: "OPINIÕES · MORADIA",
    headline: "Moradia de raiz",
    quote: [
      "Acompanharam a construção da nossa moradia desde as fundações até às chaves. Recebíamos fotos da obra todas as semanas e houve sempre alguém disponível para nos mostrar o andamento ao sábado.",
      "Algumas alterações a meio, como mudar a posição da ilha e acrescentar tomadas, foram feitas sem dramas. A casa foi entregue dentro do prazo e sem surpresas no orçamento final.",
    ],
    clientName: "Mario Gonçalves",
    location: "Oliveirinha, Aveiro",
    rating: 5,
    highlightTag: "Visitas ao sábado & fotos semanais",
  },

  // 10. Foto + Review: Reabilitação de Moradia Histórica (n.º 30)
  {
    id: "obra-moradia-historica",
    type: "review-with-photo",
    category: "moradias-fachadas",
    categoryLabel: "REABILITAÇÃO · CASAS ANTIGAS",
    headline: "Recuperação de fachada histórica e caixilharia",
    image: "/clientes/reabilitacao-moradia-historica.jpg",
    imageAlt: "Reabilitação de moradia antiga de traça histórica em Aveiro com fachada branca restaurada, varandas em ferro forjado e porta de madeira maciça",
    quote: [
      "Herdámos esta casa antiga de família e tínhamos receio que uma obra moderna estragasse a traça original. O trabalho de restauro das molduras da fachada, a recuperação das guardas em ferro forjado e o tratamento da porta de madeira maciça superaram tudo o que imaginávamos.",
      "Por dentro levou isolamento térmico e janelas novas com corte térmico que mantêm o desenho clássico por fora. Hoje não entra frio nem barulho da rua.",
    ],
    clientName: "Dr. António & Teresa Vilar",
    location: "Glória e Vera Cruz, Aveiro",
    rating: 5,
    highlightTag: "Preservação de traça antiga + conforto moderno",
  },

  // 11. Foto + Review: Quarto / Suite com Papel de Parede e Cortineiro Iluminado
  {
    id: "obra-quarto-suite",
    type: "review-with-photo",
    category: "apartamentos-interiores",
    categoryLabel: "INTERIORES · QUARTO SUITE",
    headline: "Renovação de suite, teto falso e pavimento",
    image: "/clientes/quarto-suite-papel-parede.jpg",
    imageAlt: "Quarto suite renovado em Aveiro com papel de parede texturado, sanca de cortineiro no teto falso e pavimento em madeira recuperado",
    quote: [
      "Renovámos os três quartos lá de casa: teto falso em pladur com sanca para esconder a calha dos cortinados, afagamento e envernizamento do soalho e aplicação do papel de parede na cabeceira.",
      "O acabamento das juntas do papel de parede ficou invisível e o isolamento acústico no teto fez uma diferença enorme. Cumpriram os 10 dias que tinham prometido.",
    ],
    clientName: "Sónia & Ricardo Tavares",
    location: "Santa Joana, Aveiro",
    rating: 5,
    highlightTag: "Acabamentos de hotel em 10 dias",
  },

  // 12. Só Foto: Moradia com Andaimes e Pintura Exterior
  {
    id: "foto-moradia-andaimes",
    type: "photo-only",
    category: "moradias-fachadas",
    categoryLabel: "FACHADAS & ISOLAMENTO · OBRA EM CURSO",
    headline: "Reabilitação integral de fachada e coberturas",
    image: "/clientes/moradia-fachada-andaimes.jpg",
    imageAlt: "Moradia em Aveiro com montagem de andaime certificado para pintura exterior, tratamento de fissuras e revisão de telhado",
    imageCaption: "Montagem de andaimes próprios certificados, reparação de fissuras, pintura exterior hidrófuga resistente à maresia e revisão geral de beirais em moradia familiar.",
    location: "Esgueira, Aveiro",
    highlightTag: "Andaimes próprios & segurança certificada",
  },

  // 13. Foto + Review: Casa de Banho Mármore & Espelho LED Retangular
  {
    id: "obra-wc-marmore-led",
    type: "review-with-photo",
    category: "casas-de-banho",
    categoryLabel: "CASA DE BANHO · CONDOMÍNIO",
    headline: "Substituição de banheira por duche de ponta a ponta",
    image: "/clientes/wc-marmore-espelho-led.jpg",
    imageAlt: "Casa de banho moderna em Aveiro com cerâmica tipo mármore, base de duche com resguardo em vidro e espelho LED",
    quote: [
      "Para os meus pais, entrar na banheira antiga já era um perigo. A equipa da Freitas Renovações tirou a banheira, rebaixou o esgoto e colocou esta base antiderrapante de ponta a ponta com porta de correr em vidro.",
      "Trataram do aviso no elevador do prédio, protegeram o chão todo até à porta de entrada e em menos de uma semana estava tudo concluído e limpo.",
    ],
    clientName: "Paulo Rodrigues",
    location: "São Bernardo, Aveiro",
    rating: 5,
    highlightTag: "Respeito total pelo condomínio",
  },

  // 14. Review sem imagem (Quebra de objeção: Orçamento discriminado e cumprimento de contrato)
  {
    id: "op-nuno-almeida",
    type: "review-only",
    category: "apartamentos-interiores",
    categoryLabel: "OPINIÕES · CHAVE NA MÃO",
    headline: "Orçamento discriminado ao detalhe",
    quote: [
      "Pedimos três orçamentos em Aveiro antes de avançar. Dois deram-nos apenas um valor por alto numa folha quase em branco. O Jorge Freitas entregou um orçamento dividido por especialidades (demolição, canalização, pladur, pintura e materiais) que nos deu logo outra segurança.",
      "Assinámos contrato com data de início e fim, alvará IMPIC e garantia escrita. Não houve derrapagens nem pedidos de dinheiro extra a meio. É raro encontrar gente tão séria na construção hoje em dia.",
    ],
    clientName: "Nuno & Catarina Almeida",
    location: "Aradas, Aveiro",
    rating: 5,
    highlightTag: "Contrato escrito & Alvará IMPIC",
  },

  // 15. Foto + Review: Cozinha Cinza Antracite com Janela
  {
    id: "obra-cozinha-cinza-janela",
    type: "review-with-photo",
    category: "cozinhas",
    categoryLabel: "COZINHA · REMODELAÇÃO",
    headline: "Cozinha funcional com bancada contínua",
    image: "/clientes/cozinha-cinza-janela.jpg",
    imageAlt: "Cozinha remodelada em Aveiro com armários cinzento antracite, bancada clara, torneira preta e grande janela luminosa",
    quote: [
      "A nossa cozinha tinha móveis de carvalho escuro dos anos 90 e pouca bancada livre para cozinhar. Mudámos a posição do lava-loiça para ficar em frente à janela, pusemos armários cinza mate fáceis de limpar e revestimento em pedra entre os móveis.",
      "O Jorge acompanhou tudo pessoalmente e quando o carpinteiro montou as portas veio conferir o alinhamento de todas as gavetas connosco. Cinco estrelas!",
    ],
    clientName: "Marta & Diogo Fonseca",
    location: "Cacia, Aveiro",
    rating: 5,
    highlightTag: "Supervisão presencial do Empreiteiro",
  },

  // 16. Review sem imagem (Quebra de objeção: Humidades / Capoto / Clima da Ria de Aveiro)
  {
    id: "op-fernando-bastos",
    type: "review-only",
    category: "moradias-fachadas",
    categoryLabel: "OPINIÕES · CAPOTO & TELHADO",
    headline: "Isolamento Capoto e fim das humidades",
    quote: [
      "Vivemos perto da ria e no inverno as paredes dos quartos voltadas a norte escorriam humidade e ganhavam manchas pretas por mais que pintássemos.",
      "Aplicámos Capoto de 8cm nas fachadas e fizemos a revisão e impermeabilização do telhado. Já passámos o primeiro inverno desde a obra: a casa mantém a temperatura sem ligarmos metade do aquecimento e nunca mais apareceu uma pinta de bolor.",
    ],
    clientName: "Fernando Bastos",
    location: "Praia da Barra / Ílhavo",
    rating: 5,
    highlightTag: "Fim definitivo das humidades e salitre",
  },

  // ── 10 REVIEWS ADICIONAIS SEM IMAGEM (EM BAIXO) ──────────────────────────

  // 17. Open Space Cozinha & Sala
  {
    id: "op-rui-filipa-correia",
    type: "review-only",
    category: "cozinhas",
    categoryLabel: "OPINIÕES · OPEN SPACE",
    headline: "Abertura de cozinha para a sala",
    quote: [
      "Tínhamos uma cozinha escura e apertada separada da sala por um corredor sem sentido. A equipa deitou abaixo a parede divisória, passou a tubagem nova pelo chão e montou uma península em pedra que serve de mesa de refeições.",
      "O que mais nos impressionou foi o cuidado com o pó: selaram as portas dos quartos com plástico antes de cortar parede e todos os dias ao final da tarde deixavam o chão aspirado.",
    ],
    clientName: "Rui & Filipa Correia",
    location: "Gafanha da Nazaré, Ílhavo",
    rating: 5,
    highlightTag: "Controlo rigoroso de pó & prazos",
  },

  // 18. Casa de banho em prédio sem elevador
  {
    id: "op-margarida-lourenco",
    type: "review-only",
    category: "casas-de-banho",
    categoryLabel: "OPINIÕES · CASA DE BANHO",
    headline: "Casa de banho num 3.º andar sem elevador",
    quote: [
      "Dois empreiteiros recusaram a obra ou pediram valores absurdos por ser um 3.º andar sem elevador no centro de Aveiro. O Sr. Jorge Freitas veio ver o espaço no próprio dia, apresentou um preço justo e subiram todo o material e desceram o entulho sem sujar um único degrau da escada do prédio.",
      "A canalização antiga de ferro foi toda trocada por multicamada e a base de duche ficou impecável. Uma equipa de uma educação e trabalho raros.",
    ],
    clientName: "Margarida Lourenço",
    location: "Vera Cruz, Aveiro",
    rating: 5,
    highlightTag: "Escadas do prédio sempre limpas",
  },

  // 19. Reparação de telhado e infiltrações
  {
    id: "op-vitor-conceicao-gomes",
    type: "review-only",
    category: "moradias-fachadas",
    categoryLabel: "OPINIÕES · TELHADO & INFILTRAÇÕES",
    headline: "Infiltrações no telhado e caleiras novas",
    quote: [
      "Sempre que chovia com vento sul entrava água pelo teto de um dos quartos. Já tinham lá ido dois curiosos meter silicone que não resolveu nada. A equipa do Jorge levantou as telhas na zona da chaminé, refez os rufos, limpou o telhado todo a jato e impermeabilizou as caleiras.",
      "Mostraram-nos fotografias tiradas lá em cima do antes e do depois para percebermos exatamente o que tinha sido feito. Choveu torrencialmente nas semanas seguintes e não caiu uma gota.",
    ],
    clientName: "Vítor & Conceição Gomes",
    location: "Eixo, Aveiro",
    rating: 5,
    highlightTag: "Fotografias antes/depois do telhado",
  },

  // 20. Piso vinílico e portas interiores em T3
  {
    id: "op-pedro-joana-matos",
    type: "review-only",
    category: "apartamentos-interiores",
    categoryLabel: "OPINIÕES · PAVIMENTO & PORTAS",
    headline: "Chão vinílico e portas lacadas a branco",
    quote: [
      "Não queríamos partir o mosaico antigo da casa toda por causa do barulho e do custo. O Jorge aconselhou-nos aplicar piso vinílico SPC com manta acústica por cima do chão existente e trocar as portas escuras por portas brancas lisas.",
      "Em menos de duas semanas parecia que tínhamos mudado de apartamento. Os cortes nos rodapés e nas ombreiras das portas ficaram perfeitos e poupámos quase 40% face a demolir o chão.",
    ],
    clientName: "Pedro & Joana Matos",
    location: "São Bernardo, Aveiro",
    rating: 5,
    highlightTag: "Solução inteligente sem demolir piso",
  },

  // 21. Remodelação para investimento / arrendamento
  {
    id: "op-alexandre-pinto",
    type: "review-only",
    category: "apartamentos-interiores",
    categoryLabel: "OPINIÕES · CHAVE NA MÃO",
    headline: "Remodelação de T1 para arrendamento",
    quote: [
      "Comprei um apartamento antigo perto da Universidade para colocar no mercado de arrendamento e precisava de uma obra rápida, durável e dentro de um teto orçamental muito bem definido.",
      "Cumpriram a entrega em 4 semanas exatas, aconselharam materiais resistentes à humidade e de fácil manutenção e trataram de tudo chave na mão. Arrendei o apartamento na primeira semana em que ficou pronto.",
    ],
    clientName: "Alexandre Pinto",
    location: "Glória, Aveiro",
    rating: 5,
    highlightTag: "Entrega em 4 semanas exatas",
  },

  // 22. Cozinha e quadro elétrico
  {
    id: "op-beatriz-goncalo-nunes",
    type: "review-only",
    category: "cozinhas",
    categoryLabel: "OPINIÕES · COZINHA & ELÉTRICA",
    headline: "Cozinha nova e quadro elétrico atualizado",
    quote: [
      "Sempre que ligávamos o forno e a placa ao mesmo tempo o quadro ia abaixo. Na remodelação da cozinha, a Freitas Renovações passou cabos independentes novos até ao quadro elétrico e deixou circuitos separados para cada eletrodoméstico.",
      "Os armários ficaram com fecho suave, a bancada muito bem vedada e a iluminação LED por baixo dos móveis superiores dá uma luz ótima para cozinhar.",
    ],
    clientName: "Beatriz & Gonçalo Nunes",
    location: "Aradas, Aveiro",
    rating: 5,
    highlightTag: "Instalação elétrica segura e certificada",
  },

  // 23. Casa de banho adaptada / sénior
  {
    id: "op-fernanda-manuel",
    type: "review-only",
    category: "casas-de-banho",
    categoryLabel: "OPINIÕES · ACESSIBILIDADE",
    headline: "Troca de banheira por duche seguro",
    quote: [
      "O meu marido teve um problema num joelho e precisávamos urgentemente de tirar a banheira e pôr uma base de duche rasteira que não escorregasse, além de pegas de apoio na parede.",
      "Deram prioridade ao nosso caso, em 4 dias fizeram o trabalho todo e deixaram o azulejo novo tão bem combinado que parece que sempre ali esteve. Muito humanos e atenciosos.",
    ],
    clientName: "D. Fernanda & Sr. Manuel",
    location: "Santa Joana, Aveiro",
    rating: 5,
    highlightTag: "Concluído em 4 dias com máxima atenção",
  },

  // 24. Caixilharia PVC e pintura exterior na Costa Nova
  {
    id: "op-luis-miguel-rocha",
    type: "review-only",
    category: "moradias-fachadas",
    categoryLabel: "OPINIÕES · JANELAS & FACHADA",
    headline: "Janelas PVC e pintura contra a maresia",
    quote: [
      "Na Costa Nova o salitre destrói tudo o que seja alumínio antigo ou tinta barata. Trocámos todas as janelas por PVC oscilobatente com vidro duplo e pintámos o exterior com membrana elástica recomendada pelo Jorge.",
      "O barulho do vento desapareceu por completo dentro de casa e a temperatura subiu logo 3 ou 4 graus no inverno. Orçamento cumprido sem um euro a mais.",
    ],
    clientName: "Luís Miguel Rocha",
    location: "Costa Nova, Ílhavo",
    rating: 5,
    highlightTag: "Materiais específicos para zona costeira",
  },

  // 25. Moradia anos 70 + apoio no crédito obras
  {
    id: "op-sofia-andre-pacheco",
    type: "review-only",
    category: "moradias-fachadas",
    categoryLabel: "OPINIÕES · REABILITAÇÃO & CRÉDITO",
    headline: "Recuperação de moradia dos anos 70",
    quote: [
      "Queríamos remodelar a casa dos avós mas o banco onde temos conta estava a demorar imenso a aprovar o crédito de obras. Através do parceiro de intermediação de crédito da Freitas Renovações trataram do processo gratuitamente e conseguimos uma prestação muito mais baixa.",
      "A obra correu lindamente: telhado, canalizações, duas casas de banho e cozinha. O Sr. Jorge esteve sempre presente nos momentos decisivos.",
    ],
    clientName: "Sofia & André Pacheco",
    location: "Águeda",
    rating: 5,
    highlightTag: "Apoio gratuito no crédito de obras",
  },

  // 26. Pladur acústico e tetos falsos
  {
    id: "op-tiago-sara-henriques",
    type: "review-only",
    category: "apartamentos-interiores",
    categoryLabel: "OPINIÕES · PLADUR & ISOLAMENTO",
    headline: "Isolamento acústico e tetos falsos com LED",
    quote: [
      "Ouvíamos tudo dos vizinhos de cima e do lado no quarto do bebé. Fizeram uma parede forrada com pladur duplo e lã de rocha de alta densidade e rebaixaram o teto com focos embutidos e sanca de luz quente.",
      "O quarto ficou super silencioso e o acabamento do barramento e da pintura ficou liso como um espelho, sem uma única marca de emenda. Voltaremos a chamar para a cozinha.",
    ],
    clientName: "Tiago & Sara Henriques",
    location: "Esgueira, Aveiro",
    rating: 5,
    highlightTag: "Isolamento acústico real & pintura perfeita",
  },
];

export const CLIENTES_TRUST_PILLARS = [
  {
    title: "Orçamento Fechado & Sem Surpresas",
    desc: "Recebe todas as tarefas e materiais discriminados antes da obra começar. Se surgir algo oculto numa parede antiga, explicamos opções e custos antes de tocar em qualquer coisa.",
  },
  {
    title: "Comunicação Direta por WhatsApp & Vídeo",
    desc: "Enviamos fotografias e vídeos do avanço todas as semanas. Mesmo que viva fora de Aveiro ou no estrangeiro, acompanha a sua obra em tempo real.",
  },
  {
    title: "Limpeza Diária & Respeito pelos Vizinhos",
    desc: "Protegemos elevadores e zonas comuns, ensacamos o entulho diariamente e deixamos a obra arrumada ao final de cada dia de trabalho.",
  },
  {
    title: "Garantia Escrita até 5 Anos & Alvará IMPIC",
    desc: "Empresa 100% licenciada (Alvará 104523) com Seguro de Responsabilidade Civil ativo e acompanhamento presencial pelo Empreiteiro Jorge Freitas.",
  },
];

