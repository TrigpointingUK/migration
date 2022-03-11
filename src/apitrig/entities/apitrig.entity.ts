export class Apitrig {
  id: number;
  name: string;
  wgs_lat: number;
  wgs_lon: number;
  wgs_height: number;
  osgb_eastings: number;
  osgb_northings: number;
  osgb_gridref: string;
  osgb_height: number;
  historic_use: string;
  current_use: string;
  physical_type: string;
  status: string;
  condition: string;
  postcode6: string;
  county: string;
  town: string;
  needs_attention: boolean;
  attention_comment: string;
  fb_number?: string;
  stn_number?: string;
  stn_number_active?: string;
  stn_number_passive?: string;
  stn_number_osgb36?: string;
  os_net_web_id?: number;
  permission_ind?: boolean;
}
