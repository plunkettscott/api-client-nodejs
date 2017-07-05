import * as API from "../../common/Api";
import { QueryParams } from "../../common/QueryParams";
import { links } from "../../common/Links";
import {
    CollectionDoc,
    Resource,
    Settings,
    SingleDoc,
    Mills,
    ResourceId,
    Includes,
} from "../../common/Structs";
import { DataCenter } from "./DataCenters";
import { ProviderName } from "./Providers";

export type Collection = CollectionDoc<Server, {}, ServerIncludes>;
export type Single = SingleDoc<Server>;

export interface Server extends Resource {
    name: string;
    description: string;

    specs: {
        cpus: Array<GenericSpecs<ServerCPU>>;
        memory: Array<GenericSpecs<ServerMemory>>;
        drives: Array<GenericSpecs<ServerDrive>>;
        nics: Array<GenericSpecs<ServerNIC>>;
        features: ServerFeatures;
    };

    provider: {
        id: string;
        name: ProviderName;
        slug: string;
    };

    pricing: ServerPricing;

    containers: {
        min: number;
        max: number;
    };

    datacenters: ResourceId[];
}

export interface ServerIncludes extends Includes {
    datacenters: { [key: string]: DataCenter };
}

export interface GenericSpecs<T> {
    count: number;
    specs: T;
}

export interface ServerCPU {
    model: string;
    cores: number;
    frequency: {
        speed: number;
        unit: string;
    };
}

export interface ServerMemory {
    storage: {
        size: number;
        unit: string;
    };
    type: string;
}

export interface ServerDrive {
    storage: {
        size: number;
        unit: string;
    };
    type: string;
    raid?: {
        level: number;
    };
}

export interface ServerNIC {
    bandwidth: {
        speed: number;
        unit: string;
    };
    type: string;
    bonded: boolean;
}

export interface ServerFeatures {
    raid: boolean;
    txt: boolean;
}

export interface ServerPricing {
    infrastructure: Mills;
    licensing: Mills;
}

export async function getCollection({
    provider,
    query,
    settings,
}: {
    provider: string;
    query?: QueryParams;
    settings?: Settings;
}) {
    return API.getRequest<Collection>({
        target: links.infrastructure().providers().servers(provider),
        query,
        settings,
    });
}
