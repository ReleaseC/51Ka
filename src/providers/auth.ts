import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { TBasicService } from '../providers/basic-service';
import { const_data } from '../common/application-const';
import { Md5 } from "ts-md5/dist/md5";

@Injectable()
export class TAuth extends TBasicService
{
  constructor(public http: Http)
  {
    super(http);
  }

  get state(): string
  {
    return localStorage.getItem('state');
  }

  set state(value: string)
  {
    localStorage.setItem('state', value);
  }

  get openid(): string
  {
    return localStorage.getItem("openid");
  }

  set openid(value: string)
  {
    localStorage.setItem("openid", value);
  }

  GetRequestParam(url)
  {
    console.log(url);
    localStorage.removeItem('openid');
    if (url)
    {
      let idx = url.indexOf("?");
      if (idx != -1)
      {
        let uri = url.slice(idx + 1);
        uri = uri.split("&");
        for (let param of uri)
        {
          let p = param.split('=');
          if (p.length > 1)
          {
            let param_name = p[0];
            let param_value = p[1];
            console.log(param_name +'=' + param_value);
            localStorage.setItem(param_name, param_value);
          }
        }
      }
    }
  }

  // 登录
  async Login(Mobile, Password)
  {
    let param = {
      mobile: Mobile, 
      password: Password
    }

    let uri = 'kpay/api/login?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);
    return result;
  }

  logout()
  {
    localStorage.removeItem('token');
  }

  has_logon(): Boolean
  {
    return localStorage.getItem('token') != undefined;
  }

  //注册用户
  async RegisterUser(MobileNo, Code, Pwd) 
  {
    let param = {
      mobile:MobileNo, 
      veriCode: Code, 
      password: Pwd, 
    }
    
    let uri = 'kpay/api/register?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);
    return result
  }

  // 获取验证码
  async GetVerifyCode(MobileNo)
  {
    let param = {mobile: MobileNo};
    let uri = 'kpay/api/getVericode?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);
    return result; 
  }

  // 校验验证码
  async CheckVeriCode(MobileNo, code)
  {
    let param = {
      mobile: MobileNo,
      veriCode: code 
    };

    let uri = '/kpay/api/checkVeriCode?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);

    return result; 
  }

  // 验证验证码
  async CheckVerifyCode(MobileNo,code)
  {
    let param = {mobile: MobileNo,veriCode:code};
    let uri = 'kpay/api/checkVeriCode?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);
    return result; 
  }

  // 更改密码
  async ChangePassword(Password, VerifyCode, mobile){
    let param = {
      mobile: mobile,
      password: Password,
      veriCode: VerifyCode

    }

    let uri = 'kpay/api/user/changePassword?' + this.JSON2Uri(param);
    let result = await this.Request("post", uri);
    return result;
  }

  async getUserData()
  {
    let return_data = await this.Request('post', 'kpay/api/user/info');
    console.log('get user data >>>>>>>>>>>>>');
    console.log(return_data);
    if (return_data.code == 1)
    {
      App.userInfo = return_data.data;
    }
    else
    {
      console.log('用户信息获取失败:');
      console.log(return_data);
    }
  }  
}
