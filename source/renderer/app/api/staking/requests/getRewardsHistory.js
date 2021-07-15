// @flow
import { request } from 'graphql-request';
import { print } from 'graphql/language/printer';
import getRewardsForAddressesQuery from './graphql/getRewardsForAddresses.graphql';
import type {
  GetRewardsForAddressesQuery,
  GetRewardsForAddressesQueryVariables,
} from '../../../types/cardano-graphql';

// TODO: remove when we can use a proper graphql query (active discussion in slack)
// this is the api white-listed string which cannot be generated by the tooling we use
// const getRewardsForAddressesQuery =
//   'query getRewardsForAddresses($addresses: [StakeAddress!]!, $limit: Int, $offset: Int, $order_by: [Reward_order_by!]) {\n  rewards(limit: $limit, offset: $offset, order_by: $order_by, where: {address: {_in: $addresses}}) {\n    address\n    amount\n    earnedIn {\n      number\n    }\n    stakePool {\n      id\n    }\n  }\n}\n';

export async function getRewardsHistory(
  vars: GetRewardsForAddressesQueryVariables
): Promise<GetRewardsForAddressesQuery> {
  return request(
    global.environment.cardanoGraphQlEndpoint,
    print(getRewardsForAddressesQuery),
    vars
  );
}