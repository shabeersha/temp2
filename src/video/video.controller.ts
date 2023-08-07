import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateVideoDto, EditVideoDto } from './dto';
import { Video } from './domain';
import { VideoService } from './video.service';
import { AdminAccessGuard } from '../auth/guard';

@UseGuards(AdminAccessGuard)
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  createVideo(@Body() dto: CreateVideoDto): Promise<Video> {
    return this.videoService.createVideo(dto);
  }

  @Patch(':id')
  editVideo(
    @Param('id') videoId: string,
    @Body() dto: EditVideoDto,
  ): Promise<Video> {
    return this.videoService.editVideo(videoId, dto);
  }
}
