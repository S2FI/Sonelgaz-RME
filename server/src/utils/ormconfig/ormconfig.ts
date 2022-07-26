export async function getOrmconfigConnection(envConfigParam:string|undefined):Promise<any>{
    const ormConfig = await import(`../../config/env/${envConfigParam}.json`);
    return ormConfig;
}