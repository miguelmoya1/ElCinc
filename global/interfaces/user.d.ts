export interface IUser {
  id?: string;
  password?: string;
  email?: string;
  root?: boolean;
  name?: string;
  surname?: string;
  level?: number;
  isLogged?: Date | null;
  /** COORDINTES: [LNG, LAT] */
  location?: { type: string; coordinates: [number, number] };
  appVersion?: string;
  appBuild?: string;
  operatingSystem?: string;
  osVersion?: string;
  platform?: string;
  model?: string;
  manufacturer?: string;
  uuid?: string;
}
