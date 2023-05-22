export interface PersonData {
  ID: string;
  Name: string;
  Gender: string;
  Ability: string;
  "Minimal distance": string;
  Weight: string;
  Born: string;
  "In space since": string;
  "Beer consumption (l/y)": string;
  "Knows the answer?": string;
}

export interface PersonRecord {
  data: PersonData;
  children: Record<string, { records: NemesisRecord[] }>;
}

export interface NemesisData {
  ID: string;
  "Character ID": string;
  "Is alive?": string;
  Years: string;
}

export interface NemesisRecord {
  data: NemesisData;
  children: Record<string, { records: SecreteRecord[] }>;
}

export interface SecreteData {
  ID: string;
  "Nemesis ID": string;
  "Secrete Code": string;
}

export interface SecreteRecord {
  data: SecreteData;
  children: Record<string, { records: any[] }>;
}
