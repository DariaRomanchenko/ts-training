import * as request from "request-promise-native";
import _ = require("lodash");

export interface Package {
    href: string;
    context: object;
    next: object;
    items: any;
}

export class RandomHotel {
    private baseUrl: string;
    private allPackages;

    constructor(marketCode: string, enviroment: string) {
        if (!['uk', 'be', 'nl'].includes(marketCode)) {
            throw new Error('Invalid market code');
        }

        if (!['integration', 'qa', 'staging', 'production'].includes(enviroment)) {
            throw new Error('Invalid environment code');
        }

        if (enviroment === 'production') {
            switch (marketCode) {
                case 'uk':
                    this.baseUrl = 'https://www.thomascook.com';
                    break;
                case 'be':
                    this.baseUrl = 'https://www.neckermann.be';
                    break;
                case 'nl':
                    this.baseUrl = 'https://neckermann.nl';
                    break;
            }
            return;
        }

        this.baseUrl = `https://${marketCode}.${enviroment}.thomascook.io`;
    }

    async initialize() {
        this.allPackages = await request.get({
            uri: `${this.baseUrl}/api/packages`,
            json: true
        });

        }


    getHotelNames() {
        return this.allPackages.items.map(item => {
            return item.hotel.value;
        });
    }

    getRandomHotelName() {
        return _.sample(this.getHotelNames());
    }

}


