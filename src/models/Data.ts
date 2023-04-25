export interface IData {
  "Identification number": string;
  "Name": string;
  "Gender": string;
  "Risk": string;
  "Hair length": string;
  "IQ": string;
  "Admission date": string;
  "Last breakdown": string;
  "Yearly fee": string;
  "Knows the Joker?": string;
  "has_relatives": IRelative[];
}

export interface IRelative {
  "Relative ID": string;
  "Patient ID": string;
  "Is alive?": string;
  "Frequency of visits": string;
  "has_phone": IPhone[];
}

export interface IPhone {
  "Phone ID": string;
  "ID of the relative": string;
  "Phone": string;
}
