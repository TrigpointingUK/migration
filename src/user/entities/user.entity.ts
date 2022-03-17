import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstname?: string;

  @Column()
  surname?: string;

  @Column()
  email?: string;

  @Column()
  homepage?: string;

  @Column()
  distance_ind: string;

  @Column()
  about?: string;

  @Column()
  status_max?: string;

  @Column()
  home1_name?: string;

  @Column()
  home1_eastings?: string;

  @Column()
  home1_northings?: string;

  @Column()
  home1_gridref?: string;

  @Column()
  home2_name?: string;

  @Column()
  home2_eastings?: string;

  @Column()
  home2_northings?: string;

  @Column()
  home2_gridref?: string;

  @Column()
  home3_name?: string;

  @Column()
  home3_eastings?: string;

  @Column()
  home3_northings?: string;

  @Column()
  home3_gridref?: string;

  @Column()
  public_ind?: string;

  @Column()
  online_map_type?: string;

  @Column()
  online_map_type2?: string;

  @Column()
  sms_number?: string

  @Column()
  cryptpw: string;

  @Column()
  admin_ind: string;

  @Column()
  crt_date: string;

  @Column()
  crt_time: string;

  @Column()
  upd_timestamp: string;

}
