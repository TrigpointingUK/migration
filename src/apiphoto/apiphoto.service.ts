import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Photo } from '../photo/entities/photo.entity';
import { PhotoService } from 'src/photo/photo.service';
import { Licence, PhotoType, Status, Units } from 'src/enum_types';
import { CreateApiphotoDto } from './dto/create-apiphoto.dto';

@Injectable()
export class ApiphotoService {
  constructor(
    private configService: ConfigService,
    private readonly photoService: PhotoService,
  ) {}

  async sync(photo: Photo) {
    const token = await this._getApiToken();
    let data = new CreateApiphotoDto();

    // console.log(photo);

    // Convert
    data.id = photo.id;
    data.trig_id = photo.trig_id
    data.user_id = photo.user_id
    data.log_id = photo.tlog_id
    data.server_id = photo.server_id
    data.filename = photo.filename
    data.filesize = photo.filesize
    data.height = photo.height
    data.width = photo.width
    data.icon_filename = photo.icon_filename
    data.icon_filesize = photo.icon_filesize
    data.icon_height = photo.icon_height
    data.icon_width = photo.icon_width
    data.caption = photo.name || null
    data.description = photo.text_desc || null
    data.licence = (photo.public_ind == 'Y') ? Licence.PUBLIC_DOMAIN : Licence.PRIVATE
    data.source = photo.source
    data.type = photo.type || PhotoType.UNKNOWN
    data.deletedAt = (photo.deleted_ind == 'Y') ? new Date().toString() : null
    data.crt_timestamp = photo.crt_timestamp


    // console.log(JSON.stringify(data));
    // console.log(data);
    try {
      const response = await axios.post(
        `${this.configService.get('API_URL')}/photos`,
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
      `${this.configService.get('API_URL')}/photos/${id}`,
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
    const photo = await this.photoService.findOne(+id);
    await this.sync(photo);
    return this.findOne(+id);
  }

  async syncAll(start: number, count: number) {
    for (let id = start; id < start + count; id++) {
      try {
        // console.log(`Syncing ${id}`);
        const photo = await this.photoService.findOne(+id);
        if (photo) {
          await this.sync(photo);
        }
        // console.log(photo.id, photo.name);
      } catch (exception) {
        console.log(exception);
      }
    }
  }

  static auth0Token: string = 'DUMMY';
  async _getApiToken() {
    if (!ApiphotoService.auth0Token) {
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
      ApiphotoService.auth0Token = response.data.access_token;
    }
    return ApiphotoService.auth0Token;
  }
}
