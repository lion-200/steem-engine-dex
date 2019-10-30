import { getUserOpenOrders, cancelMarketOrder } from 'common/market';
import { Redirect } from 'aurelia-router';
import { observable } from 'aurelia-binding';
import { SteemEngine } from 'services/steem-engine';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class OpenOrders {
    private loadingOpenOrders = false;
    private orders = [];
    
    constructor(private se: SteemEngine) {

    }

    async canActivate() {
        this.loadingOpenOrders = true;

        try {            
            this.orders = await getUserOpenOrders(this.se.getUser());
            console.log(this.orders);
        } catch {
            return false;
        } finally {
            this.loadingOpenOrders = false;
        }
    }

    async cancelOrder(type: string, txId: string, symbol: string) {
        const order = await cancelMarketOrder(this.se.getUser(), type, txId, symbol);
    }
}
