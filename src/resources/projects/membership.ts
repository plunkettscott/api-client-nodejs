import * as Request from "../../common/api/request";
import { Token } from "../../auth";
import { QueryParams, links, ProjectRequiredSettings } from "../../common/api";
import {
    CollectionDoc,
    Resource,
    SingleDoc,
    Events,
    State,
    ResourceId,
    Time,
} from "../../common/structs";
import { PublicAccount } from "../accounts/account";

export type Collection = CollectionDoc<Membership, {}, MembershipIncludes>;
export type Single = SingleDoc<Membership>;
export type MembershipState = "new" | "active" | "deleting" | "deleted";
export type MembershipEvent = "joined";
export type InvitationEvent = "accepted" | "declined" | "revoked";
export type MembershipQuery = QueryParams<keyof MembershipIncludes>;

export enum Role {
    OWNER,
    ADMIN = 1 << 1,
    DEVELOPER = 1 << 2,
    ANALYST = 1 << 3,
    DEFAULT = 0,
}

export interface Membership extends Resource {
    account_id: ResourceId;
    project_id: ResourceId;
    role: Role;
    events: Events<MembershipEvent>;
    state: State<MembershipState>;
    invitation: Invitation;
}

export interface MembershipIncludes {
    senders: {
        [key: string]: PublicAccount;
    };
}

export interface Invitation {
    sender: ResourceId;
    recipient: {
        email: string;
    };
    events: Events<InvitationEvent>;
}

export interface Member extends PublicAccount {
    role: Role;
    joined: Time;
}

/**
 * Members in this project
 */
export async function getCollection({
    token,
    query,
    settings,
}: {
    token: Token;
    query?: QueryParams;
    settings?: ProjectRequiredSettings;
}) {
    return Request.getRequest<CollectionDoc<Member>>({
        target: links
            .projects()
            .members()
            .collection(),
        query,
        token,
        settings,
    });
}
