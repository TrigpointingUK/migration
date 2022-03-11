import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Trig } from '../trig/entities/trig.entity';
import { TrigService } from 'src/trig/trig.service';
import { CreateApitrigDto } from './dto/create-apitrig.dto';
import { CallTracker } from 'assert';

@Injectable()
export class ApitrigService {
  constructor(
    private configService: ConfigService,
    private readonly trigService: TrigService,
  ) {}

  async sync(trig: Trig) {
    const token = await this._getApiToken();
    let data = new CreateApitrigDto();

    // console.log(trig);

    // Convert
    data.id = trig.id;
    data.name = trig.name;
    data.wgs_lat = parseFloat(trig.wgs_lat);
    data.wgs_lon = parseFloat(trig.wgs_long);
    data.wgs_height = parseFloat(trig.wgs_height);
    data.osgb_eastings = parseFloat(trig.osgb_eastings);
    data.osgb_northings = parseFloat(trig.osgb_northings);
    data.osgb_height = parseFloat(trig.osgb_height);
    data.osgb_gridref = trig.osgb_gridref;
    data.physical_type = trig.physical_type;
    data.current_use = trig.current_use == 'None' ? 'none' : trig.current_use;
    data.historic_use = trig.historic_use;
    data.condition = trig.condition;
    data.status = trig.status_id.toString();
    data.fb_number = trig.fb_number ? trig.fb_number : null;
    data.stn_number = trig.stn_number ? trig.stn_number : null;
    data.stn_number_active = trig.stn_number_active
      ? trig.stn_number_active
      : null;
    data.stn_number_osgb36 = trig.stn_number_osgb36
      ? trig.stn_number_osgb36
      : null;
    data.stn_number_passive = trig.stn_number_passive
      ? trig.stn_number_passive
      : null;
    data.os_net_web_id = trig.os_net_web_id ? trig.os_net_web_id : null;
    data.permission_ind = trig.permission_ind;
    data.postcode6 = trig.postcode6 ? trig.postcode6 : null;
    data.county = trig.county ? trig.county : null;
    data.town = trig.town ? trig.town : null;

    // Sanitise
    data.fb_number = data.fb_number === 'NA' ? null : data.fb_number;

    //console.log(JSON.stringify(data));
    // console.log(data);
    try {
      const response = await axios.post(
        `${this.configService.get('API_URL')}/trigs`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (exception) {
      console.log('Error from api');
      console.log(exception.response.data);
      console.log(JSON.stringify(data));
    }
  }

  async findOne(id: number) {
    const token = await this._getApiToken();
    const response = await axios.get(
      `${this.configService.get('API_URL')}/trigs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  async syncOne(id: number) {
    const trig = await this.trigService.findOne(+id);
    await this.sync(trig);
    return this.findOne(+id);
  }

  async syncAll(start: number, count: number) {
    for (let id = start; id < start + count; id++) {
      try {
        // console.log(`Syncing ${id}`);
        const trig = await this.trigService.findOne(+id);
        if (trig) {
          await this.sync(trig);
        }
        // console.log(trig.id, trig.name);
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  static auth0Token: string;
  async _getApiToken() {
    if (!ApitrigService.auth0Token) {
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
      ApitrigService.auth0Token = response.data.access_token;
    }
    return ApitrigService.auth0Token;
  }
}
