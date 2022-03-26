import { Log } from 'src/log/entities/log.entity';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({name: "tphoto"})
export class Photo {
  @PrimaryColumn()
  id: number;

  trig_id: number;

  user_id: number;

  @Column()
  tlog_id: number;

  @Column()
  server_id: number;

  @Column()
  type: string;

  @Column()
  filename: string;

  @Column()
  filesize: number;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  icon_filename: string;

  @Column()
  icon_filesize: number;

  @Column()
  icon_height: number;

  @Column()
  icon_width: number;

  @Column()
  name: string;

  @Column()
  text_desc: string;

  @Column()
  ip_addr: string;

  @Column()
  public_ind: string;

  @Column()
  deleted_ind: string;

  @Column()
  source: string;

  @Column()
  crt_timestamp: string;
}
