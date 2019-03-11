import { Injectable } from '@angular/core';
import { TAuth } from '../providers/auth';

@Injectable()
export class MineService
{
  constructor(public auth: TAuth) 
  {        
  }

  async GetUserInfo()
  {
    //快捷支付
    let retval = await this.auth.Request('get', 'kpay/api/user/info');
    return retval;
  }

  async GetVoucherList()
  {
    //获取返现卷的列表
    let retval = await this.auth.Request('post', 'kpay/api/cash/cashback/list');
    return retval;
  }

  async GetPackageList()
  {
    //获取套餐的列表
    let retval = await this.auth.Request('post', 'kpay/api/package/list');
    return retval;
  }

  async Upload(data)
  {
    let uri = this.auth.JSON2Uri(data);
    uri = 'kpay/api/image/upload?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

  async GetImgSrc(localimgsrc)
  {
    //获取图片地址
    let data = {'fileId': localimgsrc}
    let uri = this.auth.JSON2Uri(data);
    uri = 'kpay/api/image/show?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

  async BuyPackage(packId)
  {
    let data = {'packId': packId}
    //购买套餐接口
    let retval = await this.auth.Request('post', 'kpay/api/package/buy?', data);
    let uri = this.auth.JSON2Uri(data);
    uri = 'kpay/api/package/buy?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

  async UpdateUserInfo(nickName,mobile,sex,avatar)
  {
    //修改用户信息
    let data = {'nickName': nickName,'mobile':mobile,'sex':sex,'avatar':avatar}
    let uri = this.auth.JSON2Uri(data);
    uri = 'kpay/api/user/modify?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

  async GetTakeCashList()
  {
    //获取取现记录列表
    let retval = await this.auth.Request('post', 'kpay/api/cash/getCashList');
    console.log("取现记录列表：");
    console.log(retval);
    return retval;
  }

  async GetUserData()
  {
    // 获取用户信息
    let retval = await this.auth.Request('post','kpay/api/user/info');
    console.log("获取用户信息");
    console.log(retval);
    return retval;
  }

  async GetVerifyCode(mobile)
  {
    // 获取验证码 重置登录密码页面使用
    let uri = 'kpay/api/getVericode?' + this.auth.JSON2Uri({mobile: mobile});

    let retval = await this.auth.Request('post', uri);
    console.log("获取短信验证码");
    console.log(retval);
    return retval;
  }

  async confirmVeriCode(mobile, veri_code)
  {
    let tmp_json = {
      mobile: mobile,
      veriCode: veri_code
    }
    let uri = 'kpay/api/checkVeriCode?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  }

  async GetReCashList()
  {
    // 获取返现提现记录
    let retval = await this.auth.Request('post','kpay/api/trade/list');
    console.log("获取返现提现记录");
    console.log(retval);
    return retval;
  }

  async GetBankList()
  {
    // 获取用户银行卡信息
    let retval = await this.auth.Request('post','kpay/api/bankcard/list');
    console.log("获取银行卡记录");
    console.log(retval);
    return retval;
  }

  async QuickPay(cardId, enterCardId, amount, cashbackId, token)
  {
    // 支付
    let data = {'cardId': cardId,'enterCardId':enterCardId,'amount':amount,'cashbackId':cashbackId, 'token':token}
    
    let uri = this.auth.JSON2Uri(data);
    uri = 'kpay/api/trade/quickPay/request?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result;
  }

  async setPrimary(cardId)
  {
    //设置主卡
    let param = {'cardId': cardId}
    let uri = this.auth.JSON2Uri(param);
    uri = 'kpay/api/bankcard/setPrimary?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

  async DelBank(cardId)
  {
    //删除银行卡
    let param = {'cardId': cardId}
    let uri = this.auth.JSON2Uri(param);
    uri = 'kpay/api/bankcard/del?' + uri;
    let result = await this.auth.Request("post", uri);
    console.log(uri);
    return result
  }

}
