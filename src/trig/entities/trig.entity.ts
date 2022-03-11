import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Trig {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  wgs_lat: string;

  @Column()
  wgs_long: string;

  @Column()
  wgs_height: string;

  @Column()
  osgb_eastings?: string;

  @Column()
  osgb_northings?: string;

  @Column()
  osgb_gridref?: string;

  @Column()
  osgb_height?: string;

  @Column()
  historic_use: string;

  @Column()
  current_use: string;

  @Column()
  physical_type: string;

  @Column()
  status_id: string;

  @Column()
  condition: string;

  @Column()
  postcode6: string;

  @Column()
  county: string;

  @Column()
  town: string;

  @Column()
  needs_attention: boolean;

  @Column()
  attention_comment: string;

  @Column()
  fb_number?: string;

  @Column()
  stn_number?: string;

  @Column()
  stn_number_active?: string;

  @Column()
  stn_number_passive?: string;

  @Column()
  stn_number_osgb36?: string;

  @Column()
  os_net_web_id?: number;

  @Column()
  permission_ind?: boolean;
}
