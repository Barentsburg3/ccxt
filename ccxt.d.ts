declare module 'ccxt' {

    // error.js -----------------------------------------

    export class BaseError extends Error {
        constructor(message: string);
    }

    export class ExchangeError extends BaseError {
        constructor(message: string);
    }

    export class NotSupported extends ExchangeError {
        constructor(message: string);
    }

    export class AuthenticationError extends ExchangeError {
        constructor(message: string);
    }

    export class InvalidNonce extends ExchangeError {
        constructor(message: string);
    }

    export class InsufficientFunds extends ExchangeError {
        constructor(message: string);
    }

    export class InvalidOrder extends ExchangeError {
        constructor(message: string);
    }

    export class OrderNotFound extends InvalidOrder {
        constructor(message: string);
    }

    export class OrderNotCached extends InvalidOrder {
        constructor(message: string);
    }

    export class CancelPending extends InvalidOrder {
        constructor(message: string);
    }

    export class NetworkError extends BaseError {
        constructor(message: string);
    }

    export class DDoSProtection extends NetworkError {
        constructor(message: string);
    }

    export class RequestTimeout extends NetworkError {
        constructor(message: string);
    }

    export class ExchangeNotAvailable extends NetworkError {
        constructor(message: string);
    }

    // -----------------------------------------------

    export const version: string;
    export const exchanges: string[];

    export interface MinMax {
        max: number;
        min: number;
    }

    export interface Market {
        [key: string]: any
        id: string;
        symbol: string;
        base: string;
        quote: string;
        active: boolean;
        precision: { amount: number, price: number, cost: number };
        limits: { amount: MinMax, price: MinMax, cost?: MinMax };
        info: any;
    }

    export interface Order {
        id: string;
        datetime: string;
        timestamp: number;
        lastTradeTimestamp: number;
        status: 'open' | 'closed' | 'canceled';
        symbol: string;
        type: 'market' | 'limit';
        side: 'buy' | 'sell';
        price: number;
        amount: number;
        filled: number;
        remaining: number;
        cost: number;
        trades: Trade[];
        fee: Fee;
        info: {};
    }

    export interface OrderBook {
        asks: [number, number][];
        bids: [number, number][];
        datetime: string;
        timestamp: number;
        nonce: number;
    }

    export interface Trade {
        amount: number;                  // amount of base currency
        datetime: string;                // ISO8601 datetime with milliseconds;
        id: string;                      // string trade id
        info: {};                        // the original decoded JSON as is
        order?: string;                  // string order id or undefined/None/null
        price: number;                   // float price in quote currency
        timestamp: number;               // Unix timestamp in milliseconds
        type?: 'market' | 'limit';       // order type, 'market', 'limit' or undefined/None/null
        side: 'buy' | 'sell';            // direction of the trade, 'buy' or 'sell'
        symbol: string;                  // symbol in CCXT format
        takerOrMaker: 'taker' | 'maker'; // string, 'taker' or 'maker'
        cost: number;                    // total cost (including fees), `price * amount`
        fee: Fee;
    }

    export interface Ticker {
        symbol: string;
        info: object;
        timestamp: number;
        datetime: string;
        high: number;
        low: number;
        bid: number;
        bidVolume?: number;
        ask: number;
        askVolume?: number;
        vwap?: number;
        open?: number;
        close?: number;
        last?: number;
        previousClose?: number;
        change?: number;
        percentage?: number;
        average?: number;
        quoteVolume?: number;
        baseVolume?: number;
    }

    export interface Transaction {
        info: {};
        id: string;
        txid?: string;
        timestamp: number;
        datetime: string;
        address: string;
        type: "deposit" | "withdrawal";
        amount: number;
        currency: string;
        status: "pending" | "ok";
        updated: number;
        fee: Fee;
    }

    export interface Tickers {
        info: any;
        [symbol: string]: Ticker;
    }

    export interface Currency {
        id: string;
        code: string;
    }

    export interface Balance {
        free: number;
        used: number;
        total: number;
    }

    export interface PartialBalances {
        [currency: string]: number;
    }

    export interface Balances {
        info: any;
        [key: string]: Balance;
    }

    export interface DepositAddress {
        currency: string;
        address: string;
        status: string;
        info: any;
    }

    export interface Fee {
        type: 'taker' | 'maker';
        currency: string;
        rate: number;
        cost: number;
    }

    export interface WithdrawalResponse {
        info: any;
        id: string;
    }

    export interface DepositAddressResponse {
        currency: string;
        address: string;
        info: any;
        tag?: string;
    }

    // timestamp, open, high, low, close, volume
    export type OHLCV = [number, number, number, number, number, number];

    export class Exchange {
        constructor(config?: {[key in keyof Exchange]?: Exchange[key]});
        // allow dynamic keys
        [key: string]: any;
        // properties
        hash: any;
        hmac: any;
        jwt: any;
        binaryConcat: any;
        stringToBinary: any;
        stringToBase64: any;
        base64ToBinary: any;
        base64ToString: any;
        binaryToString: any;
        utf16ToBase64: any;
        urlencode: any;
        pluck: any;
        unique: any;
        extend: any;
        deepExtend: any;
        flatten: any;
        groupBy: any;
        indexBy: any;
        sortBy: any;
        keysort: any;
        decimal: any;
        safeFloat: any;
        safeString: any;
        safeInteger: any;
        safeValue: any;
        capitalize: any;
        json: JSON["stringify"]
        sum: any;
        ordered: any;
        aggregate: any;
        truncate: any;
        name: string;
        // nodeVersion: string;
        fees: object;
        enableRateLimit: boolean;
        countries: string;
        // set by loadMarkets
        markets: { [symbol: string]: Market };
        marketsById: { [id: string]: Market };
        currencies: { [symbol: string]: Currency };
        ids: string[];
        symbols: string[];
        id: string;
        proxy: string;
        parse8601: typeof Date.parse
        milliseconds: typeof Date.now;
        rateLimit: number;  // milliseconds = seconds * 1000
        timeout: number; // milliseconds
        verbose: boolean;
        twofa: boolean;// two-factor authentication
        substituteCommonCurrencyCodes: boolean;
        timeframes: any;
        has: { [what: string]: any }; // https://github.com/ccxt/ccxt/pull/1984
        balance: object;
        orderbooks: object;
        orders: object;
        trades: object;
        userAgent: { 'User-Agent': string } | false;

        // methods
        getMarket (symbol: string): Market;
        describe (): any;
        defaults (): any;
        nonce (): number;
        encodeURIComponent (...args: any[]): string;
        checkRequiredCredentials (): void;
        initRestRateLimiter (): void;
        handleResponse (url: string, method: string, headers?: any, body?: any): any;
        defineRestApi (api: any, methodName: any, options?: { [x: string]: any }): void;
        fetch (url: string, method?: string, headers?: any, body?: any): Promise<any>;
        fetch2 (path: any, api?: string, method?: string, params?: { [x: string]: any }, headers?: any, body?: any): Promise<any>;
        setMarkets (markets: Market[], currencies?: Currency[]): { [symbol: string]: Market };
        loadMarkets (reload?: boolean): Promise<{ [symbol: string]: Market }>;
        fetchTicker (symbol: string, params?: { [x: string]: any }): Promise<Ticker>;
        fetchTickers (symbols?: string[], params?: { [x: string]: any }): Promise<{ [x: string]: Ticker }>;
        fetchMarkets (): Promise<Market[]>;
        fetchOrderStatus (id: string, market: string): Promise<string>;
        encode (str: string): string;
        decode (str: string): string;
        account (): Balance;
        commonCurrencyCode (currency: string): string;
        market (symbol: string): Market;
        marketId (symbol: string): string;
        marketIds (symbols: string[]): string[];
        symbol (symbol: string): string;
        extractParams (str: string): string[];
        createOrder (symbol: string, type: string, side: string, amount: number, price?: number, params?: {}): Promise<any>;
        fetchBalance (params?: any): Promise<Balances>;
        fetchTotalBalance (params?: any): Promise<PartialBalances>;
        fetchUsedBalance (params?: any): Promise<PartialBalances>;
        fetchFreeBalance (params?: any): Promise<PartialBalances>;
        fetchOrderBook (symbol: string, limit?: number, params?: any): Promise<OrderBook>;
        fetchTicker (symbol: string): Promise<Ticker>;
        fetchTickers (symbols?: string[]): Promise<Tickers>;
        fetchTrades (symbol: string, since?: number, limit?: number, params?: {}): Promise<Trade[]>;
        fetchOHLCV? (symbol: string, timeframe?: string, since?: number, limit?: number, params?: {}): Promise<OHLCV[]>;
        fetchOrders (symbol?: string, since?: number, limit?: number, params?: {}): Promise<Order[]>;
        fetchOpenOrders (symbol?: string, since?: number, limit?: number, params?: {}): Promise<Order[]>;
        fetchCurrencies (params?: any): Promise<any>;
        fetchTransactions (currency?: string, since?: number, limit?: number, params?: {}): Promise<Transaction[]>;
        fetchDeposits (currency?: string, since?: number, limit?: number, params?: {}): Promise<Transaction[]>;
        fetchWithdrawals (currency?: string, since?: number, limit?: number, params?: {}): Promise<Transaction[]>;
        cancelOrder (id: string, symbol?: string, params?: {}): Promise<any>;
        createDepositAddress (currency: string, params?: {}): Promise<DepositAddressResponse>;
        fetchDepositAddress (currency: string, params?: {}): Promise<DepositAddressResponse>;
        withdraw (currency: string, amount: number, address: string, tag?: string, params?: {}): Promise<WithdrawalResponse>;
        request (path: string, api?: string, method?: string, params?: any, headers?: any, body?: any): Promise<any>;
        YmdHMS (timestamp: string, infix: string) : string;
        iso8601 (timestamp: string): string;
        seconds (): number;
        microseconds (): number;
    }

    /* tslint:disable */

    export class binance extends Exchange {}
    export class bishino extends Exchange {}

    /* tslint:enable */

}
