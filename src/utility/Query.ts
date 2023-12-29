import { ArgumentNode, DocumentNode, FieldNode, ListValueNode, ObjectFieldNode, ObjectValueNode, OperationDefinitionNode, ValueNode } from "graphql";
import { Definition, Query, Selection } from "./Types";

const getArgumentValues = (dArgs: ValueNode[]) => {
    console.log("D_ARGS: ", dArgs)
    let args: any[] = []

    dArgs.forEach(argument => {
            if(argument.kind === 'ListValue') {
                args.push(getArgumentValues(argument.values))
            }
    
            if(argument.kind === 'ObjectValue') {
                args.push(getArgumentFields(argument.fields))
            }
    
            if(argument.kind === 'StringValue' || argument.kind === 'IntValue') {
                args.push(argument.value)
            }

    });
    console.log("getArgumentValues: ", args)
    return args
}

const getArgumentFields = (dArgs: ObjectFieldNode[]) => {
    let values: any[] = []
    let fields: Record<string, any> = {}

    dArgs.forEach(val => {
        if(val.value.kind === 'ListValue') {
            val.value
            fields[val.name.value] = getArgumentValues(val.value.values)
        }
        
        if(val.value.kind === 'ObjectValue') {
            fields[val.name.value] = getArgumentFields(val.value.fields)
        }

        if(val.value.kind === 'StringValue' || val.value.kind === 'IntValue') {
            fields[val.name.value] = val.value.value
        }

    });
    console.log("getArgumentFields: ", dArgs)
    return fields
}

const getObjectFields = (dFields: ObjectFieldNode[]) => {
    let fields: Record<string, any> = {}
    dFields.forEach(field => {
        if (field.value.kind === 'ObjectValue') {
            fields[field.name.value] = field.value.fields
        }

        if (field.value.kind === 'IntValue') {
            fields[field.name.value] = field.value.value
        }

        if (field.value.kind === 'ListValue') {
            fields[field.name.value] = field.value.values
        }
    });
    return fields
}

const getArrayValue = (value: ListValueNode) => {
    let values: []
    let fields: Record<string, any> = {}
    value.values.forEach(field => {
        if (field.kind === 'ObjectValue') {
            values.push(getObjectFields(field.fields))
        }

        if (field.kind === 'IntValue') {
            fields[field.name.value] = field.value.value
        }

        if (field.value.kind === 'ListValue') {
            fields[field.name.value] = field.value.values
        }
    });
}

export const parseQuery = (query: DocumentNode) => {
    let filteredQuery: Query
    const filteredDefinitions: Definition[] = []
    const definitions: any[] = query.definitions
    if(definitions) {
        definitions.forEach(definition => {
            const selections = definition.selectionSet.selections as FieldNode[]
            filteredDefinitions.push({
                name: definition.name?.value,
                variableDefinitions: definition.variableDefinitions,
                selections: parseSelections(selections)
            })
        });
    }
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
            selection.arguments
            selects.push({
                arguments: getArgumentFields(selection.arguments),
                name: selection.name.value,
                selections: parseSelections(selection.selectionSet?.selections)
            })
        }
        else {
            selects.push({
                arguments: getArgumentFields(selection.arguments),
                name: selection.name.value,
                selections: []
            })
        }
    });
    return selects
}