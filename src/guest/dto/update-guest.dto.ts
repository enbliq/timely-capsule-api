import { PartialType } from '@nestjs/mapped-types';
import { GuestCapsuleAccessLogDto } from './create-guest.dto';

export class UpdateGuestDto extends PartialType(GuestCapsuleAccessLogDto) {}
