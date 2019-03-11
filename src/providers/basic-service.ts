import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { const_data } from '../common/application-const';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


@Injectable()
export class TBasicService 
{
  constructor(public http: Http)
  {
  }

  CreateHeader(): any
  {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let token = localStorage.getItem('token');

    if (token)
    {
      headers.append('Authorization','Bearer ' + token);
    }
  
    return new RequestOptions({headers: headers});
  }

  Get(uri: string): Promise<any>
  {
    let url = const_data.host_url + '/' + uri;
    let options = this.CreateHeader();
    console.log(url);
    return this.http.get(url, options).toPromise();
  }

  Get2(url: string): Promise<any>
  {
    let options = this.CreateHeader();
    return this.http.get(url, options).toPromise();
  }
  
  Post(data: any, uri?: string): Promise<any>
  {
    let url = const_data.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.post(url, data, options).toPromise();
  }

  Put(data: any, uri?: string): Promise<any>
  {
    let url = const_data.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    console.log(url);

    let options = this.CreateHeader();
    return this.http.put(url, data, options).toPromise();
  }

  Delete(uri?: string): Promise<any>
  {
    let url = const_data.host_url;
    if (uri)
    {
        url = url + '/' + uri;
    }

    let options = this.CreateHeader();
    return this.http.delete(url, options).toPromise();
  }

  JSON2Uri(data)
  {
    //DONE: json对象转成uri, 数据传输时，都以JSON,转成key1=value1&key2=value格式    
    let result = [];

    for (let key in data)
    {
      result.push(key + '=' + data[key]);
    }

    return result.join('&');
  }

  async Request(method: string, uri: string, data?: any)
  {
      //数据请求统一入口
      try
      {
          let retval = null;
          
          switch(method)
          {
              case 'get': 
                  if (data != undefined) {
                      //data => id
                      retval = await this.Get(uri + '/' + data).then(res => res.json());
                  }
                  else {
                      retval = await this.Get(uri).then(res => res.json());
                  }
                  break;

              case 'post':
                  retval = await this.Post(data, uri).then(res => res.json());
                  break;

              case 'post2':
                  retval = await this.Post(data, uri).then(res => res.text());
                  break;
                  
              case 'put':
                  retval = await this.Put(data, uri).then(res => res.json());
                  break;

              case 'delete':
                  retval = await this.Delete(uri + '/' + data).then(res => res.json());
                  break;
          }
      
          return retval;
      }
      catch(e)
      {
          console.log(e);
          return null;                
      }
      
  }


  private extractData(res: Response)
  {
    let body = res.json();
    
    return body;
  }

  private handleError(error: Response | any)
  {
    let errMsg: string;
    if (error instanceof Response)
    {
      errMsg = `${error.status} - ${error.statusText}`;
    }
    else
    {
      errMsg = error.message ? error.message : error.toString();
    }

    //console.error(errMsg);
    return Promise.reject(errMsg);
  }  
}
