export const REQUEST_TYPES = [
  {
    id: 'erasure',
    label: 'Gegevenswissing (Vergeet Mij)',
    article: 'Art. 17 AVG',
    description: 'Verzoek tot onmiddellijke en volledige vernietiging van al je persoonsgegevens, account en profielen.',
    color: '#ef4444'
  },
  {
    id: 'access',
    label: 'Inzageverzoek (Data Inzien)',
    article: 'Art. 15 AVG',
    description: 'Vraag een compleet overzicht op van alle data die het bedrijf over jou heeft verzameld en verwerkt.',
    color: '#3b82f6'
  },
  {
    id: 'objection',
    label: 'Marketingstop & Bezwaar',
    article: 'Art. 21 AVG',
    description: 'Direct verbod op het gebruik van je gegevens voor nieuwsbrieven, profilering, advertenties en tracking.',
    color: '#f59e0b'
  }
];

export function generateSubject({ type, companyName, language = 'nl' }) {
  if (language === 'en') {
    switch (type) {
      case 'erasure':
        return `GDPR Request: Erasure of Personal Data (Art. 17 GDPR) - ${companyName}`;
      case 'access':
        return `GDPR Request: Right of Access to Personal Data (Art. 15 GDPR) - ${companyName}`;
      case 'objection':
        return `GDPR Request: Objection to Processing and Direct Marketing (Art. 21 GDPR) - ${companyName}`;
      default:
        return `GDPR Request - ${companyName}`;
    }
  }

  switch (type) {
    case 'erasure':
      return `AVG Verzoek: Recht op gegevenswissing (Art. 17 AVG) - ${companyName}`;
    case 'access':
      return `AVG Verzoek: Recht op inzage persoonsgegevens (Art. 15 AVG) - ${companyName}`;
    case 'objection':
      return `AVG Verzoek: Bezwaar tegen verwerking en direct marketing (Art. 21 AVG) - ${companyName}`;
    default:
      return `AVG Verzoek - ${companyName}`;
  }
}

export function generateLetter({
  type,
  companyName,
  userName,
  userEmail,
  identifier = '',
  notes = '',
  language = 'nl'
}) {
  const today = new Date().toLocaleDateString(language === 'en' ? 'en-GB' : 'nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const identifierLineNl = identifier.trim()
    ? `Klantnummer / Account-ID: ${identifier.trim()}\n`
    : '';
  const identifierLineEn = identifier.trim()
    ? `Customer ID / Account ID: ${identifier.trim()}\n`
    : '';

  const notesLineNl = notes.trim()
    ? `\nAanvullende toelichting:\n${notes.trim()}\n`
    : '';
  const notesLineEn = notes.trim()
    ? `\nAdditional context:\n${notes.trim()}\n`
    : '';

  if (language === 'en') {
    return generateEnglishLetter({
      type,
      companyName,
      userName: userName || '[Your Name]',
      userEmail: userEmail || '[Your Email]',
      identifierLine: identifierLineEn,
      notesLine: notesLineEn,
      today
    });
  }

  return generateDutchLetter({
    type,
    companyName,
    userName: userName || '[Jouw Naam]',
    userEmail: userEmail || '[jouw@email.nl]',
    identifierLine: identifierLineNl,
    notesLine: notesLineNl,
    today
  });
}

function generateDutchLetter({
  type,
  companyName,
  userName,
  userEmail,
  identifierLine,
  notesLine,
  today
}) {
  let bodyContent = '';

  if (type === 'erasure') {
    bodyContent = `Hierbij doe ik formeel een beroep op mijn recht op gegevenswissing ('het recht om vergeten te worden') op grond van artikel 17 van de Algemene Verordening Gegevensbescherming (EU Verordening 2016/679, hierna: AVG).

Ik verzoek u met onmiddellijke ingang:
1. Alle op mij betrekking hebbende persoonsgegevens, gebruikersaccounts, profielen, aankoopgeschiedenissen en trackingdata permanent en onomkeerbaar uit uw systemen, databases en back-ups te verwijderen.
2. Overeenkomstig artikel 19 van de AVG iedere ontvanger aan wie deze persoonsgegevens eventueel zijn verstrekt (inclusief verwerkers en derde partijen) op de hoogte te stellen van deze gegevenswissing, zodat ook zij deze gegevens verwijderen.
3. Mij schriftelijk de definitieve verwijdering te bevestigen.`;
  } else if (type === 'access') {
    bodyContent = `Hierbij doe ik formeel een beroep op mijn recht op inzage op grond van artikel 15 van de Algemene Verordening Gegevensbescherming (EU Verordening 2016/679, hierna: AVG).

Ik verzoek u mij een volledig overzicht te verstrekken van:
1. Welke persoonsgegevens u van mij verwerkt en voor welke concrete doeleinden.
2. De categorieën van persoonsgegevens die worden bewaard en de geplande bewaartermijn(en).
3. De ontvangers of categorieën van ontvangers aan wie mijn gegevens zijn of worden verstrekt (inclusief doorgifte buiten de EER).
4. De herkomst van de persoonsgegevens (indien niet rechtstreeks van mij verkregen).
5. Een kosteloze elektronische kopie van alle bovengenoemde persoonsgegevens (Art. 15 lid 3 AVG).`;
  } else {
    bodyContent = `Hierbij maak ik formeel bezwaar op grond van artikel 21 van de Algemene Verordening Gegevensbescherming (EU Verordening 2016/679, hierna: AVG) tegen de verwerking van mijn persoonsgegevens.

In het bijzonder verzoek ik u:
1. Mijn persoonsgegevens met onmiddellijke ingang niet langer te verwerken voor direct marketing doeleinden (Art. 21 lid 2 AVG). Dit recht is absoluut en behoeft geen belangenafweging.
2. Iedere vorm van profilering, geautomatiseerde besluitvorming en commerciële analyse met betrekking tot mijn persoon direct te staken.
3. Mijn contactgegevens niet langer te gebruiken voor nieuwsbrieven, telefonische benadering, e-mails of post.`;
  }

  return `Datum: ${today}
Aan: De Functionaris voor Gegevensbescherming (DPO) / Privacy Officer van ${companyName}
Betreft: Formeel verzoek op grond van de AVG

Geachte Functionaris Gegevensbescherming,

Mijn persoonsgegevens bij uw organisatie zijn bekend onder:
Naam: ${userName}
E-mailadres: ${userEmail}
${identifierLine}${notesLine}
${bodyContent}

VERIFICATIE EN IDENTIFICATIE:
Aangezien ik dit verzoek verstuur vanaf het bij u bekende e-mailadres (${userEmail}), is mijn identiteit afdoende vastgesteld. Mocht u desondanks twijfel hebben over mijn identiteit, verzoek ik u op grond van het proportionaliteitsbeginsel (Art. 12 lid 6 AVG) te volstaan met een passende, niet-disproportionele verificatiemethode (bijvoorbeeld een bevestigingslink of verificatiecode via e-mail). Het opvragen van een onbeveiligde kopie van een nationaal identiteitsbewijs is disproportioneel en in strijd met de richtlijnen van de Autoriteit Persoonsgegevens.

WETTELIJKE TERMIJN EN HANDHAVING:
Op grond van artikel 12 lid 3 van de AVG bent u wettelijk verplicht om onverwijld en in ieder geval binnen één maand na ontvangst van dit verzoek inhoudelijk te reageren en uitvoering te geven aan dit verzoek.

Indien u nalaat om binnen de wettelijke termijn van één maand aan dit verzoek te voldoen, zal ik mij zonder nadere aankondiging genoodzaakt zien een formele handhavingsklacht in te dienen bij de Autoriteit Persoonsgegevens (AP) op grond van artikel 77 van de AVG. Tevens behoud ik mij het recht voor een civielrechtelijke procedure te starten en melding te maken van eventuele boeteoplegging op grond van artikel 83 van de AVG.

Ik zie uw schriftelijke bevestiging van de afhandeling van dit verzoek binnen de gestelde termijn met belangstelling tegemoet.

Met vriendelijke groet,

${userName}
E-mail: ${userEmail}`;
}

function generateEnglishLetter({
  type,
  companyName,
  userName,
  userEmail,
  identifierLine,
  notesLine,
  today
}) {
  let bodyContent = '';

  if (type === 'erasure') {
    bodyContent = `I am hereby formally exercising my right to erasure ('right to be forgotten') pursuant to Article 17 of the General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR").

I request that you immediately:
1. Permanently and irreversibly erase all personal data, user accounts, profiles, purchase histories, and telemetry/tracking data pertaining to me from your systems, databases, and backups.
2. In accordance with Article 19 GDPR, notify any recipients to whom my personal data has been disclosed (including processors and third parties) of this erasure.
3. Provide me with formal written confirmation once the erasure has been completed.`;
  } else if (type === 'access') {
    bodyContent = `I am hereby formally exercising my right of access pursuant to Article 15 of the General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR").

I request that you provide me with:
1. Full details of the personal data you process concerning me and the purposes of processing.
2. The categories of personal data concerned and their retention periods.
3. The recipients or categories of recipient to whom the personal data have been or will be disclosed.
4. The origin of the personal data where it was not collected directly from me.
5. A free electronic copy of all my personal data undergoing processing (Art. 15(3) GDPR).`;
  } else {
    bodyContent = `I am hereby formally objecting to the processing of my personal data pursuant to Article 21 of the General Data Protection Regulation (Regulation (EU) 2016/679, "GDPR").

Specifically, I request that you:
1. Immediately cease processing my personal data for direct marketing purposes (Art. 21(2) GDPR). This right is absolute.
2. Immediately cease all profiling, automated tracking, and behavioural analysis related to me.
3. Remove my contact details from all marketing lists and communications.`;
  }

  return `Date: ${today}
To: Data Protection Officer (DPO) / Privacy Team at ${companyName}
Subject: Formal request under the General Data Protection Regulation (GDPR)

Dear Data Protection Officer,

My personal details on record with your service are:
Name: ${userName}
Email address: ${userEmail}
${identifierLine}${notesLine}
${bodyContent}

VERIFICATION & IDENTIFICATION:
Since this request originates from the email address registered on my account (${userEmail}), my identity is adequately established. Should you require further reasonable verification under Article 12(6) GDPR, please propose a proportionate method (such as an email confirmation link or in-app prompt). Demanding an unredacted copy of an official identity card is disproportionate and contrary to European Data Protection Board (EDPB) guidelines.

STATUTORY TIME LIMIT AND ENFORCEMENT:
Under Article 12(3) of the GDPR, you are legally required to respond without undue delay and at the latest within one month of receipt of this request.

Please note that failure to comply within the statutory one-month period will result in a formal complaint being lodged with the competent Data Protection Authority under Article 77 GDPR, without further notice. I also reserve the right to seek judicial remedies under Article 79 GDPR and draw attention to statutory administrative fines under Article 83 GDPR.

I look forward to receiving your prompt written confirmation.

Yours sincerely,

${userName}
Email: ${userEmail}`;
}
