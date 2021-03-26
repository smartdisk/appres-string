export declare class AppresString {
    static genForPlist(strings: any, langId: any, hash?: any): string;
    genForPlist(strings: any, langId: any, hash?: any): string;  

    static genForXML(strings: any, langId: any, hash?: any): string;
    genForXML(strings: any, langId: any, hash?: any): string;  

    static genForJson(strings: any, langId: any, key?: any, hash?: any): string;
    genForJson(strings: any, langId: any, key?: any, hash?: any): string;  

    static genForKeyValue(strings: any, langId: any, hash?: any): string;
    genForKeyValue(strings: any, langId: any, hash?: any): string;  

    static genForDict(strings: any, langId: any, hash?: any): string;
    genForDict(strings: any, langId: any, hash?: any): string;  

    static genForApple(strings: any, langId: any, isDefault: boolean, keyMode: boolean, hash?: any): string;
    genForApple(strings: any, langId: any, isDefault: boolean, keyMode: boolean, hash?: any): string;  

    static genForAndroid(strings: any, langId: any, isDefault: boolean, hash?: any): string;
    genForAndroid(strings: any, langId: any, isDefault: boolean, hash?: any): string;  

    
    static format(...args): string;
    format(...args): string;  

    static split(string, pattern): any;
    split(string, pattern): any;  
}