"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = exports.PageView = exports.SectionView = exports.TabView = exports.View = exports.DataType = exports.FormType = exports.QuestionType = exports.Form = exports.Table = exports.Calendar = exports.Text = exports.Comment = exports.Picture = exports.Book = exports.Product = exports.Music = exports.Blog = exports.Notification = exports.Video = exports.Action = exports.NavList = exports.isActionString = exports.isTabType = exports.isIView = exports.isComponent = exports.isVComponent = exports.isNavList = exports.isQuestionType = exports.isDataType = exports.isView = exports.isType = void 0;
function isType(obj, classType) {
    return obj instanceof classType;
}
exports.isType = isType;
// Define a type guard function for View
function isView(section) {
    return section.insert !== undefined;
}
exports.isView = isView;
// Define a type guard function for DataType
function isDataType(section) {
    return section.meta !== undefined;
}
exports.isDataType = isDataType;
// Define a type guard function for QuestionType
function isQuestionType(section) {
    return section.content !== undefined;
}
exports.isQuestionType = isQuestionType;
// Define a type guard function for QuestionType
function isNavList(section) {
    return section.content !== undefined;
}
exports.isNavList = isNavList;
// Define a type guard function for VComponent
function isVComponent(section) {
    return section.content !== undefined;
    //return 'content' in section;
}
exports.isVComponent = isVComponent;
// Define a type guard function for VComponent
function isComponent(section) {
    return section !== undefined;
}
exports.isComponent = isComponent;
// Define a type guard function for IView
function isIView(section) {
    return section.sections !== undefined;
}
exports.isIView = isIView;
// Function to check if a value is a valid SecTionType
function isSectionType(value) {
    return value === 'x-section' || value === 'y-section';
}
// Function to check if a value is a valid TabType
function isTabType(value) {
    return value === 'x-tab' || value === 'y-tab';
}
exports.isTabType = isTabType;
function isActionString(value) {
    return value === 'submit' || value === 'filter';
}
exports.isActionString = isActionString;
class NavList {
    constructor(navList) {
        Object.assign(this, navList);
    }
    id;
    content;
    navType;
}
exports.NavList = NavList;
class Action {
    constructor(action) {
        Object.assign(this, action);
    }
    name;
    type;
    label;
    icon;
    args;
    event;
    onResult;
    onError;
}
exports.Action = Action;
class Video {
    constructor(video) {
        Object.assign(this, video);
    }
    title;
    duration;
    url;
    isPlaying;
    publishedDate;
    description;
    thumbnailUrl;
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
exports.Video = Video;
class Notification {
}
exports.Notification = Notification;
class Blog {
}
exports.Blog = Blog;
class Music {
}
exports.Music = Music;
class Product {
}
exports.Product = Product;
class Book {
}
exports.Book = Book;
class Picture {
}
exports.Picture = Picture;
class Comment {
}
exports.Comment = Comment;
class Text {
}
exports.Text = Text;
class Calendar {
}
exports.Calendar = Calendar;
class Table {
}
exports.Table = Table;
class Form {
}
exports.Form = Form;
class QuestionType {
    constructor(data) {
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
                    onResult: () => { },
                    onError: () => { },
                    args: [this.content],
                    icon: data.actions
                })
            };
        }
        else {
            this.actions = data.actions;
        }
        this.meta = data.meta;
    }
    title;
    index;
    content;
    icon;
    description;
    actions;
    meta;
}
exports.QuestionType = QuestionType;
class FormType {
    constructor(name, submit, content) {
        this.name = name;
        this.content = content;
        if (isActionString(submit)) {
            this.actions = {
                submit: new Action({
                    label: submit,
                    event: submit,
                    args: [this.content],
                    icon: submit,
                    onResult: () => { },
                    onError: () => { }
                })
            };
        }
        else {
            this.actions = { submit };
        }
    }
    name;
    actions;
    content;
}
exports.FormType = FormType;
class DataType {
    constructor(data) {
        this.id = data.id;
        this.img = data.img;
        this.icon = data.icon;
        this.overlay = data.overlay;
        this.meta = data.meta;
        this.actions = data.actions;
        this.header = data.header;
        this.setHeader = data.setHeader;
    }
    id;
    img;
    icon;
    overlay;
    meta;
    actions;
    header;
    setHeader;
}
exports.DataType = DataType;
function insert(view, ...content) {
    view.sections?.push(...content);
}
/*function get(view: IView, id: string) {
    let item = view.sections.find(item => { if(isType(item, View) || isType(item, PageView)) item.id === 2})
}*/
//Abstract class View
class View {
    /*constructor() {
        if (this.constructor === View) {
            throw new Error("Can't instantiate abstract class!");
        }
    }*/
    constructor(view) {
        Object.assign(this, view);
    }
    heading;
    sections = [];
    icon;
    postion;
    viewport;
    id;
    layout;
    size;
    navType;
    insert = (...content) => {
        insert(this, ...content);
    };
}
exports.View = View;
class TabView extends View {
    constructor(view) {
        super(view);
    }
    sections = [];
}
exports.TabView = TabView;
class SectionView extends View {
    constructor(view) {
        super(view);
    }
    sections = [];
}
exports.SectionView = SectionView;
class PageView {
    constructor(view) {
        Object.assign(this, view);
    }
    id;
    layout;
    size;
    sections = [];
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
    insert(...content) {
        insert(this, ...content);
    }
}
exports.PageView = PageView;
exports.Layout = {
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
};
//# sourceMappingURL=Types.js.map