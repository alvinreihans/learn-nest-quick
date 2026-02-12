import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { createOrUpdateProfileDto } from './dto/createOrUpdateProfile.dto';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async updateOrCreateProfile(
    @Request() request: ExpressRequest & { user: { id: string } },
    @Body() createOrUpdateProfileDto: createOrUpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.profileService.updateOrCreateProfile(
      request.user.id,
      createOrUpdateProfileDto,
    );
  }
}
