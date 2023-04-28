import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import {UsersService} from "../modules/users/users.service";
const {BASE_API, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_API}/auth/google/redirect`,
      scope: ['profile', 'email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    return this.usersService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.photos[0].value,
      social_id: profile.id,
    });
  }
}