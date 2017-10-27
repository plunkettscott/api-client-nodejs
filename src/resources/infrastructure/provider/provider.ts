import * as Request from "../../../common/api/request";
import { QueryParams, links, Settings } from "../../../common/api";
import { CollectionDoc, Resource } from "../../../common/structs";

export type Collection = CollectionDoc<Provider>;

export interface Provider extends Resource {
    id: string;
    name: ProviderName;
    website: string;
}

export type ProviderName = "packet";

export async function getCollection({
    query,
    settings,
}: {
    query?: QueryParams;
    settings?: Settings;
}) {
    return Request.getRequest<Collection>({
        target: links
            .infrastructure()
            .providers()
            .collection(),
        query,
        settings,
    });
}