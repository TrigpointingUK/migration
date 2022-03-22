import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Log } from '../log/entities/log.entity';
import { LogService } from 'src/log/log.service';
import { CreateApilogDto } from './dto/create-apilog.dto';
import { Licence, LogSource, Status, TrigCondition, Units } from 'src/enum_types';

@Injectable()
export class ApilogService {
  constructor(
    private configService: ConfigService,
    private readonly logService: LogService,
  ) {}

  async sync(log: Log) {
    const token = await this._getApiToken();
    let data = new CreateApilogDto();

    // console.log(log);

    // Convert
    data.id = log.id;
    data.trig_id = log.trig_id
    data.user_id = log.user_id
    data.comment = log.comment || null
    data.visit_date = log.date
    data.visit_time = log.time
    data.osgb_eastings = parseFloat(log.osgb_eastings)
    data.osgb_northings = parseFloat(log.osgb_northings)
    data.osgb_height = null
    data.osgb_gridref = null
    data.wgs_lat = null
    data.wgs_lon = null
    data.fb_number = log.fb_number || null
    switch (log.condition) {
      case "G":
        data.condition = TrigCondition.GOOD
        break;
      case "S":
        data.condition = TrigCondition.SLIGHTLY_DAMAGED
        break;
      case "D":
        data.condition = TrigCondition.DAMAGED
        break;
      case "T":
        data.condition = TrigCondition.TOPPLED
        break;
      case "M":
        data.condition = TrigCondition.MOVED
        break;
      case "C":
        data.condition = TrigCondition.CONVERTED
        break;
      case "R":
        data.condition = TrigCondition.REMAINS
        break;
      case "Q":
        data.condition = TrigCondition.POSSIBLY_MISSING
        break;
      case "X":
        data.condition = TrigCondition.DESTROYED
        break;
      case "V":
        data.condition = TrigCondition.VISIBLE
        break;
      case "P":
        data.condition = TrigCondition.INACCESSIBLE
        break;
      case "N":
        data.condition = TrigCondition.NOT_FOUND
        break;
      case "U":
        data.condition = TrigCondition.UNKNOWN
        break;
      case "Z":
        data.condition = TrigCondition.NOT_LOGGED
        break;      
      case "-":
        data.condition = TrigCondition.OTHER
        break;         
      default:
        data.condition = TrigCondition.UNKNOWN
        break;
    };
    data.source = log.source || LogSource.UNKNOWN
    data.score = log.score
    data.crt_ip_addr = log.ip_addr || null
    data.crt_timestamp = log.upd_timestamp || null
   

    console.log(JSON.stringify(data));
    // console.log(data);
    try {
      const response = await axios.post(
        `${this.configService.get('API_URL')}/logs`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (exception) {
      console.log('Error from api');
      console.log(exception?.response?.data);
      console.log(JSON.stringify(data));
    }
  }

  async findOne(id: number) {
    const token = await this._getApiToken();
    const response = await axios.get(
      `${this.configService.get('API_URL')}/logs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async syncOne(id: number) {
    console.log(id)
    const log = await this.logService.findOne(+id);
    console.log(log)
    await this.sync(log);
    return this.findOne(+id);
  }

  async syncAll(start: number, count: number) {
    for (let id = start; id < start + count; id++) {
      try {
        // console.log(`Syncing ${id}`);
        const log = await this.logService.findOne(+id);
        if (log) {
          await this.sync(log);
        }
        // console.log(log.id, log.name);
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  static auth0Token: string = "DUMMY";
  async _getApiToken() {
    if (!ApilogService.auth0Token) {
      const postData = {
        client_id: this.configService.get('CLIENT_ID'),
        client_secret: this.configService.get('CLIENT_SECRET'),
        audience: this.configService.get('AUDIENCE'),
        grant_type: 'client_credentials',
      };
      //console.log(postData);
      const response = await axios.post(
        this.configService.get('AUTH0_URL'),
        postData,
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      // console.log(response.data);
      ApilogService.auth0Token = response.data.access_token;
    }
    return ApilogService.auth0Token;
  }
}
