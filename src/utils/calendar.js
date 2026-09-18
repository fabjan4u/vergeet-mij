export function getDeadlineDate(days = 30) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export function formatDateForICS(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

export function generateICS({ companyName, companyEmail, requestTypeLabel, deadlineDate }) {
  const startStr = formatDateForICS(deadlineDate);
  const nextDay = new Date(deadlineDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const endStr = formatDateForICS(nextDay);
  const nowStr = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const uid = `avg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}@vergeet-mij`;

  const summary = `🚨 AVG Deadline: ${companyName} (Klacht indienen bij AP)`;
  const apUrl = 'https://www.autoriteitpersoonsgegevens.nl/melden/klachten/klacht-over-gebruik-persoonsgegevens';
  const description = `Vandaag verloopt de wettelijke reactietermijn van 30 dagen voor jouw AVG-verzoek (${requestTypeLabel}) aan ${companyName} (${companyEmail}).\\n\\nHeeft ${companyName} nog niet gereageerd of geweigerd?\\nDien direct een formele klacht in bij de Autoriteit Persoonsgegevens (AP):\\n${apUrl}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VergeetMij//AVG Sloopkogel//NL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${nowStr}`,
    `DTSTART;VALUE=DATE:${startStr}`,
    `DTEND;VALUE=DATE:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `URL:${apUrl}`,
    'STATUS:CONFIRMED',
    'TRANSP:TRANSPARENT',
    'BEGIN:VALARM',
    'TRIGGER:-PT9H',
    'ACTION:DISPLAY',
    `DESCRIPTION:AVG reactietermijn voor ${companyName} is vandaag verlopen!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function generateGoogleCalendarUrl({ companyName, companyEmail, requestTypeLabel, deadlineDate }) {
  const startStr = formatDateForICS(deadlineDate);
  const nextDay = new Date(deadlineDate);
  nextDay.setDate(nextDay.getDate() + 1);
  const endStr = formatDateForICS(nextDay);

  const title = `🚨 AVG Deadline: ${companyName} (Klacht indienen bij AP)`;
  const apUrl = 'https://www.autoriteitpersoonsgegevens.nl/melden/klachten/klacht-over-gebruik-persoonsgegevens';
  const details = `Vandaag verloopt de wettelijke reactietermijn van 30 dagen voor jouw AVG-verzoek (${requestTypeLabel}) aan ${companyName} (${companyEmail}).\n\nHeeft ${companyName} nog niet gereageerd of geweigerd?\nDien direct een formele klacht in bij de Autoriteit Persoonsgegevens (AP):\n${apUrl}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${startStr}/${endStr}`,
    details: details,
    location: companyName
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
