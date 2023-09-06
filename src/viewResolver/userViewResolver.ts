import { Mailer } from "../api/Email/Mailer"
import { auth } from "../api/auth/SupabaseAuth"
import { View, FormType, Action, QuestionType } from "../utility/Types"

export const userSignUp =  new QuestionType({
    title: 'Sign Up',
    index: 1,
    content: [{
        question: 'name',
        inputType: 'text',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'email',
        inputType: 'email',
        answer: '',
        options: [],
        name: '',
        image: ''
    },{
        question: 'password',
        inputType: 'password',
        answer: '',
        options: [],
        name: '',
        image: ''
    }],
    actions: {
    submit: new Action({
        label: 'Sign Up',
        event: auth.signUp,
        onResult: () => {},
        onError: () => {}
    })},
    meta: {
        isNew: false
    }
})

export const userView: View = new View({
    id: 'userView',
    layout: 'Grid',
    navType: 'center',
    size: 'col-12',
    sections: [new FormType('userForm','Submit', [userSignUp])]
})

export const userSignUpResolver = () => {
    const mailer = new Mailer()
    const userSignUp = () => {
        userView
    }
}