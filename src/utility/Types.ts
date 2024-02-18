export { IRepository } from "../model/IRepository";
export { ApiClient } from "../utility/apiClient";
import { Request } from "../api/Request";

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

export type ApiConfig = {
    baseUrl: string,
    baseConfig: Record<string, any>
    requests: Record<string, Request | Function>
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
  date: Date
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

export type Recommendation = 'popular' | 'latest' | 'recommended' | 'related'


export type Argument = {
    name: string,
    value?: string,
    values?: [],
    fields?: []
}

export type Selection = {
    arguments?: Record<string, any>,
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

export type QueryType = {
  name: string,
  data: any,
  /*filter: {
    op: OpType,
    args: any
  }[],*/
  filters?: QueryFilter[],
  modifiers?: QueryModifier[],
  columns?: any[]
}

export type OpType = 'eq' | 'lt' | 'gt' | 'lte' | 'gte' | 'like' | 'ilike' | 'is'

export type QueryFilter = {
  op: OpType;
  col: string;
  val: string | number;
};

export type modType = 'order' | 'limit' | 'range'

export type QueryModifier = {
  op: modType
  val?: string | number | (string | number)[];
}