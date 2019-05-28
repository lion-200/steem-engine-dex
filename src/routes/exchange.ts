import { SteemEngine } from '../services/steem-engine';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Exchange {
    private currentToken: string;
    private styles = {};

    constructor(private se: SteemEngine) {

    }

    activate({symbol}) {
        this.currentToken = symbol;

        this.se.loadTokens();
    }
}
