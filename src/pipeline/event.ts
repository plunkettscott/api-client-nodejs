import { ResourceId } from "../common/structs";

export interface PipelineEvent<T extends string> {
    header: T;
    id: ResourceId;
    state?: string;
    error?: boolean;
    project_id: ResourceId;
    environment_id: ResourceId;
    account_id: ResourceId;
}
