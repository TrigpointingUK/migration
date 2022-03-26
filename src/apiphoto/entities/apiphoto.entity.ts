import { Licence, Status, Units } from "src/enum_types";

export class Apiphoto {
  id: number;
  trig_id: number;
  user_id: number;
  log_id: number;
  server_id: number;
  filename: string;
  filesize: number;
  height: number;
  width: number;
  icon_filename: string;
  icon_filesize: number;
  icon_height: number;
  icon_width: number;
  caption: string;
  description: string;
  licence: string;
  source: string;
  type: string;
  deletedAt?: string;
  crt_timestamp?: string;
  crt_ip_addr?: string;
}
