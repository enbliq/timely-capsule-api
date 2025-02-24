import { IsString, IsUUID, IsDate } from 'class-validator';

export class GuestCapsuleAccessLogDto {
  @IsString()
  guestIdentifier: string;

  @IsDate()
  accessTime: Date;

  @IsString()
  action: string;

  @IsUUID()
  capsuleId: string;
}
