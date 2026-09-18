import React, { useState, useMemo } from 'react';
import { COMPANIES, CATEGORIES } from './data/companies';
import { REQUEST_TYPES, generateSubject, generateLetter } from './data/legalTemplates';
import { generateICS, generateGoogleCalendarUrl } from './utils/calendar';
import './App.css';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Alles');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState('bol-com');
  const [isCustomCompany, setIsCustomCompany] = useState(false);

  // Custom company state
  const [customCompanyName, setCustomCompanyName] = useState('');
  const [customCompanyEmail, setCustomCompanyEmail] = useState('');

  // Request & User state
  const [requestType, setRequestType] = useState('erasure');
  const [language, setLanguage] = useState('nl');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userIdentifier, setUserIdentifier] = useState('');
  const [userNotes, setUserNotes] = useState('');

  // Feedback states
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return COMPANIES.filter((c) => {
      const matchesCategory =
        selectedCategory === 'Alles' || c.category === selectedCategory;
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeCompany = useMemo(() => {
    if (isCustomCompany) {
      return {
        name: customCompanyName.trim() || 'Het Bedrijf',
        email: customCompanyEmail.trim() || 'privacy@bedrijf.nl',
        tip: 'Zorg ervoor dat het e-mailadres klopt (zoek op: "bedrijfsnaam privacy policy" of "functionaris gegevensbescherming").'
      };
    }
    const found = COMPANIES.find((c) => c.id === selectedCompanyId);
    return found || COMPANIES[0];
  }, [isCustomCompany, customCompanyName, customCompanyEmail, selectedCompanyId]);

  // Generate the subject and letter content
  const emailSubject = useMemo(() => {
    return generateSubject({
      type: requestType,
      companyName: activeCompany.name,
      language
    });
  }, [requestType, activeCompany.name, language]);

  const letterContent = useMemo(() => {
    return generateLetter({
      type: requestType,
      companyName: activeCompany.name,
      userName,
      userEmail,
      identifier: userIdentifier,
      notes: userNotes,
      language
    });
  }, [requestType, activeCompany.name, userName, userEmail, userIdentifier, userNotes, language]);

  // Request type label
  const requestTypeLabel = useMemo(() => {
    const found = REQUEST_TYPES.find((r) => r.id === requestType);
    return found ? `${found.article} - ${found.label}` : 'AVG Verzoek';
  }, [requestType]);

  // Calculate 30-day statutory deadline
  const rawDeadlineDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);

  const deadlineDate = useMemo(() => {
    return rawDeadlineDate.toLocaleDateString(language === 'en' ? 'en-GB' : 'nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, [rawDeadlineDate, language]);

  // Actions
  const handleCopyLetter = () => {
    navigator.clipboard.writeText(letterContent);
    showToast('📋 Brief gekopieerd naar klembord!');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(activeCompany.email);
    showToast(`📧 E-mailadres (${activeCompany.email}) gekopieerd!`);
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([letterContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `AVG-Verzoek-${activeCompany.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('💾 Bestand gedownload als .txt!');
  };

  const handleDownloadICS = () => {
    const icsContent = generateICS({
      companyName: activeCompany.name,
      companyEmail: activeCompany.email,
      requestTypeLabel,
      deadlineDate: rawDeadlineDate
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = `AVG-Deadline-${activeCompany.name.replace(/[^a-z0-9]/gi, '_')}.ics`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast(`📅 Agenda-afspraak (.ics) voor ${activeCompany.name} gedownload!`);
  };

  const googleCalendarUrl = useMemo(() => {
    return generateGoogleCalendarUrl({
      companyName: activeCompany.name,
      companyEmail: activeCompany.email,
      requestTypeLabel,
      deadlineDate: rawDeadlineDate
    });
  }, [activeCompany.name, activeCompany.email, requestTypeLabel, rawDeadlineDate]);

  const mailtoUrl = useMemo(() => {
    const encodedTo = encodeURIComponent(activeCompany.email);
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(letterContent);
    return `mailto:${encodedTo}?subject=${encodedSubject}&body=${encodedBody}`;
  }, [activeCompany.email, emailSubject, letterContent]);

  return (
    <div className="app-container">
      {toastMessage && <div className="toast">{toastMessage}</div>}

      {/* Header */}
      <header className="header">
        <div className="header-badge">🛑 PRIVACY SLOOPKOGEL</div>
        <h1>VERGEET MIJ!</h1>
        <p className="subtitle">
          Dwing bedrijven juridisch om jouw persoonsgegevens, advertentieprofielen en accounts permanent te wissen (Art. 17 AVG).
        </p>
        <div className="privacy-pill">
          <span>🔒 100% Lokaal in je browser. Nul tracking, nul servers, jouw privacy is heilig.</span>
        </div>
      </header>

      {/* Main Grid */}
      <div className="main-layout">
        {/* Left Column: Form Controls */}
        <section className="controls-column">
          {/* 1. Bedrijf kiezen */}
          <div className="card">
            <div className="card-header">
              <span className="step-number">1</span>
              <h2>Kies het doelwit / bedrijf</h2>
            </div>

            <div className="toggle-container">
              <button
                type="button"
                className={`toggle-btn ${!isCustomCompany ? 'active' : ''}`}
                onClick={() => setIsCustomCompany(false)}
              >
                Bekende Bedrijven ({COMPANIES.length})
              </button>
              <button
                type="button"
                className={`toggle-btn ${isCustomCompany ? 'active' : ''}`}
                onClick={() => setIsCustomCompany(true)}
              >
                ✏️ Ander Bedrijf Invoeren
              </button>
            </div>

            {!isCustomCompany ? (
              <div className="company-selection">
                {/* Search */}
                <input
                  type="text"
                  className="search-input"
                  placeholder="Zoek bedrijf (bijv. Bol, Basic-Fit, Ziggo, Meta)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Category Pills */}
                <div className="category-scroll">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Select list */}
                <div className="company-dropdown-wrap">
                  <label htmlFor="company-select" className="label-sub">
                    Gevonden bedrijven:
                  </label>
                  <select
                    id="company-select"
                    className="select-input"
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                  >
                    {filteredCompanies.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="custom-company-inputs">
                <div className="form-group">
                  <label className="label-sub">Bedrijfsnaam:</label>
                  <input
                    type="text"
                    className="text-input"
                    placeholder="bijv. Hunkemöller, Voetbalflitsen, etc."
                    value={customCompanyName}
                    onChange={(e) => setCustomCompanyName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label-sub">Privacy / DPO e-mailadres:</label>
                  <input
                    type="email"
                    className="text-input"
                    placeholder="bijv. privacy@bedrijf.nl of dpo@bedrijf.com"
                    value={customCompanyEmail}
                    onChange={(e) => setCustomCompanyEmail(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Company Info Box */}
            <div className="company-target-box">
              <div className="target-row">
                <span className="target-label">Ontvanger (DPO):</span>
                <span className="target-email" onClick={handleCopyEmail} title="Klik om te kopiëren">
                  {activeCompany.email} 📋
                </span>
              </div>
              {activeCompany.tip && (
                <div className="target-tip">
                  💡 <strong>Tip:</strong> {activeCompany.tip}
                </div>
              )}
              {activeCompany.portalUrl && (
                <a
                  href={activeCompany.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="portal-link"
                >
                  🔗 Bekijk officieel privacybeleid van {activeCompany.name} &rarr;
                </a>
              )}
            </div>
          </div>

          {/* 2. Type Verzoek */}
          <div className="card">
            <div className="card-header">
              <span className="step-number">2</span>
              <h2>Welke juridische sloopkogel wil je inzetten?</h2>
            </div>

            <div className="request-types-grid">
              {REQUEST_TYPES.map((rt) => (
                <div
                  key={rt.id}
                  className={`request-type-card ${requestType === rt.id ? 'selected' : ''}`}
                  onClick={() => setRequestType(rt.id)}
                  style={{
                    borderColor: requestType === rt.id ? rt.color : undefined
                  }}
                >
                  <div className="rt-top">
                    <span className="rt-badge" style={{ backgroundColor: rt.color }}>
                      {rt.article}
                    </span>
                    <input
                      type="radio"
                      name="requestType"
                      checked={requestType === rt.id}
                      onChange={() => setRequestType(rt.id)}
                    />
                  </div>
                  <h3>{rt.label}</h3>
                  <p>{rt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Jouw Gegevens */}
          <div className="card">
            <div className="card-header">
              <span className="step-number">3</span>
              <h2>Jouw gegevens (voor in de brief)</h2>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Volledige naam *</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="bijv. Jan Jansen"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>E-mailadres (gekoppeld aan account) *</label>
                <input
                  type="email"
                  className="text-input"
                  placeholder="bijv. jan@voorbeeld.nl"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Klantnummer / Pasnummer / 06-nr (optioneel)</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="bijv. Klantnr. 8492049 of 06-12345678"
                  value={userIdentifier}
                  onChange={(e) => setUserIdentifier(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Taal van de brief</label>
                <div className="lang-selector">
                  <button
                    type="button"
                    className={`lang-btn ${language === 'nl' ? 'active' : ''}`}
                    onClick={() => setLanguage('nl')}
                  >
                    🇳🇱 Nederlands
                  </button>
                  <button
                    type="button"
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              <div className="form-group full-width">
                <label>Optionele extra toelichting</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="bijv. Ik ben sinds 2022 geen klant meer; verwijder ook nieuwsbriefabonnement."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Live Letter & Actions */}
        <section className="preview-column">
          <div className="card sticky-preview">
            <div className="preview-header">
              <div>
                <h2>Live Brief Preview</h2>
                <div className="deadline-badge">
                  ⏳ Wettelijke reactietermijn: <strong>30 dagen</strong> (uiterlijk {deadlineDate})
                </div>
              </div>
              <div className="subject-pill">
                <strong>Onderwerp:</strong> {emailSubject}
              </div>
            </div>

            {/* Letter Body Display */}
            <div className="letter-paper">
              <pre className="letter-text">{letterContent}</pre>
            </div>

            {/* Action Buttons */}
            <div className="actions-bar">
              <a
                href={mailtoUrl}
                className="btn-action btn-mail"
                title="Opent je e-mailprogramma met alles ingevuld"
              >
                🚀 Open in Mailapp (1-klik)
              </a>

              <button
                type="button"
                className="btn-action btn-copy"
                onClick={handleCopyLetter}
              >
                📋 Kopieer Brief
              </button>

              <button
                type="button"
                className="btn-action btn-txt"
                onClick={handleDownloadTxt}
              >
                💾 Download .txt
              </button>
            </div>

            {/* Agenda Herinnering na 30 dagen */}
            <div className="calendar-card">
              <div className="calendar-card-header">
                <span className="cal-icon">🗓️</span>
                <div>
                  <h3>30-Dagen Agenda Herinnering</h3>
                  <p className="cal-subtitle">
                    Zet een afspraak op <strong>{deadlineDate}</strong>. Heeft <strong>{activeCompany.name}</strong> dan niet gereageerd? Dan open je direct het klachtenloket van de Autoriteit Persoonsgegevens.
                  </p>
                </div>
              </div>

              <div className="calendar-actions">
                <button
                  type="button"
                  className="btn-cal btn-cal-ics"
                  onClick={handleDownloadICS}
                  title="Geschikt voor Apple Agenda, Outlook, Thunderbird en smartphones"
                >
                  📅 Download .ics (Apple / Outlook / Telefoon)
                </button>

                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cal btn-cal-google"
                  title="Direct toevoegen aan Google Agenda"
                >
                  🌐 Google Agenda Link
                </a>
              </div>
            </div>

            {/* Legal Backing Info */}
            <div className="legal-guarantee-box">
              <h4>⚖️ Jouw rechten onder de AVG</h4>
              <ul>
                <li>
                  <strong>Wettelijk bindend:</strong> Bedrijven zijn onder EU-recht verplicht binnen 30 dagen te reageren.
                </li>
                <li>
                  <strong>Geen paspoortkopie vereist:</strong> Bedrijven mogen niet zomaar om een identiteitsbewijs vragen als je mailt vanaf je geregistreerde e-mailadres (Art. 12 lid 6 AVG).
                </li>
                <li>
                  <strong>Niet gereageerd?</strong> Je kunt direct een boeteverzoek indienen bij de{' '}
                  <a
                    href="https://www.autoriteitpersoonsgegevens.nl/melden/klachten/klacht-over-gebruik-persoonsgegevens"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Autoriteit Persoonsgegevens (AP)
                  </a>.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
