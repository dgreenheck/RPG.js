class JournalEntry {
  text: string;
  created: number;

  constructor(text: string) {
    this.text = text;
    this.created = Date.now();
  }
}

class Journal {
  entries: JournalEntry[] = [];

  addEntry(text: string) {
    const entry = new JournalEntry(text);
    this.entries.push(entry);
  }

  getEntries() {
    return this.entries.join('\n');
  }
}

export const journal = new Journal();