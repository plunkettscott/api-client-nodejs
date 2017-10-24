import * as API from "../common/Api";
import { Token } from "../auth";
import { ProjectRequiredSettings } from "../common/Structs";
import { links } from "../common/Links";
import { connectToSocket } from "../common/WebSocket";
import { PipelineEvent } from "./PipelineEvent";

export type ProjectPipelineEventHeader =
    | "project.update"
    | "stack.create"
    | "stack.update"
    | "stack.delete"
    | "stack.build"
    | "stack.build.deploy"
    | "stack.build.delete"
    | "image.import"
    | "api_key.create"
    | "api_key.update"
    | "environment.create"
    | "environment.start"
    | "environment.stop"
    | "environment.delete"
    | "environment.update"
    | "job.new"
    | "job.scheduled"
    | "job.queued"
    | "job.running"
    | "job.error"
    | "job.completed"
    | "job.expired";

export type ProjectPipelineEvent = PipelineEvent<ProjectPipelineEventHeader>;

export interface ProjectPipelineParams {
    token: Token;
    settings: ProjectRequiredSettings;
    onMessage?: (v: ProjectPipelineEvent) => void;
}

export interface ProjectSecretResponse {
    data: {
        token: string;
    };
}

export async function connectToProjectPipeline(params: ProjectPipelineParams) {
    const target = links.projects().pipeline();

    const secretResp = await API.getRequest<ProjectSecretResponse>({
        target,
        token: params.token,
        settings: params.settings,
    });

    if (!secretResp.ok) {
        return secretResp;
    }

    return connectToSocket<ProjectPipelineEvent>({
        target,
        token: secretResp.value.data.token,
        settings: params.settings,
        onMessage: params.onMessage,
    });
}
