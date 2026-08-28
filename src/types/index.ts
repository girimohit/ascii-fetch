export interface ProfileField {
  id: string;
  key: string;
  value: string;
  isSectionHeader?: boolean;
}

export interface ProfileData {
  username: string;
  photoUrl: string | null;
  asciiArt: string;
  cardBgColor: string;
  fields: ProfileField[];
}
