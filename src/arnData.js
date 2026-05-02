// ARN Test Data — Påhittad data för demonstration
// Tre branscher: Motor/Reparation, Resor, Elektronik
// Format följer PerWs GOSOL-lista + ARN:s beslutsdokumentstruktur

export const ARN_BOLAG = {
  // ── MOTOR / REPARATION ──────────────────────────────────────────────────
  "5568123456": {
    namn: "Svea Bil & Service AB",
    orgnr: "556812-3456",
    bransch: "Handel med och reparation av motorfordon",
    sni: "45200",
  },
  "5591234567": {
    namn: "Norrlands Däckcenter AB",
    orgnr: "559123-4567",
    bransch: "Handel med och reparation av motorfordon",
    sni: "45200",
  },
  "5562345678": {
    namn: "Stockholms Bilverkstad AB",
    orgnr: "556234-5678",
    bransch: "Handel med och reparation av motorfordon",
    sni: "45200",
  },

  // ── RESOR ───────────────────────────────────────────────────────────────
  "5593456789": {
    namn: "SunTravel Sverige AB",
    orgnr: "559345-6789",
    bransch: "Resebyråer och researrangörer",
    sni: "79110",
  },
  "5564567890": {
    namn: "Nordic Adventure Tours AB",
    orgnr: "556456-7890",
    bransch: "Resebyråer och researrangörer",
    sni: "79120",
  },
  "5595678901": {
    namn: "Solresor Direkt AB",
    orgnr: "559567-8901",
    bransch: "Resebyråer och researrangörer",
    sni: "79110",
  },

  // ── SPORT & FRITID ──────────────────────────────────────────────────────
  "5598765432": {
    namn: "Långholmen Kajak & Vattensport AB",
    orgnr: "559876-5432",
    bransch: "Detaljhandel med fritids- och sportartiklar",
    sni: "47640",
  },

  // ── ELEKTRONIK ──────────────────────────────────────────────────────────
  "5566789012": {
    namn: "TechGiganten Sverige AB",
    orgnr: "556678-9012",
    bransch: "Detaljhandel med ljud- och bildutrustning",
    sni: "47430",
  },
  "5597890123": {
    namn: "Digitalhuset Online AB",
    orgnr: "559789-0123",
    bransch: "Detaljhandel med datorer och kringutrustning",
    sni: "47410",
  },
  "5568901234": {
    namn: "SmartPhone & Co AB",
    orgnr: "556890-1234",
    bransch: "Detaljhandel med ljud- och bildutrustning",
    sni: "47430",
  },
};

export const ARN_ARENDEN = [
  // ════════════════════════════════════════════════
  // SVEA BIL & SERVICE AB — 8 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-03421",
    orgnr: "5568123456",
    datum_anmalan: "2024-02-12",
    datum_beslut: "2024-06-18",
    vara_tjanst: "Bilreparation",
    yrkande: "Återbetalning",
    belopp_yrkat: 14500,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Konsumenten lämnade in bilen för bromsreparation. Felet kvarstod efter reparationen och bilen krävde ytterligare verkstadsbesök.",
    beslut_text: `BESLUT 2024-06-18 Änr 2024-03421

ANMÄLARE
[ANONYMISERAD]

MOTPART
Svea Bil & Service AB
Industrivägen 14, 171 48 Solna

Nämndens beslut
Nämnden rekommenderar Svea Bil & Service AB att betala tillbaka 14 500 kr till konsumenten.

Anmälarens krav
[ANONYMISERAD] begär återbetalning med 14 500 kr. Bilen lämnades in för bromsreparation i januari 2024. Efter reparationen kvarstod bromsproblemen och bilen var tvungen att lämnas in igen hos en annan verkstad som konstaterade att arbetet inte utförts korrekt.

Motpartens svar
Svea Bil & Service AB bestrider kravet och hävdar att reparationen utfördes fackmässigt.

Motivering
Nämnden finner styrkt att reparationen inte utförts på ett fackmässigt sätt. Konsumenten har rätt till ersättning enligt konsumenttjänstlagen 9 §. Nämnden rekommenderar återbetalning av reparationskostnaden.`
  },
  {
    arendenr: "2024-09876",
    orgnr: "5568123456",
    datum_anmalan: "2024-05-20",
    datum_beslut: "2024-10-02",
    vara_tjanst: "Bilreparation",
    yrkande: "Skadestånd",
    belopp_yrkat: 8200,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten kräver ersättning för skada på lackering som uppstod under service.",
    beslut_text: `BESLUT 2024-10-02 Änr 2024-09876

ANMÄLARE
[ANONYMISERAD]

MOTPART
Svea Bil & Service AB
Industrivägen 14, 171 48 Solna

Nämndens beslut
Nämnden avslår anmälarens krav.

Anmälarens krav
[ANONYMISERAD] begär skadestånd med 8 200 kr för skada på lackering.

Motivering
Nämnden finner inte styrkt att skadan uppstod hos verkstaden. Anmälan avslås.`
  },
  {
    arendenr: "2023-14532",
    orgnr: "5568123456",
    datum_anmalan: "2023-08-03",
    datum_beslut: "2023-12-14",
    vara_tjanst: "Bilreparation",
    yrkande: "Återbetalning",
    belopp_yrkat: 22000,
    beslutskod: "Delvis bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Växellådsbyte utfört till felaktigt pris enligt konsumenten. Nämnden tillerkänner delvis ersättning.",
    beslut_text: `BESLUT 2023-12-14 Änr 2023-14532

ANMÄLARE
[ANONYMISERAD]

MOTPART
Svea Bil & Service AB
Industrivägen 14, 171 48 Solna

Nämndens beslut
Nämnden rekommenderar Svea Bil & Service AB att betala 11 000 kr till konsumenten.

Motivering
Nämnden finner att debitering skett för arbete som inte utförts. Nämnden tillerkänner ersättning för den del av kravet som är styrkt.`
  },
  {
    arendenr: "2023-08811",
    orgnr: "5568123456",
    datum_anmalan: "2023-04-15",
    datum_beslut: "2023-08-22",
    vara_tjanst: "Däckbyte",
    yrkande: "Återbetalning",
    belopp_yrkat: 4200,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten anser sig ha blivit debiterad för däck som inte monterades.",
    beslut_text: `BESLUT 2023-08-22 Änr 2023-08811

ANMÄLARE
[ANONYMISERAD]

MOTPART
Svea Bil & Service AB

Nämndens beslut
Nämnden avslår anmälarens krav.

Motivering
Verkstaden har visat kvitto och arbetsorder som styrker att arbetet utförts. Anmälan avslås.`
  },
  {
    arendenr: "2024-18234",
    orgnr: "5568123456",
    datum_anmalan: "2024-09-10",
    datum_beslut: "2025-01-20",
    vara_tjanst: "Bilbesiktning",
    yrkande: "Återbetalning",
    belopp_yrkat: 3100,
    beslutskod: "Avvisat",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Ärendet avvisades då det inte utgör en konsumenttvist.",
    beslut_text: `BESLUT 2025-01-20 Änr 2024-18234

Ärendet avvisas. Besiktning utgör inte en konsumenttjänst i konsumenttjänstlagens mening.`
  },

  // ════════════════════════════════════════════════
  // NORRLANDS DÄCKENTER AB — 5 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-11203",
    orgnr: "5591234567",
    datum_anmalan: "2024-06-01",
    datum_beslut: "2024-10-15",
    vara_tjanst: "Däckbyte och förvaring",
    yrkande: "Återbetalning",
    belopp_yrkat: 6800,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Konsumenten betalade för däckförvaring men däcken försvann ur lagret.",
    beslut_text: `BESLUT 2024-10-15 Änr 2024-11203

ANMÄLARE
[ANONYMISERAD]

MOTPART
Norrlands Däckenter AB
Verkstadsgatan 8, 903 29 Umeå

Nämndens beslut
Nämnden rekommenderar Norrlands Däckenter AB att betala 6 800 kr till konsumenten.

Motivering
Bolaget har inte kunnat visa att däcken förvarats på ett betryggande sätt. Konsumenten har rätt till ersättning för förlorade däck.`
  },
  {
    arendenr: "2023-19876",
    orgnr: "5591234567",
    datum_anmalan: "2023-10-22",
    datum_beslut: "2024-02-28",
    vara_tjanst: "Däckbyte",
    yrkande: "Skadestånd",
    belopp_yrkat: 12000,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Felaktigt monterade däck orsakade trafikfarlig situation och skada på fordonet.",
    beslut_text: `BESLUT 2024-02-28 Änr 2023-19876

ANMÄLARE
[ANONYMISERAD]

MOTPART
Norrlands Däckenter AB

Nämndens beslut
Nämnden rekommenderar Norrlands Däckenter AB att betala 12 000 kr till konsumenten.

Motivering
Det är klarlagt att däcken monterades felaktigt vilket ledde till skada. Bolaget är skadeståndsskyldigt enligt konsumenttjänstlagen.`
  },
  {
    arendenr: "2024-05432",
    orgnr: "5591234567",
    datum_anmalan: "2024-03-08",
    datum_beslut: "2024-07-11",
    vara_tjanst: "Bilreparation",
    yrkande: "Prisavdrag",
    belopp_yrkat: 3500,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten anser priset orimligt högt för utförd service.",
    beslut_text: `BESLUT 2024-07-11 Änr 2024-05432

Nämndens beslut
Nämnden avslår anmälarens krav. Priset är inte oskäligt i förhållande till utfört arbete.`
  },

  // ════════════════════════════════════════════════
  // SUNTRAVEL SVERIGE AB — 7 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-07234",
    orgnr: "5593456789",
    datum_anmalan: "2024-04-05",
    datum_beslut: "2024-08-19",
    vara_tjanst: "Paketresa",
    yrkande: "Återbetalning",
    belopp_yrkat: 28500,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Hotell av lägre standard än utlovat. Havsvy saknades trots att detta var utlovat och betalat.",
    beslut_text: `BESLUT 2024-08-19 Änr 2024-07234

ANMÄLARE
[ANONYMISERAD]

MOTPART
SunTravel Sverige AB
Resevägen 22, 111 20 Stockholm

Nämndens beslut
Nämnden rekommenderar SunTravel Sverige AB att betala tillbaka 9 500 kr till konsumenten som prisavdrag.

Anmälarens krav
[ANONYMISERAD] kräver återbetalning med 28 500 kr. Familjen hade bokat ett rum med garanterad havsutsikt och frukost inkluderad. Vid ankomst fick de ett rum mot parkeringen och frukosten var inte inkluderad trots bokning.

Motpartens svar
SunTravel Sverige AB medger att havsvy inte kunde garanteras men bestrider kravet på full återbetalning.

Motivering
Nämnden finner att avtalsbrott föreligger avseende rumskategori. Prisavdrag om 9 500 kr är skäligt med hänsyn till vad som utlovats och vad som levererats. Paketreselagen 16 § tillämpas.`
  },
  {
    arendenr: "2024-13456",
    orgnr: "5593456789",
    datum_anmalan: "2024-07-14",
    datum_beslut: "2024-11-28",
    vara_tjanst: "Paketresa",
    yrkande: "Återbetalning",
    belopp_yrkat: 45000,
    beslutskod: "Delvis bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Resa inställd med kort varsel. Konsumenten fick alternativt datum som inte passade.",
    beslut_text: `BESLUT 2024-11-28 Änr 2024-13456

ANMÄLARE
[ANONYMISERAD]

MOTPART
SunTravel Sverige AB

Nämndens beslut
Nämnden rekommenderar SunTravel Sverige AB att betala tillbaka 38 000 kr till konsumenten.

Motivering
Researrangörens inställelse av resan berättigar konsumenten till full återbetalning av resans pris. Det erbjudna alternativet var inte likvärdigt. Paketreselagen 23 § tillämpas.`
  },
  {
    arendenr: "2023-22341",
    orgnr: "5593456789",
    datum_anmalan: "2023-11-30",
    datum_beslut: "2024-03-15",
    vara_tjanst: "Flygresa",
    yrkande: "Skadestånd",
    belopp_yrkat: 12000,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Försenat flyg orsakade missat hotell. Konsumenten kräver ersättning för utebliven hotellnatt.",
    beslut_text: `BESLUT 2024-03-15 Änr 2023-22341

Nämndens beslut
Nämnden avslår anmälarens krav. Flygförseningen berodde på extraordinära omständigheter (väder) vilket befriar arrangören från skadeståndsskyldighet.`
  },
  {
    arendenr: "2024-02198",
    orgnr: "5593456789",
    datum_anmalan: "2024-01-18",
    datum_beslut: "2024-05-22",
    vara_tjanst: "Paketresa",
    yrkande: "Prisavdrag",
    belopp_yrkat: 8900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Pool stängd under hela vistelsen trots att detta var en central del av bokningen.",
    beslut_text: `BESLUT 2024-05-22 Änr 2024-02198

ANMÄLARE
[ANONYMISERAD]

MOTPART
SunTravel Sverige AB

Nämndens beslut
Nämnden rekommenderar SunTravel Sverige AB att betala prisavdrag med 4 500 kr.

Motivering
Pool utgjorde en marknadsförd och central facilitet. Att den var stängd under hela vistelsen berättigar till prisavdrag.`
  },
  {
    arendenr: "2023-16782",
    orgnr: "5593456789",
    datum_anmalan: "2023-09-05",
    datum_beslut: "2024-01-10",
    vara_tjanst: "Paketresa",
    yrkande: "Återbetalning",
    belopp_yrkat: 31000,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten avbokade resa pga sjukdom men hade inte tecknat avbeställningsskydd.",
    beslut_text: `BESLUT 2024-01-10 Änr 2023-16782

Nämndens beslut
Nämnden avslår anmälarens krav. Konsumenten saknade avbeställningsskydd och sjukdom utgör inte skäl för återbetalning utan sådant skydd.`
  },

  // ════════════════════════════════════════════════
  // LÅNGHOLMEN KAJAK & VATTENSPORT AB — 7 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-09123",
    orgnr: "5598765432",
    datum_anmalan: "2024-05-02",
    datum_beslut: "2024-09-11",
    vara_tjanst: "2-pack uppblåsbar SUP",
    yrkande: "Återbetalning",
    belopp_yrkat: 8900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "2-pack uppblåsbara SUP-brädor läckte vid första användningen. Bolaget vägrade reklamation och hävdade att konsumenten pumpat brädan för hårt.",
    beslut_text: `BESLUT 2024-09-11 Änr 2024-09123

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB
Långholmsvägen 12, 117 33 Stockholm

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att betala tillbaka 8 900 kr till konsumenten.

Anmälarens krav
[ANONYMISERAD] begär återbetalning med 8 900 kr för ett 2-pack uppblåsbara SUP-brädor. Vid första användningstillfället, tre dagar efter köpet, började båda bräden läcka luft vid ventilerna. Konsumenten följde instruktionerna noggrant och pumpade till rekommenderat tryck på 15 PSI.

Motpartens svar
Långholmen Kajak & Vattensport AB bestrider kravet och hävdar att konsumenten överpumpat bräden till ett tryck som orsakat skadan. Bolaget presenterar inga tekniska bevis för detta påstående.

Motivering
Nämnden finner att bolaget inte styrkt att felet orsakats av konsumenten. Presumtionsregeln i konsumentköplagen 20a § innebär att felet presumeras ha funnits vid köpet. Läckage vid ventilerna på fabriksnya SUP-brädor är ett typiskt fabriksfel. Konsumenten har rätt till återbetalning. Nämnden noterar att bolaget inte följt nämndens tidigare rekommendationer i liknande ärenden.`
  },
  {
    arendenr: "2024-12876",
    orgnr: "5598765432",
    datum_anmalan: "2024-06-18",
    datum_beslut: "2024-10-30",
    vara_tjanst: "2-pack uppblåsbar SUP",
    yrkande: "Omleverans",
    belopp_yrkat: 8900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Samma produktserie som ovan. Fena lossnade vid andra paddlingstillfället. Bolaget hänvisar till köpvillkor om att reklamation måste göras inom 48 timmar.",
    beslut_text: `BESLUT 2024-10-30 Änr 2024-12876

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att leverera ett nytt 2-pack SUP-brädor utan defekter, eller återbetala 8 900 kr.

Motivering
Bolagets villkor om 48-timmars reklamationstid strider mot konsumentköplagen och är utan verkan. Konsumenten har rätt att reklamera fel som visar sig inom tre år från köpet. Fenan lossnade vid normal användning vilket tyder på fabriksfel i limningen. Nämnden noterar med oro att detta är det andra ärendet mot bolaget avseende samma produktserie inom kort tid.`
  },
  {
    arendenr: "2024-16234",
    orgnr: "5598765432",
    datum_anmalan: "2024-08-14",
    datum_beslut: "2024-12-05",
    vara_tjanst: "2-pack uppblåsbar SUP",
    yrkande: "Återbetalning",
    belopp_yrkat: 8900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Tredje ärendet på samma SUP-pack. Brädan sjönk ihop mitt ute på Mälaren. Räddningstjänsten tillkallades.",
    beslut_text: `BESLUT 2024-12-05 Änr 2024-16234

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att betala tillbaka 8 900 kr samt ersätta konsumenten för räddningstjänstkostnader om 2 200 kr, totalt 11 100 kr.

Motivering
Detta är det tredje ärendet nämnden behandlar avseende samma produktserie (2-pack uppblåsbar SUP) från Långholmen Kajak & Vattensport AB. Att en SUP-bräda sjunker ihop under användning utgör en allvarlig säkerhetsbrist. Nämnden rekommenderar bolaget att omedelbart se över produktsortimentet. Bolaget har inte följt nämndens tidigare rekommendationer i ärendena 2024-09123 och 2024-12876, vilket nämnden ser allvarligt på.`
  },
  {
    arendenr: "2023-19234",
    orgnr: "5598765432",
    datum_anmalan: "2023-10-05",
    datum_beslut: "2024-02-14",
    vara_tjanst: "Kajak",
    yrkande: "Återbetalning",
    belopp_yrkat: 12500,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Kajak levererad med spricka i skrovet. Bolaget hävdade att skadan uppstått under transport och att konsumenten borde ha reklamerat vid leverans.",
    beslut_text: `BESLUT 2024-02-14 Änr 2023-19234

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att betala tillbaka 12 500 kr.

Motivering
Sprickan i skrovet är ett fel som bolaget ansvarar för oavsett när det uppstod. Konsumenten hade ingen möjlighet att upptäcka felet vid leverans då kajaken var förpackad. Bolaget har inte följt nämndens rekommendation.`
  },
  {
    arendenr: "2024-03456",
    orgnr: "5598765432",
    datum_anmalan: "2024-02-01",
    datum_beslut: "2024-06-20",
    vara_tjanst: "Paddlar",
    yrkande: "Återbetalning",
    belopp_yrkat: 2400,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten vill returnera paddlar som inte passade. Bolaget hänvisar till att varan är testad och inte kan returneras.",
    beslut_text: `BESLUT 2024-06-20 Änr 2024-03456

Nämndens beslut
Nämnden avslår anmälarens krav. Konsumenten har testat paddlarna och ångerrätten gäller inte för varor som provats och inte kan återlämnas i ursprungligt skick.`
  },
  {
    arendenr: "2023-11876",
    orgnr: "5598765432",
    datum_anmalan: "2023-06-12",
    datum_beslut: "2023-10-28",
    vara_tjanst: "Uppblåsbar SUP",
    yrkande: "Skadestånd",
    belopp_yrkat: 5600,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "SUP-bräda sprack vid uppblåsning. Konsumenten skadade sig lindrigt och kräver ersättning.",
    beslut_text: `BESLUT 2023-10-28 Änr 2023-11876

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att betala 5 600 kr i skadestånd till konsumenten.

Motivering
En SUP-bräda som spricker vid uppblåsning till rekommenderat tryck är behäftad med ett allvarligt säkerhetsfel. Bolaget är skadeståndsskyldigt för den skada som uppstod till följd av felet.`
  },
  {
    arendenr: "2024-19876",
    orgnr: "5598765432",
    datum_anmalan: "2024-10-03",
    datum_beslut: "2025-02-18",
    vara_tjanst: "2-pack uppblåsbar SUP",
    yrkande: "Återbetalning",
    belopp_yrkat: 8900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Fjärde ärendet på samma SUP-pack. Ventilerna håller inte tätt från dag ett.",
    beslut_text: `BESLUT 2025-02-18 Änr 2024-19876

ANMÄLARE
[ANONYMISERAD]

MOTPART
Långholmen Kajak & Vattensport AB

Nämndens beslut
Nämnden rekommenderar Långholmen Kajak & Vattensport AB att omedelbart betala tillbaka 8 900 kr.

Motivering
Detta är det fjärde ärendet nämnden behandlar avseende 2-pack uppblåsbara SUP-brädor från Långholmen Kajak & Vattensport AB. Bolaget har inte följt nämndens rekommendationer i något av de tidigare ärendena (2024-09123, 2024-12876, 2024-16234). Nämnden uppmanar bolaget i det starkaste att omgående sluta sälja denna produkt och följa nämndens rekommendationer. Konsumenten har självklart rätt till full återbetalning.`
  },

  // ════════════════════════════════════════════════
  // TECHGIGANTEN SVERIGE AB — 8 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-04512",
    orgnr: "5566789012",
    datum_anmalan: "2024-02-28",
    datum_beslut: "2024-07-04",
    vara_tjanst: "Mobiltelefon",
    yrkande: "Omleverans",
    belopp_yrkat: 12900,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Mobiltelefon hade fabriksfel. Företaget vägrade reparera eller byta ut trots reklamation inom garantitiden.",
    beslut_text: `BESLUT 2024-07-04 Änr 2024-04512

ANMÄLARE
[ANONYMISERAD]

MOTPART
TechGiganten Sverige AB
Handelsvägen 55, 172 63 Sundbyberg

Nämndens beslut
Nämnden rekommenderar TechGiganten Sverige AB att byta ut mobiltelefonen mot en likvärdig ny eller att betala tillbaka 12 900 kr.

Anmälarens krav
[ANONYMISERAD] begär omleverans eller återbetalning. Mobiltelefonen slutade fungera efter tre månader. Reklamation gjordes inom garantitiden men bolaget hävdade att skadan var konsumentorsakad utan att kunna styrka detta.

Motpartens svar
TechGiganten Sverige AB hävdar att skadan orsakats av konsumenten genom stöt eller fukt.

Motivering
Bolaget har inte lyckats styrka att felet orsakats av konsumenten. Presumtionsregeln i konsumentköplagen 20a § innebär att felet presumeras ha funnits vid köpet. Konsumenten har rätt till avhjälpande eller omleverans.`
  },
  {
    arendenr: "2024-10987",
    orgnr: "5566789012",
    datum_anmalan: "2024-05-15",
    datum_beslut: "2024-09-23",
    vara_tjanst: "Bärbar dator",
    yrkande: "Återbetalning",
    belopp_yrkat: 18500,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Dator levererades med fel specifikation. Konsumenten beställde 16 GB RAM men fick 8 GB.",
    beslut_text: `BESLUT 2024-09-23 Änr 2024-10987

ANMÄLARE
[ANONYMISERAD]

MOTPART
TechGiganten Sverige AB

Nämndens beslut
Nämnden rekommenderar TechGiganten Sverige AB att betala tillbaka 18 500 kr till konsumenten.

Motivering
Varan avviker från vad som avtalats. Konsumenten har rätt att häva köpet och få full återbetalning enligt konsumentköplagen 29 §.`
  },
  {
    arendenr: "2023-21098",
    orgnr: "5566789012",
    datum_anmalan: "2023-11-08",
    datum_beslut: "2024-03-20",
    vara_tjanst: "TV",
    yrkande: "Återbetalning",
    belopp_yrkat: 8900,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "TV med döda pixlar. Bolaget erbjöd reparation men konsumenten krävde återbetalning.",
    beslut_text: `BESLUT 2024-03-20 Änr 2023-21098

Nämndens beslut
Nämnden avslår anmälarens krav på återbetalning. Bolaget har erbjudit avhjälpande vilket är tillräckligt i detta skede. Konsumenten bör acceptera reparationserbjudandet.`
  },
  {
    arendenr: "2024-16543",
    orgnr: "5566789012",
    datum_anmalan: "2024-08-22",
    datum_beslut: "2024-12-10",
    vara_tjanst: "Hörlurar",
    yrkande: "Återbetalning",
    belopp_yrkat: 3200,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Hörlurar slutade fungera efter 5 månader. Bolaget vägrade reklamation och hävdade normalt slitage.",
    beslut_text: `BESLUT 2024-12-10 Änr 2024-16543

ANMÄLARE
[ANONYMISERAD]

MOTPART
TechGiganten Sverige AB

Nämndens beslut
Nämnden rekommenderar TechGiganten Sverige AB att betala tillbaka 3 200 kr.

Motivering
Hörlurar förväntas hålla längre än 5 månader vid normal användning. Felet är att anse som ursprungligt.`
  },
  {
    arendenr: "2023-08765",
    orgnr: "5566789012",
    datum_anmalan: "2023-04-30",
    datum_beslut: "2023-09-15",
    vara_tjanst: "Spelkonsol",
    yrkande: "Omleverans",
    belopp_yrkat: 6500,
    beslutskod: "Delvis bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Spelkonsol med diskläsarfel. Bolaget erbjöd reparation, nämnden rekommenderar omleverans.",
    beslut_text: `BESLUT 2023-09-15 Änr 2023-08765

Nämndens beslut
Nämnden rekommenderar TechGiganten Sverige AB att leverera en ny spelkonsol av samma modell eller återbetala 6 500 kr.`
  },

  // ════════════════════════════════════════════════
  // DIGITALHUSET ONLINE AB — 6 ärenden
  // ════════════════════════════════════════════════
  {
    arendenr: "2024-08234",
    orgnr: "5597890123",
    datum_anmalan: "2024-04-18",
    datum_beslut: "2024-08-30",
    vara_tjanst: "Surfplatta",
    yrkande: "Återbetalning",
    belopp_yrkat: 7800,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: true,
    beskrivning: "Surfplatta levererades aldrig trots betalning. Bolaget svarade inte på kontaktförsök.",
    beslut_text: `BESLUT 2024-08-30 Änr 2024-08234

ANMÄLARE
[ANONYMISERAD]

MOTPART
Digitalhuset Online AB
Näthandelsvägen 3, 411 03 Göteborg

Nämndens beslut
Nämnden rekommenderar Digitalhuset Online AB att betala tillbaka 7 800 kr med ränta.

Motivering
Bolaget har inte levererat varan och har inte svarat på nämndens förfrågningar. Konsumenten har rätt till återbetalning.`
  },
  {
    arendenr: "2024-14321",
    orgnr: "5597890123",
    datum_anmalan: "2024-07-02",
    datum_beslut: "2024-11-14",
    vara_tjanst: "Smartwatch",
    yrkande: "Återbetalning",
    belopp_yrkat: 4500,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Varan skickades aldrig. Bolaget hänvisar till lager-problem men har inte återbetalat.",
    beslut_text: `BESLUT 2024-11-14 Änr 2024-14321

Nämndens beslut
Nämnden rekommenderar Digitalhuset Online AB att betala tillbaka 4 500 kr. Bolaget har inte fullgjort sin leveransskyldighet.`
  },
  {
    arendenr: "2023-17654",
    orgnr: "5597890123",
    datum_anmalan: "2023-09-12",
    datum_beslut: "2024-01-25",
    vara_tjanst: "Kamera",
    yrkande: "Återbetalning",
    belopp_yrkat: 11200,
    beslutskod: "Bifall",
    rattelse: true,
    foljt_beslut: false,
    beskrivning: "Kamera levererad med synliga repor och skador. Bolaget vägrade ta tillbaka varan.",
    beslut_text: `BESLUT 2024-01-25 Änr 2023-17654

Nämndens beslut
Nämnden rekommenderar Digitalhuset Online AB att ta tillbaka kameran och betala tillbaka 11 200 kr. Varan avviker från avtalet.`
  },
  {
    arendenr: "2024-01876",
    orgnr: "5597890123",
    datum_anmalan: "2024-01-05",
    datum_beslut: "2024-05-08",
    vara_tjanst: "Datorskärm",
    yrkande: "Prisavdrag",
    belopp_yrkat: 2100,
    beslutskod: "Avslag",
    rattelse: false,
    foljt_beslut: true,
    beskrivning: "Konsumenten anser sig ha blivit vilseledd om skärmens upplösning.",
    beslut_text: `BESLUT 2024-05-08 Änr 2024-01876

Nämndens beslut
Nämnden avslår anmälarens krav. Produktbeskrivningen var korrekt och konsumenten borde ha kontrollerat specifikationerna före köp.`
  },
];

// ── Beräknade flaggor per bolag ──────────────────────────────────────────────
export function getBolagStats(orgnr) {
  const arenden = ARN_ARENDEN.filter(a => a.orgnr === orgnr);
  const fallen = arenden.filter(a => a.beslutskod === "Bifall" || a.beslutskod === "Delvis bifall");
  const foljda = fallen.filter(a => a.foljt_beslut);
  return {
    antal: arenden.length,
    fallen: fallen.length,
    foljt: foljda.length,
    arenden,
  };
}
