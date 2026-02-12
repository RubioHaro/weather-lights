import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SafetyStatus, WeatherSafetyResponse } from './dto/safety.dto';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

//   https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


  constructor(private configService: ConfigService) {
    const key = this.configService.get<string>('OPENWEATHER_API_KEY');
    if (!key) {
      throw new Error(
        'Config Error: OPENWEATHER_API_KEY no está definida en el entorno',
      );
    }
    this.apiKey = key;
  }

  async getSafetyStatus(lat: string, lon:string ): Promise<WeatherSafetyResponse> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`,
      );
      const data = response.data;

      return this.evaluateSafety(data);
    } catch (error) {
        console.log(error)
      throw new HttpException(
        'Error connecting to weather provider',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  private evaluateSafety(data: any): WeatherSafetyResponse {
    const wind = data.wind.speed;
    const temp = data.main.temp;
    const isStorm = data.weather[0].main.includes('Storm');

    if (wind > 20 || isStorm) {
      return {
        status: SafetyStatus.NO_GO,
        message: 'Warning: Unsafe conditions for installation.',
        details: {
          temp,
          windSpeed: wind,
          description: data.weather[0].description,
          precipitation: data.rain ? data.rain['1h'] || 0 : 0,
        },
      };
    }

    if (wind > 12 || temp < 32 || temp > 100) {
      return {
        status: SafetyStatus.WARNING,
        message: 'Warning: Marginal conditions for installation.',
        details: {
          temp,
          windSpeed: wind,
          description: data.weather[0].description,
          precipitation: data.rain ? data.rain['1h'] || 0 : 0,
        },
      };
    }

    return {
      status: SafetyStatus.GO,
      message: 'Safe for installation.',
      details: {
        temp,
        windSpeed: wind,
        description: data.weather[0].description,
        precipitation: data.rain ? data.rain['1h'] || 0 : 0,
      },
    };
  }
}
