export type Role='Owner'|'Admin'|'Manager'|'SEO Specialist'|'Content Manager'|'Ads Manager'|'Analyst'|'Client';
export type Client={id:string;orgId:string;name:string;website:string;industry:string;location:string;market:string;goals:string;audience:string;guidelines:string;logo:string;color:string;demo:boolean;createdAt:string};
export type Entry={id:string;clientId:string;kind:string;title:string;status:string;priority:string;owner:string;dueDate:string;projectId:string;relatedId:string;data:Record<string,any>;createdAt:string;updatedAt:string};
export type DailyMetric={date:string;sessions:number;organic:number;paid:number;social:number;referral:number;direct:number;leads:number;conversions:number;spend:number;revenue:number;impressions:number;clicks:number};
export type Membership={id:string;email:string;role:Role;clientId:string|null;userId:string|null};
export type Workspace={user:{id:string;name:string;email:string};organization:{id:string;name:string};role:Role;clients:Client[];entries:Entry[];metrics:DailyMetric[];clientId:string;members:Membership[];aiEnabled:boolean;demoMode:boolean};
export type Field={key:string;label:string;type?:'text'|'textarea'|'number'|'date'|'url'|'select'|'email';options?:string[];required?:boolean};
export type ModuleDef={id:string;label:string;group:string;kind?:string;singular?:string;description:string;statuses?:string[];fields?:Field[]};
