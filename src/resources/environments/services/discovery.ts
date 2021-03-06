import { Service } from "./common";
import { StandardParams, links, postRequest } from "../../../common/api";
import { ResourceId, CreatedTask } from "../../../common/structs";

export interface DiscoveryService extends Service {
  config: DiscoveryConfig | null;
}

// tslint:disable-next-line:no-empty-interface
export interface DiscoveryConfig {}

export interface DiscoveryReconfig {
  high_availability?: boolean;
}

export type DiscoveryAction = "reconfigure";

export async function reconfigureDiscovery(
  params: StandardParams & {
    environmentId: ResourceId;
    value: DiscoveryReconfig;
  },
) {
  return postRequest<CreatedTask<DiscoveryAction>>({
    ...params,
    target: links
      .environments()
      .services()
      .discovery()
      .tasks(params.environmentId),
    value: {
      action: "reconfigure",
      contents: params.value,
    },
  });
}
