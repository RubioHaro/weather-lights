import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { WeatherSafetyResponse } from './dto/safety.dto';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('safety')
  @ApiOperation({ summary: 'Get safety status for a location' })
  @ApiResponse({ status: 200, type: WeatherSafetyResponse })
  async getSafety(@Query('lat') lat: string, @Query('lon') lon: string,): Promise<WeatherSafetyResponse> {
    return this.weatherService.getSafetyStatus(lat, lon);
  }
}
