import { ArgumentNode, DocumentNode, FieldNode, ListValueNode, OperationDefinitionNode } from "graphql";
import { Definition, Query, Selection } from "./Types";

const getArguments = (dArgs: ArgumentNode[]) => {
    let args: any[] = []
    dArgs.forEach(argument => {

        if(argument.value.kind === 'ListValue') {
            args.push({
                name: argument.name.value,
                values: getArguments(argument.value.values)
            })
        }

        if(argument.value.kind === 'ObjectValue') {
            let fields: Record<string, any>

            argument.value.fields.forEach(field => {
                fields[field.name.value] = field.value
            });

            args.push({
                name: argument.name.value,
                fields: argument.value.fields.map((field)=> {
                    return { [field.name.value]: field.value }
                })
            })
        }

        if(argument.value.kind === 'StringValue' || argument.value.kind === 'IntValue') {
            args.push({
                name: argument.name.value,
                value: argument.value.value
            })
        }
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