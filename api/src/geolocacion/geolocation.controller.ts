import { Controller, Get } from "@nestjs/common";
import { GeolocationService } from "./geolocation.service";

@Controller('geolocation')
export class GeolocationController {
    constructor(private readonly geolocation: GeolocationService) { }

    @Get()
    async getLocation() {
        const location = await this.geolocation.getInfo();
        return location;
    }
}