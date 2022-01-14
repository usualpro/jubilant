import { computed, makeObservable, observable } from 'mobx';

import { Services } from '../https/services';

class Countries {
    _countries = [];
    constructor() {
        makeObservable(this, {
            _countries: observable.shallow,
            countries: computed
        })
    }

    async getAllCountries() {
        const results = await Services.getAllCountries();
        this.countries = results.data;
    }

    get countries() {
        return this._countries
    }

    set countries(countries) {
        this._countries = countries;
    }
}
export default new Countries();