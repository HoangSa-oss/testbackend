import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserV2 } from '../../models/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private jwtService : JwtService
  
  ) {}

  async sendUserConfirmation(user: any) {
    const token = await this.jwtService.signAsync(
    {
        sub: user,
    },
    {
        expiresIn: process.env.EXPIRE_IN_SEND_MAIL,
    }) 
    const url = `${process.env.URL_SEND_MAIL}/auth/verify-user?token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Bytepays! Confirm your Email',
      html:`<p>Hey {{ ${user.name} }},</p>
     <p>Please click below to confirm your email</p>
     <p>Click this <a href="{{${url}}">Link:${url}</a></p>
     <p>If you did not request this email you can safely ignore it.</p>`
    });
  }
  async sendEmailForgotPassword(email:string,id:string){
    const token = await this.jwtService.signAsync(
      {
          sub: {email,id},
      },
      {
          expiresIn: process.env.EXPIRE_IN_SEND_MAIL,
      }) 
      const url = `${process.env.URL_SEND_MAIL}/auth/forgot-password?token=${token}`;
      await this.mailerService.sendMail({
        to: email,
        // from: '"Support Team" <support@example.com>', // override default from
        subject: 'Welcome to Bytepays! Password',
        html:`
        <p>Please click below to create new password</p>
        <p>Click this <a href="{{${url}}">Link:${url}</a></p>
        <p>If you did not request this email you can safely ignore it.</p>`
      });


  }
}