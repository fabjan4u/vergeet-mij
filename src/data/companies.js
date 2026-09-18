export const CATEGORIES = [
  'Alles',
  'Webshops & Retail',
  'Telecom & Media',
  'Sport & Vrije Tijd',
  'Bezorging & Vervoer',
  'Big Tech & Socials',
  'Financieel & Klarna'
];

export const COMPANIES = [
  // Webshops & Retail
  {
    id: 'bol-com',
    name: 'Bol.com',
    category: 'Webshops & Retail',
    email: 'privacy@bol.com',
    tip: 'Vermeld het e-mailadres van je Bol-account en eventueel een recent bestelnummer ter verificatie.',
    portalUrl: 'https://www.bol.com/nl/nl/m/privacy-policy/'
  },
  {
    id: 'coolblue',
    name: 'Coolblue',
    category: 'Webshops & Retail',
    email: 'privacy@coolblue.nl',
    tip: 'Stuur de mail vanaf het adres dat gekoppeld is aan je Coolblue-account.',
    portalUrl: 'https://www.coolblue.nl/klantenservice/privacy'
  },
  {
    id: 'albert-heijn',
    name: 'Albert Heijn (Ahold Delhaize)',
    category: 'Webshops & Retail',
    email: 'privacy@ah.nl',
    tip: 'Vermeld je Bonuskaartnummer en het e-mailadres van je Mijn AH-profiel.',
    portalUrl: 'https://www.ah.nl/privacy'
  },
  {
    id: 'jumbo',
    name: 'Jumbo Supermarkten',
    category: 'Webshops & Retail',
    email: 'privacy@jumbo.com',
    tip: 'Vermeld je Jumbo Extra’s pasnummer en geregistreerd e-mailadres.',
    portalUrl: 'https://www.jumbo.com/service/privacy-en-cookies'
  },
  {
    id: 'wehkamp',
    name: 'Wehkamp',
    category: 'Webshops & Retail',
    email: 'privacy@wehkamp.nl',
    tip: 'Vermeld je klantnummer en geregistreerd e-mailadres.',
    portalUrl: 'https://www.wehkamp.nl/specials/privacy-policy/'
  },
  {
    id: 'mediamarkt',
    name: 'MediaMarkt Nederland',
    category: 'Webshops & Retail',
    email: 'privacy@mediamarkt.nl',
    tip: 'Vermeld je Club-nummer of het account e-mailadres.',
    portalUrl: 'https://www.mediamarkt.nl/nl/legal/privacy'
  },
  {
    id: 'zalando',
    name: 'Zalando',
    category: 'Webshops & Retail',
    email: 'privacy@zalando.nl',
    tip: 'Stuur het verzoek vanaf het e-mailadres waarmee je inlogt op Zalando.',
    portalUrl: 'https://www.zalando.nl/zalando-privacy-policy/'
  },
  {
    id: 'amazon-nl',
    name: 'Amazon Nederland / EU',
    category: 'Webshops & Retail',
    email: 'eu-privacy@amazon.nl',
    tip: 'Amazon verwerkt verwijderingen bij voorkeur via je accountpagina, maar dit e-mailadres is formeel verplicht verzoeken te behandelen.',
    portalUrl: 'https://www.amazon.nl/hz/privacy-central'
  },
  {
    id: 'hema',
    name: 'HEMA',
    category: 'Webshops & Retail',
    email: 'privacy@hema.nl',
    tip: 'Vermeld je "Meer HEMA" klantenpasnummer indien van toepassing.',
    portalUrl: 'https://www.hema.nl/privacy-statement'
  },

  // Telecom & Media
  {
    id: 'vodafoneziggo',
    name: 'VodafoneZiggo',
    category: 'Telecom & Media',
    email: 'dpo@vodafoneziggo.com',
    tip: 'Vermeld je klantnummer en het adres waarop het abonnement geregistreerd staat.',
    portalUrl: 'https://www.ziggo.nl/privacy'
  },
  {
    id: 'kpn',
    name: 'KPN',
    category: 'Telecom & Media',
    email: 'privacy@kpn.com',
    tip: 'Vermeld je klantnummer of vaste aansluitadres.',
    portalUrl: 'https://www.kpn.com/privacy'
  },
  {
    id: 'odido',
    name: 'Odido (voorheen T-Mobile / Tele2)',
    category: 'Telecom & Media',
    email: 'privacy@odido.nl',
    tip: 'Vermeld je 06-nummer en klantnummer.',
    portalUrl: 'https://www.odido.nl/privacy'
  },
  {
    id: 'dpg-media',
    name: 'DPG Media (NU.nl, AD, Volkskrant, etc.)',
    category: 'Telecom & Media',
    email: 'privacy@dpgmedia.nl',
    tip: 'DPG beheert centrale accounts voor tientallen nieuwssites. Vermeld je DPG-login e-mail.',
    portalUrl: 'https://www.dpgmedia.nl/privacy'
  },
  {
    id: 'mediahuis',
    name: 'Mediahuis (De Telegraaf, NRC, etc.)',
    category: 'Telecom & Media',
    email: 'privacy@mediahuis.nl',
    tip: 'Vermeld op welke krant of digitaal abonnement je geregistreerd stond.',
    portalUrl: 'https://www.mediahuis.nl/privacy'
  },
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Telecom & Media',
    email: 'privacy@netflix.com',
    tip: 'Stuur vanaf het e-mailadres gekoppeld aan je Netflix-profiel.',
    portalUrl: 'https://help.netflix.com/nl/node/100628'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Telecom & Media',
    email: 'privacy@spotify.com',
    tip: 'Vermeld je Spotify-gebruikersnaam en geregistreerd e-mailadres.',
    portalUrl: 'https://www.spotify.com/nl/account/privacy/'
  },

  // Sport & Vrije Tijd
  {
    id: 'basic-fit',
    name: 'Basic-Fit',
    category: 'Sport & Vrije Tijd',
    email: 'privacy@basic-fit.com',
    tip: 'Basic-Fit bewaart vaak langdurig gegevens na opzegging. Vermeld je pasnummer of lidmaatschapsnummer!',
    portalUrl: 'https://www.basic-fit.com/nl-nl/privacy'
  },
  {
    id: 'sportcity',
    name: 'SportCity / Fit For Free',
    category: 'Sport & Vrije Tijd',
    email: 'privacy@sportcity.nl',
    tip: 'Vermeld je lidnummer of geregistreerd e-mailadres.',
    portalUrl: 'https://www.sportcity.nl/privacy'
  },
  {
    id: 'biggym',
    name: 'BigGym',
    category: 'Sport & Vrije Tijd',
    email: 'klantenservice@biggym.nl',
    tip: 'Vermeld je lidnummer en vestiging.',
    portalUrl: 'https://biggym.nl/privacy'
  },

  // Bezorging & Vervoer
  {
    id: 'thuisbezorgd',
    name: 'Thuisbezorgd.nl (Just Eat Takeaway)',
    category: 'Bezorging & Vervoer',
    email: 'privacy-concerns@takeaway.com',
    tip: 'Stuur het verzoek vanaf het e-mailadres waarmee je maaltijden bestelde.',
    portalUrl: 'https://www.thuisbezorgd.nl/privacy-statement'
  },
  {
    id: 'uber',
    name: 'Uber / Uber Eats',
    category: 'Bezorging & Vervoer',
    email: 'privacy@uber.com',
    tip: 'Vermeld het telefoonnummer en e-mailadres van je Uber-profiel.',
    portalUrl: 'https://www.uber.com/legal/privacy'
  },
  {
    id: 'ns',
    name: 'NS (Nederlandse Spoorwegen)',
    category: 'Bezorging & Vervoer',
    email: 'functionarisgegevensbescherming@ns.nl',
    tip: 'Vermeld je Mijn NS e-mailadres en eventueel OV-chipkaartnummer.',
    portalUrl: 'https://www.ns.nl/privacy'
  },
  {
    id: 'swapfiets',
    name: 'Swapfiets',
    category: 'Bezorging & Vervoer',
    email: 'privacy@swapfiets.nl',
    tip: 'Vermeld je contract- of klantnummer en e-mailadres.',
    portalUrl: 'https://swapfiets.nl/privacy-policy'
  },
  {
    id: 'klm',
    name: 'KLM Royal Dutch Airlines',
    category: 'Bezorging & Vervoer',
    email: 'klmprivacyoffice@klm.com',
    tip: 'Vermeld je Flying Blue nummer indien van toepassing.',
    portalUrl: 'https://www.klm.nl/information/legal/privacy-policy'
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    category: 'Bezorging & Vervoer',
    email: 'dataprotectionoffice@booking.com',
    tip: 'Stuur vanaf het e-mailadres van je Booking.com account.',
    portalUrl: 'https://www.booking.com/content/privacy.nl.html'
  },

  // Big Tech & Socials
  {
    id: 'meta',
    name: 'Meta (Facebook, Instagram, WhatsApp)',
    category: 'Big Tech & Socials',
    email: 'support@fb.com',
    tip: 'Meta gebruikt primair hun online formulieren, maar is onder EU-recht verplicht dit DPO-adres te verwerken.',
    portalUrl: 'https://www.facebook.com/privacy/policy'
  },
  {
    id: 'google',
    name: 'Google / YouTube / Alphabet',
    category: 'Big Tech & Socials',
    email: 'data-protection-office@google.com',
    tip: 'Vermeld je Google-account e-mailadres (Gmail of gekoppeld).',
    portalUrl: 'https://policies.google.com/privacy'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'Big Tech & Socials',
    email: 'privacy@tiktok.com',
    tip: 'Vermeld je gebruikersnaam (@handle) en telefoon/e-mail.',
    portalUrl: 'https://www.tiktok.com/legal/page/eea/privacy-policy/nl'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn / Microsoft',
    category: 'Big Tech & Socials',
    email: 'privacy@linkedin.com',
    tip: 'Vermeld de URL van je openbare profiel en je account e-mail.',
    portalUrl: 'https://www.linkedin.com/legal/privacy-policy'
  },
  {
    id: 'x-twitter',
    name: 'X (voorheen Twitter)',
    category: 'Big Tech & Socials',
    email: 'dpo@x.com',
    tip: 'Vermeld je @handle en geregistreerd e-mailadres.',
    portalUrl: 'https://x.com/privacy'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'Big Tech & Socials',
    email: 'privacy-support@pinterest.com',
    tip: 'Vermeld je Pinterest gebruikersnaam en account e-mail.',
    portalUrl: 'https://policy.pinterest.com/nl/privacy-policy'
  },

  // Financieel & Klarna
  {
    id: 'klarna',
    name: 'Klarna Bank AB',
    category: 'Financieel & Klarna',
    email: 'privacy@klarna.nl',
    tip: 'Klarna bewaart enorme hoeveelheden aankoop- en kredietprofielen. Vermeld je e-mailadres en telefoonnummer.',
    portalUrl: 'https://www.klarna.com/nl/privacy/'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    category: 'Financieel & Klarna',
    email: 'dpo@paypal.com',
    tip: 'Vermeld je primaire PayPal e-mailadres.',
    portalUrl: 'https://www.paypal.com/nl/webapps/mpp/ua/privacy-full'
  },
  {
    id: 'tikkie',
    name: 'Tikkie (ABN AMRO)',
    category: 'Financieel & Klarna',
    email: 'privacy@tikkie.me',
    tip: 'Vermeld het 06-nummer waarmee je Tikkie gebruikt.',
    portalUrl: 'https://www.tikkie.me/privacy'
  }
];
