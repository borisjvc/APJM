import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeolocationService {
    async getInfo() {
        const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=0b8407d1fd1a41b38846d8ae0a9e31ae');
        return response.data
    }
}