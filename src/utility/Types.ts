export { IRepository } from "../model/IRepository";
export { ApiClient } from "../utility/apiClient";

export type MediaType = {
  id: string
  title: string
  type: string
  authors: {
          name: string,
          pic: string,
          bio: string
  }[]
  publisher: {
          name: string,
          logo: string,
          description: string
  }
  status: string
  meta: any
  privacy: string
  topic: string
  isbn: string
  license: string
  //lccl: string
  //oclc: string
  //format: string
  //printType: string
  orderby: string
  content: string
  thumbnailsmall: string
  thumbnaillarge: string
  genre: string
  tags: []
  region: string
  duration: number

  description: string
  keywords: []
  inserted_at: any
}
export type Publisher = {
  name: string,
  desc: string,
  logo: string
}

export type AuthorType = {
  name: string
  pic: string
  bio: string
}

export type ConfigType = {
  header: any
  baseParam: any
}

export type CollectionType = {
  userId: string
  type: MediaRes
  id: string,
  mediaId: string,
  icon: string
}

export type FavAuthor = {
  userId: string,
  id: string,
  name: string,
  pic: string,
  bio: string,
  media: [],
  socialHandles: []
}

export type Section = "recommended" | "popular" | "latest" | "related" | "top"

export type MediaRes = "quotes" | "videos" | "books" | "music" | "quote" | "video" | "book" | "track" | "collections" | "images" | "posts"

export type EmailAddress = {
  address: string,
  name: string,
  contact_number: string,
  company: string,
  status: 'enabled' | 'disabled',
  attributes?: {},
  preconfirmedSub: boolean,
  lists: []
}

type Base64Attachment = {
  content: string, 
  mime_type: string, 
  name: string
}

type Base64InlineImage = {
  content: string, 
  mime_type: string, 
  cid: string
}

type InlineImage = { 
  file_cache_key: string, 
  cid: string
}

type Attachment = { 
  file_cache_key: string, 
  name: string
}

export type emailReq = "single" | "single_template" | "batch_template"

export type EmailType = {
  name: string,
  address?: string,
  userId?: string,
  subject: string,
  text: string,
  templateKey: string,
  html: string,
  data?: any,
  cc?: EmailAddress[],
  bcc?: EmailAddress[],
  attachments: Attachment[] | Base64Attachment[],
  inline_images: Base64InlineImage[] | InlineImage[]
  contentType?: any,
  headers: [],
  lists?: [],
  type?: string,
  tags?: string,
  messenger: string,
  body: string
}

export type FilterType = "eq" | "gt" | "gte" | "lt" | "lte" | "ne" | "in" | "nin" | "exists" | "all"
export type MethodType = "post" | "get" | "put" | "delete"

export type Filter = {
  check: FilterCheck[],
  range: FilterRange[],
  custom: FilterCustom[]
}

export type FilterCheck = {
  attribute: string,
  values: any[]
}

export type FilterRange = {
  attribute: string,
  lower: number,
  upper: number
}

export type FilterCustom = {
  attribute: string,
  values: any[]
}

export type Sort = { 
  attributes: string; 
  order: string; 
}

export function isType<T>(obj: any, classType: new (...args: any[]) => T): obj is T {
    return obj instanceof classType;
}

// Define a type guard function for View
export function isView(section: ViewSection): section is View {
    return (section as View).insert !== undefined;
}

// Define a type guard function for DataType
export function isDataType(section: ViewSection): section is DataType {
    return (section as DataType).meta !== undefined;
}

// Define a type guard function for QuestionType
export function isQuestionType(section: ViewSection): section is FormType {
    return (section as FormType).content !== undefined;
}

// Define a type guard function for QuestionType
export function isNavList(section: ViewSection): section is NavList {
    return (section as NavList).content !== undefined;
}

// Define a type guard function for VComponent
export function isVComponent(section: ViewSection): section is VComponent {
    return (section as VComponent).content !== undefined;
    //return 'content' in section;
}

// Define a type guard function for VComponent
export function isComponent(section: ViewSection): section is HTMLElement {
    return (section as HTMLElement) !== undefined;
}

// Define a type guard function for IView
export function isIView(section: any): section is IView {
    return (section as IView).sections !== undefined;
}

// Function to check if a value is a valid SecTionType
function isSectionType(value: string): value is SecTionType {
    return value === 'x-section' || value === 'y-section';
}

// Function to check if a value is a valid TabType
export function isTabType(value: string): value is TabType {
    return value === 'x-tab' || value === 'y-tab';
}

export function isActionString(value: any): value is ActionString {
    return value === 'submit' || value === 'filter'
}

export type Filters = {
    index: string,
    options?: [],
    rangeList: {
        title: string
    }[],
    checks: {
        attribute: string,
        values: {
            label: string,
            iChecked?: string,
            iUndetermined?: string,
            iUnchecked?: string,
        }[]
    }[]
}

export type WidgetName = 'Header' | 'SidebarLeft' | 'SidebarRight' | 'Footer' | 'Main'


export type NavLink = {
    icon?: string,
    path: string,
    name: string,
    params: any,
    query: any,
    children?: NavLink[],
    page?: ViewSection
}

export class NavList {
    constructor(navList: {
        id: string,
        content: NavLink[],
        navType: TabType
    }) {
        Object.assign(this, navList)
    }

    id!: string
    content!: NavLink[]
    navType!: TabType
}

export type LayoutType = 'Grid' | 'Relative'

export type ScrollType = 'Vertical' | 'Horizontal'

export class DataType {
    constructor(data: {
        id?: any,
        img?: string,
        icon?: string,
        overlay?: string,
        meta: {
            title: string,
            description?: string,
            created: string,
            author: string,
        },
        actions: Record<string, Action>,
        header?: {
            icon?: string,
            img?: string,
            label: string
        }[],
        setHeader: boolean
    }) {
        this.id = data.id;
        this.img = data.img;
        this.icon = data.icon;
        this.overlay = data.overlay;
        this.meta = data.meta;
        this.actions = data.actions;
        this.header = data.header;
        this.setHeader = data.setHeader;
    }
    id?: any;
    img?: string;
    icon?: string;
    overlay?: string;
    meta: {
        title: string;
        description?: string;
        created: string;
        author: string;
    };
    actions: Record<string, Action>;
    header?: {
        icon?: string;
        img?: string;
        label: string;
    }[];
    setHeader: boolean;

}

export type ActionString = 'Submit' | 'Filter' | 'Link' | 'Modal'

export class Action {
    constructor(action: Action) {
        Object.assign(this, action)
    }
    name?: string
    type?: string
    label!: string
    icon?: string
    args?: any
    event!: Function | string
    onResult!: Function
    onError!: Function
}

    
export class Video {
    constructor(video: Video) {
        Object.assign(this, video)
    }
    private title!: string;
    private duration!: number;
    private url!: string;
    private isPlaying!: boolean;
    private publishedDate!: Date;
    private description!: string;
    private thumbnailUrl!: string;

    play() {
        if (!this.isPlaying) {
            console.log(`Playing ${this.title}`);
            this.isPlaying = true;
        }
    }

    pause() {
        if (this.isPlaying) {
            console.log(`Pausing ${this.title}`);
            this.isPlaying = false;
        }
    }

    stop() {
        if (this.isPlaying) {
            console.log(`Stopping ${this.title}`);
            this.isPlaying = false;
        }
    }

    getInfo() {
        return {
            title: this.title,
            duration: this.duration,
            url: this.url,
            publishedDate: this.publishedDate,
            description: this.description,
            thumbnailUrl: this.thumbnailUrl
        };
    }
}

export class Notification {}

export class Blog {}

export class Music {}

export class Product {}

export class Book {}

export class Picture {}

export class Comment {}

export class Text {}

export class Calendar {}

export class Table {}

export class Form {}

export class QuestionType {
    constructor(data: {
        title: string,
        index: number,
        content?: {
            question: string,
            inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date',
            component?: HTMLElement,
            answer: string,
            options?: any[],
            action?: Action,
            name: string,
            image?: string,
            icon?: string
        }[],
        icon?: string,
        description?: string,
        actions: Record<string, Action>
        meta?: any
    }) {
        this.title = data.title;
        this.index = data.index;
        this.content = data.content;
        this.icon = data.icon;
        this.description = data.description;
        if (isActionString(data.actions)) {
            this.actions = {
                submit: new Action({
                label: data.actions,
                event: data.actions,
                onResult: () => {},
                onError: () => {},
                args: [this.content],
                icon: data.actions
            })}
        }
        else {
            this.actions = data.actions
        }
        this.meta = data.meta;
    }
    title: string;
    index: number;
    content?: {
        question: string;
        inputType?: 'number' | 'search' | 'textarea' | 'time' | 'text' | 'password' | 'email' | 'tel' | 'file' | 'url' | 'date';
        component?: HTMLElement;
        answer: string;
        options?: any[];
        action?: Action;
        name: string;
        image?: string;
        icon?: string
    }[];
    icon?: string;
    description?: string;
    actions: Record<string, Action>;
    meta?: any
}

export class FormType {
    constructor(name: string, submit: Action | ActionString, content: QuestionType[]) {
        this.name = name
        this.content = content
        if (isActionString(submit)) {
            this.actions = {
                submit: new Action({
                    label: submit,
                    event: submit,
                    args: [this.content],
                    icon: submit,
                    onResult: () => {},
                    onError: () => {}
                })
            }
        }
        else {
            this.actions = {submit}
        }
    }
    name: string
    actions: Record<string, Action>
    content: QuestionType[]
}

export type VComponent = {
    content: HTMLElement
    props?: any
}

export interface IView {
    heading?: string
    id: string
    layout: LayoutType
    sections: ViewSection[]
    icon?: string
    postion?: {y: number, x: number}
    viewport?: string
}

export type ViewSection = View | DataType |FormType | VComponent | HTMLElement | NavList

function insert(view: IView, ...content: ViewSection[]) {
    view.sections?.push(...content)
}

/*function get(view: IView, id: string) {
    let item = view.sections.find(item => { if(isType(item, View) || isType(item, PageView)) item.id === 2})
}*/

//Abstract class View
export class View implements IView {
    /*constructor() {
        if (this.constructor === View) {
            throw new Error("Can't instantiate abstract class!");
        }
    }*/
    constructor(view: View) {
        Object.assign(this, view);
    }
    heading?: string;
    sections: ViewSection[] = []
    icon?: string | undefined;
    postion?: { y: number; x: number; } | undefined;
    viewport?: string | undefined;
    id!: string
    layout!: LayoutType
    size!: string
    navType!: SecTionType | TabType

    insert? = (...content: ViewSection[]) => {
        insert(this, ...content)
    }
}

export class TabView extends View {
    constructor(view: View) {
        super(view)
    }

    sections: ViewSection[] = []
}

export class SectionView extends View {
    constructor(view: View) {
        super(view)
    }
    sections: ViewSection[] = []
}

export class PageView implements IView {
    constructor(view: IView) {
        Object.assign(this, view);
    }
    id!: string;
    layout!: LayoutType;
    size!: number;
    sections: ViewSection[] = [];
    
    /*insert(...content: ViewSection[]){
        content.forEach(element => {
            if(element instanceof View) {
                if(isSectionType(element.navType)) {
                    this.sections?.push(element)
                }
                if(isTabType(element.navType)) {
                    this.navMenus?.push(element)
                }
            }
        });
    }*/
    insert(...content: ViewSection[]) {
        insert(this, ...content)
    }
}
export type SecTionType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type TabType ='top' | 'bottom' | 'left' | 'right'

export type DataSection = {
navType: string;
    name: string,
    content: DataType[] | DataSection[],
}

export type Recommendation = 'popular' | 'latest' | 'recommended' | 'related'

export interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
}

export const Layout = {
    top: new View({
        id: 'top',
        layout: 'Grid',
        navType: 'top',
        sections: [],
        size: 'col-12'
    }),
    bottom: new View({
        id: 'bottom',
        layout: 'Grid',
        navType: 'bottom',
        sections: [],
        size: 'col-12'
    }),
    left: new View({
        id: 'left',
        layout: 'Grid',
        navType: 'left',
        sections: [],
        size: 'col-4'
    }),
    right: new View({
        id: 'right',
        layout: 'Grid',
        navType: 'right',
        sections: [],
        size: 'col-4'
    }),
    center: new View({
        id: 'center',
        layout: 'Grid',
        navType: 'center',
        sections: [],
        size: 'col-8'
    })
}

export type Argument = {
    name: string,
    value?: string,
    values?: [],
    fields?: []
}

export type Selection = {
    arguments?: Argument[],
    name: string,
    selections?: Selection[]
}

export type Definition = {
    name?: string
    variableDefinitions?: []
    selections?: Selection[]
}

export type Query = {
    kind: string
    definitions: Definition[]
}
