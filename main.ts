type Event = {
  date: Date;
  sermon: string;
  scripture: string;
  songLeader: string;
  hymn1: string;
  hymn2: string;
  closingHymn: string;
  anthem: string;
  bellChoir: string;
  notes: string;
};

const createCalendarEvent = (
  calendar: GoogleAppsScript.Calendar.Calendar,
  event: Event
) => {
  const title = `${event.anthem}` || "No Anthem";
  let description = "";
  if (event.sermon.length > 0) {
    description += `<strong>Sermon:</strong> ${event.sermon}<br>`;
  }
  if (event.scripture.length > 0) {
    description += `<strong>Scripture:</strong> ${event.scripture}<br>`;
  }
  if (event.songLeader.length > 0) {
    description += `<strong>Song Leader:</strong> ${event.songLeader}<br>`;
  }
  if (event.hymn1.length > 0) {
    description += `<strong>Hymn 1:</strong> ${event.hymn1}<br>`;
  }
  if (event.hymn2.length > 0) {
    description += `<strong>Hymn 2:</strong> ${event.hymn2}<br>`;
  }
  if (event.closingHymn.length > 0) {
    description += `<strong>Closing Hymn:</strong> ${event.closingHymn}<br>`;
  }
  if (event.bellChoir.length > 0) {
    description += `<strong>Bell Choir:</strong> ${event.bellChoir}<br>`;
  }
  if (event.notes.length > 0) {
    description += `<strong>Notes:</strong> ${event.notes}`;
  }

  // check if event already exists
  const events = calendar.getEventsForDay(event.date);
  if (events.length > 0) {
    if (events[0].getTitle() !== title) {
      events[0].setTitle(title);
    }
    if (events[0].getDescription() !== description) {
      events[0].setDescription(description);
    }
  } else {
    calendar.createAllDayEvent(title, event.date, { description: description });
  }
};

const parseSpreadsheet = (spreadsheetId: string, sheetName: string) => {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet ${sheetName} not found`);
  const lastRow: number = sheet.getLastRow();
  const data: string[][] = sheet.getRange(2, 1, lastRow - 1, 10).getValues();

  const events: Event[] = [];
  data.forEach((row: any[]) => {
    const [
      dateValue,
      title,
      scripture,
      songLeader,
      hymn1,
      hymn2,
      closingHymn,
      anthem,
      bellChoir,
      notes,
    ] = row;
    const year: number = new Date().getFullYear();
    const dateObj = new Date(dateValue);

    if (!isNaN(dateObj.getTime())) {
      const eventDate: Date = new Date(
        year,
        dateObj.getMonth(),
        dateObj.getDate()
      );
      events.push({
        date: eventDate,
        sermon: title,
        scripture: scripture,
        songLeader: songLeader,
        hymn1: hymn1,
        hymn2: hymn2,
        closingHymn: closingHymn,
        anthem: anthem,
        bellChoir: bellChoir,
        notes: notes,
      });
    }
  });
  return events;
};

const main = () => {
  const properties = PropertiesService.getScriptProperties();
  const calendarId = properties.getProperty("CALENDAR_ID");
  const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
  const sheetName = properties.getProperty("SHEET_NAME");

  if (calendarId === null || spreadsheetId === null || sheetName === null) {
    throw new Error("Missing required properties");
  }
  const events = parseSpreadsheet(spreadsheetId, sheetName);
  const calendar = CalendarApp.getCalendarById(calendarId);
  events.forEach((event) => {
    createCalendarEvent(calendar, event);
  });
};
