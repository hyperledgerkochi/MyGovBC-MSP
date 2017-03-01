import * as _ from 'lodash';
//import { Input } from '@angular/core';

class Address {
  // Street number, name and suffix
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;

  // City
  city: string;

  // Full Name
  province: string;

  // canadian postal code
  private _postal: string;

  // postal accessors
  get postal(): string {
    return this._postal;
  }
  //@Input('postal')
  set postal(value: string) {
    if(!!value){
      this._postal = value.toUpperCase();
    }else {
        this._postal = null;
    }
  }

  // Full english spelling of country
  country: string;

  get hasValue(): boolean {
    return (this.addressLine1 != null);
  }

  get isValid(): boolean {
    return !_.isEmpty(this.addressLine1)
        &&!_.isEmpty(this.city)
        &&!_.isEmpty(this.province)
        &&!_.isEmpty(this.postal)
        &&!_.isEmpty(this.country)
  }
  constructor(){
  }

}

export {Address};