import {env} from 'cloudflare:workers';
export function db(){const binding=(env as unknown as {DB:D1Database}).DB;if(!binding)throw Error('Workspace storage is unavailable. Please try again.');return binding}
export function runtime(key:string){return (env as unknown as Record<string,string>)[key]||process.env[key]||''}
export async function log(orgId:string,userId:string,action:string,resource:string){await db().prepare('INSERT INTO audit_logs (id,org_id,user_id,action,resource,created_at) VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(),orgId,userId,action,resource,new Date().toISOString()).run()}
