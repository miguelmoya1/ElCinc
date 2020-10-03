export interface IClient {
  id?: string;
  email?: string;
  name?: string;
  surname?: string;
  password?: string;
  isLogged?: Date | null;

  /**
   * COORDINTES: [LNG, LAT]
   **/
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
