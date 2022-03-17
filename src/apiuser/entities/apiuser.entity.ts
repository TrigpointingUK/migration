import { Licence, Status, Units } from "src/enum_types";

export class Apiuser {
  id: number;
  nickname: string;
  email: string;
  email_verified: boolean;
  oauth: string;
  firstname: string;
  lastname: string;
  about: string;
  homepage: string;
  avatar: string;
  units: Units;
  status_max: Status;
  licence_default: Licence;
  mobile_number: string;
  cryptpw: string;
}
