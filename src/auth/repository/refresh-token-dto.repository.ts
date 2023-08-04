import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RefreshTokenSchema } from '../schema';
import { RefreshTokenDto } from '../dto';

@Injectable()
export class RefreshTokenDtoRepository {
  constructor(
    @InjectModel(RefreshTokenSchema.name)
    private readonly refreshTokenModel: Model<RefreshTokenSchema>,
  ) {}

  async findRefreshToken(refreshToken: string): Promise<RefreshTokenDto> {
    return await this.refreshTokenModel.findOne(
      {
        token: refreshToken,
      } as FilterQuery<RefreshTokenSchema>,
      {},
      { lean: true },
    );
  }

  async deleteRefreshTokenByUserId(userId: string): Promise<RefreshTokenDto> {
    return await this.refreshTokenModel.findOneAndDelete(
      { user: new ObjectId(userId) } as FilterQuery<RefreshTokenSchema>,
      { lean: true },
    );
  }
}
