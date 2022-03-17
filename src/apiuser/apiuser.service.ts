import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateApiuserDto } from './dto/create-apiuser.dto';
import { Licence, Status, Units } from 'src/enum_types';

@Injectable()
export class ApiuserService {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async sync(user: User) {
    const token = await this._getApiToken();
    let data = new CreateApiuserDto();

    // console.log(user);

    // Convert
    data.id = user.id;
    data.nickname = user.name || null
    data.email = user.email || null
    data.email_verified = false
    data.oauth = null
    data.firstname = user.firstname || null
    data.lastname = user.surname || null
    data.about = user.about || null
    data.homepage = user.homepage || null
    data.avatar = null
    data.units = user.distance_ind == 'K' ? Units.METRIC : Units.IMPERIAL
    switch (user.status_max) {
      case "10":
        data.status_max = Status.PILLAR
        break;
      case "20":
        data.status_max = Status.MAJOR_MARK
        break;
      case "30":
        data.status_max = Status.MINOR_MARK
        break;
      case "40":
        data.status_max = Status.INTERSECTED
        break;
      case "50":
        data.status_max = Status.USER_ADDED
        break;
      case "60":
        data.status_max = Status.CONTROVERSIAL
        break;
      case "99":
        data.status_max = Status.DELETED
        break;
      default:
        data.status_max = Status.UNKNOWN
        break;
    };
    data.licence_default = user.public_ind == "Y" ? Licence.PUBLIC_DOMAIN : Licence.PRIVATE
    // data.mobile_number = user.sms_number
    data.cryptpw = user.cryptpw || null
   

    // console.log(JSON.stringify(data));
    // console.log(data);
    try {
      const response = await axios.post(
        `${this.configService.get('API_URL')}/users`,
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
      `${this.configService.get('API_URL')}/users/${id}`,
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
    const user = await this.userService.findOne(+id);
    await this.sync(user);
    return this.findOne(+id);
  }

  async syncAll(start: number, count: number) {
    for (let id = start; id < start + count; id++) {
      try {
        // console.log(`Syncing ${id}`);
        const user = await this.userService.findOne(+id);
        if (user) {
          await this.sync(user);
        }
        // console.log(user.id, user.name);
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  static auth0Token: string;
  async _getApiToken() {
    if (!ApiuserService.auth0Token) {
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
      ApiuserService.auth0Token = response.data.access_token;
    }
    return ApiuserService.auth0Token;
  }
}
