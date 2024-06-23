import { Controller, Post, Get, HttpException, HttpStatus, HttpCode, UseGuards, Body, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Permissions } from 'src/custom-decorators/permissionCheck.decorator';
import { JwtAuthGuard } from 'src/guards/auth.guards';
import { PermissionCheckGuard } from '../../guards/permissionCheck.guards';
import { ExtractDataFromHeader } from '../../custom-decorators/extractHeader.decorator';
import { PermissionsAndAuthCheck } from 'src/custom-decorators/permissionsAndAuthCheck.decorator';
import { BodyValidationInterceptor } from '../../interceptors/bodyValidation.interceptor';
import { ResponseObjectFormatInterceptor } from '../../interceptors/responseObjectFormat.interceptor';
import { RequestValidationAndResponseFormatInterceptor } from 'src/interceptors/requestValidationAndResponseFormat.interceptor';
import { RequestValidationWithPipes } from 'src/pipes/requestValidation.pipes';
import { requestParseBodyPipe } from 'src/pipes/requestParse.pipes';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/health')
    healthCheck() {
        try {
            return 'Healthy'
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @Permissions('user:read')
    @UseGuards(JwtAuthGuard, PermissionCheckGuard)
    @HttpCode(200)
    getAllUsers(@ExtractDataFromHeader('userDetails') userDetails: any) {
        try {
            return this.userService.getAllUsers();
        } catch (err) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PermissionsAndAuthCheck('user:read') /// This decorator is the sum of all the individual decorator ///
    @Get('/:userId')
    // @Permissions('admin')
    // @UseGuards(JwtAuthGuard, PermissionCheckGuard)
    @HttpCode(200)
    getUserById(@ExtractDataFromHeader('userDetails') userDetails: any) {
        try {
            return this.userService.getUserById();
        } catch (err) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:userId/interceptor')
    @UseInterceptors(BodyValidationInterceptor) /// REQUEST BODY VALIDATION USING INTERCEPTORS
    @UseInterceptors(ResponseObjectFormatInterceptor) /// RESPONSE BODY THAT WILL SEND TO THE BROWSER
    getUserByUserIdInterceptor(@Body() requestBody: any, @ExtractDataFromHeader('userDetails') userDetails: any) {
        try {
            return this.userService.getUserByUserIdInterceptor()
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:userId/interceptor/request-response-interceptor')
    /// BOTH REQUEST VALIDATION AND RESPONSE FORMAT IN SAME INTERCEPTOR
    @UseInterceptors(RequestValidationAndResponseFormatInterceptor) /// REQUEST VALIDATION AND RESPONSE BODY THAT WILL SEND TO THE BROWSER IN SAME INTERCEPTOR
    getUserByUserIdInterceptorRequestAndResponse(@Body() requestBody: any, @ExtractDataFromHeader('userDetails') userDetails: any) {
        try {
            return this.userService.getUserByUserIdInterceptor()
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:userId/pipes/request-validation-pipe')
    //// REQUEST VALIDATION WITH PIPE ////
    @UsePipes(new RequestValidationWithPipes())
    getUserByUserIdRequestvalidationWithPipe() {
        try {
            return this.userService.getUserByUserIdInterceptor()
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/:userId/pipes/request-parse-pipe')
    //// REQUEST PARSING WITH PIPE ////
    @UsePipes(new RequestValidationWithPipes())
    getUserByUserIdRequestParseWithPipe(@Body(new requestParseBodyPipe()) body: any) {
        try {
            return this.userService.getUserByUserIdInterceptor()
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}