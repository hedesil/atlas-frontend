/**
 * IndexOf API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Functionality } from './functionality';
import { User } from './user';

export interface Methodology { 
    id?: number;
    name?: string;
    description?: string;
    users?: Array<User>;
    functionalities?: Array<Functionality>;
}