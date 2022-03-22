import { Licence, Status, Units } from "src/enum_types";
import { Trig } from "src/trig/entities/trig.entity";
import { User } from "src/user/entities/user.entity";

export class Apilog {
  id: number;
  trig_id: number;
  user_id: number;
  visit_date: string;
  visit_time: string;
  comment: string;
  wgs_lat?: number;
  wgs_lon?: number;
  wgs_height?: number;
  osgb_eastings?: number;
  osgb_northings?: number;
  osgb_height?: number;
  osgb_gridref?: string;
  fb_number?: string;
  condition: string;
  score?: number;
  source?: string;
  crt_timestamp?: string;
  crt_ip_addr?: string;

}
