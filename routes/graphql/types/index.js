import { mergeTypes } from "merge-graphql-schemas";

import Place from "./Place/";

const typeDefs = [Place];

export default mergeTypes(typeDefs, { all: true });
