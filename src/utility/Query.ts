import { ArgumentNode, DocumentNode, FieldNode, OperationDefinitionNode } from "graphql";
import { Argument, Definition, Query, Selection } from "./Types";

const getArgument = (argument: ArgumentNode[]) => {
    let args: Argument[] = []
    argument.forEach(argument => {
        args.push({
            name: argument.name.value,
            value: argument.value.value
        })
    });
    return args
}

export const parseQuery = (query: DocumentNode) => {
    let filteredQuery: Query
    const filteredDefinitions: Definition[] = []
    const definitions: OperationDefinitionNode[] = query.definitions as OperationDefinitionNode[]
    definitions.forEach(definition => {
        const selections = definition.selectionSet.selections as FieldNode[]
        filteredDefinitions.push({
            name: definition.name?.value,
            variableDefinitions: definition.variableDefinitions,
            selections: parseSelections(selections)
        })
    });
    filteredQuery = {
        kind: query.kind,
        definitions: filteredDefinitions
    }

    return filteredQuery
}

export const parseSelections = (selections: FieldNode[]) => {
    let selects: Selection[] = []
    selections.forEach(selection => {
        if(selection.selectionSet) {
            parseSelections(selection.selectionSet?.selections)
        }
        else {
            selects.push({
                arguments: getArgument(selection.arguments),
                name: selection.name.value,
                selections: []
            })
        }
    });
    return selects
}

export const QueryToSQL = (query: Query) => {
    query.definitions.forEach(definition => {
        
    });
}