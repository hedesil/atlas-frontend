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
import {Asset} from './asset';
import {Audit} from './audit';
// import {Smallint} from './smallint';

export interface Url {
  asset?: Asset;
  audits?: Array<Audit>;
  _class?: number;
  enviroment?: string;
  id?: number;
  port?: number;
  url?: string;
}
