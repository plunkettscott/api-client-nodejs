import { Token } from "../../auth";
import { getRequest, makeUrl, patchRequest } from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { CollectionDoc, Resource, Settings, SingleDoc, Time } from "../../common/Structs";

export interface Collection extends CollectionDoc {
    data: Account[];
}

export interface Single extends SingleDoc {
    data: Account | null;
}

export interface Account extends Resource {
    email: {
        address: string;
        verified: boolean;
        added: Time;
    };
    name: {
        first: string;
        last: string;
    };
    temp: boolean;
}

export interface UpdateParams {
    name?: {
        first?: string;
        last?: string;
    };
}

export async function getSingle(token: Token, query?: QueryParams, settings?: Settings) {
    return getRequest<Single>(`${makeUrl(settings)}/account`, query, token);
}

export async function update(update: UpdateParams, token: Token, query?: QueryParams, settings?: Settings) {
    return patchRequest<Single>(`${makeUrl(settings)}/account`, update, query, token);
}
