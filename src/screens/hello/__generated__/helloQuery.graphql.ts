/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type helloQueryVariables = {};
export type helloQueryResponse = {
    readonly allChildTables: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly nodeId: string;
            } | null;
        }>;
    } | null;
};
export type helloQuery = {
    readonly response: helloQueryResponse;
    readonly variables: helloQueryVariables;
};



/*
query helloQuery {
  allChildTables {
    edges {
      node {
        nodeId
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "allChildTables",
    "storageKey": null,
    "args": null,
    "concreteType": "ChildTablesConnection",
    "plural": false,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "edges",
        "storageKey": null,
        "args": null,
        "concreteType": "ChildTablesEdge",
        "plural": true,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "node",
            "storageKey": null,
            "args": null,
            "concreteType": "ChildTable",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "nodeId",
                "args": null,
                "storageKey": null
              }
            ]
          }
        ]
      }
    ]
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "helloQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "helloQuery",
    "argumentDefinitions": [],
    "selections": (v0/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "helloQuery",
    "id": null,
    "text": "query helloQuery {\n  allChildTables {\n    edges {\n      node {\n        nodeId\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '216067e0fcbbc9ed1d38ff800197f2a6';
export default node;
