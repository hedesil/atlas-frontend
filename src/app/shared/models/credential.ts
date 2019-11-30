import { Company } from './models';

export interface Credential { 
    id?: number;
    name?: string;
    homePath?: string;
    consumerKey?: string;
    consumerPrivateKey?: string;
    description? : string;
    token? : string
    company : Company
}