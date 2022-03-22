import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({name: 'tlog'})
export class Log {
  @PrimaryColumn()
  id: number;

  @Column()
  trig_id: number;

  @Column()
  user_id: number;

  @Column()
  date?: string;

  @Column()
  time: string;

  @Column()
  osgb_eastings?: string;

  @Column()
  osgb_northings?: string;

  @Column()
  osgb_gridref?: string;

  @Column()
  fb_number?: string;

  @Column()
  condition: string;

  @Column()
  comment?: string;

  @Column()
  score?: number;

  @Column()
  ip_addr?: string;

  @Column()
  source?: string;

  @Column()
  upd_timestamp: string;

}
