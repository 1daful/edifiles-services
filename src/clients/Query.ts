import { DocumentNode, FieldNode, OperationDefinitionNode, SelectionNode } from "graphql";

// This function assumes that the DocumentNode query is valid and has only one operation
export function parseQuery (query: DocumentNode) {
  // Create an empty Json object
  let json: {
    type: string,
    name?: string,
    variables?: Record<string, any>,
    selections: []
  } = {
    type: "",
    name: "",
    selections: []
  };
  // Get the operation type and name from the query
  let operation = query.definitions [0] as OperationDefinitionNode
  json.type = operation.operation;
  json.name = operation.name?.value;
  // Get the variables from the query
  let variables = operation.variableDefinitions;
  if (variables && variables.length > 0) {
    json.variables = {};
    for (let variable of variables) {
      json.variables [variable.variable.name.value] = variable.type.name.value;
    }
  }
  // Get the selection set from the query
  let selectionSet = operation.selectionSet.selections;
  if (selectionSet && selectionSet.length > 0) {
    json.selections = [];
    for (let selection of selectionSet) {
      json.selections.push (parseSelection (selection));
    }
  }
  // Return the Json object
  return json;
}

// This function parses a selection node and returns a Json object
export function parseSelection (selection: FieldNode) {
  // Create an empty Json object
  let json: {
    type: string,
    name?: string,
    variables?: Record<string, any>,
    selections?: Record<string, any>,
    arguments?: Record<string, any>,
    directives?: Record<string, any>
  } = {
    type: "",
    selections: [],
    arguments: []
  };
  // Get the selection type and name from the node
  json.type = selection.kind;
  json.name = selection.name.value;
  // Get the arguments from the node
  let args = selection.arguments;
  if (args && args.length > 0) {
    json.arguments = {};
    for (let argument of arguments) {
      json.arguments [argument.name.value] = argument.value.value;
    }
  }
  // Get the directives from the node
  let directives = selection.directives;
  if (directives && directives.length > 0) {
    json.directives = [];
    for (let directive of directives) {
      json.directives.push (directive.name.value);
    }
  }
  // Get the sub-selection set from the node
  let subSelectionSet = selection.selectionSet.selections;
  if (subSelectionSet && subSelectionSet.length > 0) {
    json.subSelections = [];
    for (let subSelection of subSelectionSet) {
      json.subSelections.push (parseSelection (subSelection));
    }
  }
  // Return the Json object
  return json;
}