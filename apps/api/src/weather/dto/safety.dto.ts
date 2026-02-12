import { ApiProperty } from '@nestjs/swagger';

export enum SafetyStatus {
  GO = 'GREEN',
  WARNING = 'YELLOW',
  NO_GO = 'RED',
}

export class WeatherDetailsDto {
  @ApiProperty({ example: 72 }) temp: number;
  @ApiProperty({ example: 5 }) windSpeed: number;
  @ApiProperty({ example: 0 }) precipitation: number;
  @ApiProperty({ example: 'clear sky' }) description: string;
}

export class WeatherSafetyResponse {
  @ApiProperty({ enum: SafetyStatus }) status: SafetyStatus;
  @ApiProperty({ example: 'Safe for installation.' }) message: string;
  @ApiProperty() details: WeatherDetailsDto;
}