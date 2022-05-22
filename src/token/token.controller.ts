import { TokenService } from './token.service';
import { RefreshTokenDto } from './dto/refresh.token.dto';
import { Body, Controller, Put } from '@nestjs/common';

@Controller('token')
export class TokenController {
    constructor(
        private tokenService: TokenService
    ) {}

    @Put('refresh')
    async refreshToken(@Body() data: RefreshTokenDto) {
        //console.log(data);
        return this.tokenService.refreshToken(data.oldToken);
    }
}