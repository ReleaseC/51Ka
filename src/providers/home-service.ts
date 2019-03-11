import { Injectable } from '@angular/core';
import { TAuth } from '../providers/auth';

@Injectable()
export class HomeService
{
  constructor(public auth: TAuth) 
  {        
  }
  // 获取银行卡信息
  async getCardData()
  {
    let uri = "kpay/api/bankcard/list";
    let return_data = await this.auth.Request('post',uri);
    return return_data;
  }

  // 获取用户信息
  async getUserData()
  {
    let uri = "kpay/api/user/info";
    let return_data = await this.auth.Request('post',uri)
    return return_data;
  }

  // 查找取现可用的返现券
  async cashBackTicket()
  {
    let uri = "kpay/api/cash/cashback/available";
    let return_data = await this.auth.Request('post',uri)
    return return_data;
  }

  // 添加信用卡
  async addCreditCard(cardNo, mobile)
  {
    let tmp_json = {
      cardNo: cardNo,
      mobile: mobile
    }
    let uri = 'kpay/api/bankcard/addCredit?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  } 
  
  // 身份认证
  async idApprove(idcard, name, mobile)
  {
    let tmp_json = {
      idcardNo: idcard,
      name: name,
      mobile: mobile
    }
    let uri = 'kpay/api/idcard/auth?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  }
  
  // 获取验证码
  async getVeriCode(mobile)
  {
    let tmp_json = {
      mobile: mobile
    }
    let uri = 'kpay/api/getVericode?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  }

  // 校验验证码
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

  // 获取银行列表
  async getTolBankList()
  {
    let return_data = await this.auth.Request('post', 'kpay/api/bank/info');
    return return_data;
  }

  // 获取银行列表
  async getTotalBankList(data)
  {
    let param = {'name': data}
    let uri = this.auth.JSON2Uri(param);
    uri = 'kpay/api/bank/info?' + uri;
    let result = await this.auth.Request("post", uri);
    return result;
  }

  // 获取支行信息
  async getSubBankList(bank_name, key_word)
  {
    let tmp_str;
    if(key_word.length > 0){
      tmp_str = bank_name + ',' + key_word;
    }
    else
    {
      tmp_str = bank_name
    }
    let tmp_json = {name: tmp_str}
    let uri = 'kpay/api/bank/list?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  }

  // 添加储蓄卡
  async addDepositCard(cardNo, bank_name, bank_num, subbank_name, mobile)
  {
    let tmp_json = {
      cardNo: cardNo,
      bankName: bank_name,
      bankNo: bank_num,
      branchName: subbank_name,
      mobile: mobile
    }
    let uri = 'kpay/api/bankcard/addDeposit?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data;
  } 

  // 获取可用返现券
  async getDiscount(amount)
  {
    let tmp_json = { amount: amount }
    let uri = 'kpay/api/cash/cashback/available?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post', uri);
    return return_data
  }

  // 提现
  async tackCash(cardId, enterCard, amount, cashbackId ?)
  {
    let tmp_json;
    if (cashbackId)
    {
      tmp_json = {
        cardId: cardId,
        enterCardId: enterCard,
        amount: amount,
        cashbackId: cashbackId
      }  
    }
    else
    {
      tmp_json = {
        cardId: cardId,
        enterCardId: enterCard,
        amount: amount
      }  
    }

    let uri = 'kpay/api/trade/quickPay/request?' + this.auth.JSON2Uri(tmp_json);
    let return_data = await this.auth.Request('post2', uri);
    console.log(return_data);
    return return_data;
  }

  // 跳转申请银行卡页面
  async jumpPage()
  {
    let uri = 'https://interacts.hq.vidata.com.cn/h5/card-platform/index.html?source=1036'
    //let return_data = await this.auth.Get2(uri);
    let return_data = await this.auth.Get2(uri);
    console.log(return_data);
    return return_data;
  }
}
