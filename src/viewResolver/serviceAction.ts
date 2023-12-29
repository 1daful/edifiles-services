import { Action, DataType, FormType, QuestionType, View, ViewSection, isType } from "../utility/Types"

export const addAction = (data: DataType | QuestionType | FormType, key: string, action: Action) => {
    data.actions[key] = action
}

export const addCallback = (data: DataType | QuestionType | FormType, key: string, callback: string, func: Function) => {
    data.actions[key][callback] = func
}