import { cacheExchange, fetchExchange } from "@urql/vue";
export const config = {
    "title": "Edifeeds",
    "baseUrl": "/",
    "backEndApi": {
      baseUrl: "http://localhost:2000/api",
      baseConfig: {},
      requests: {
        schedule(params: Record<string, any>, data: Record<string, any>) {
          return {
            url: '/schedule',
            params: params,
            data: data
          }
        },
        callback(params: Record<string, any>, data: Record<string, any>) {
          return {
            url: '/call',
            params: params,
            data: data
          }
        }
      }
  },
    "logo": "../logo.png",
    "email": {
      "bounceAddress": "admin@bounce.edifeeds.com",
      "address": "support@edifeeds.com",
      "name": "Edifeeds"
    },

    "socials": [
        {
            "id": "Google",
            "icon": "mdi-google"
        },

        {
            "id": "Facebook",
            "icon": "mdi-facebook"
        },

        {
            "id": "Twitter",
            "icon": "mdi-twitter"
        }
    ],

    "contacts": [
        {
        "name":"facebook",
        "icon": "facebook",
        "color": "blue",
        "id": "/wonderayanfe"
        },
        {
        "name": "pinterest",
        "icon": "pinterest",
        "color": "red"
        },
        {
        "name": "twitter",
        "icon": "twitter",
        "color": "cornflowerblue",
        "id": "@wonderayanfe0"
        },
        {
        "name": "linkedIn",
        "icon": "fi-social-linkedin",
        "color": "blue"
        },
        {
        "name": "email",
        "icon": "fi-mail",
        "color":"#DCBDBC",
        "id": "contact@edifeeds.com"
        },
        {
        "name": "phone",
        "icon": "fi-telephone",
        "color":"blue",
        "id": "+2348071397909"
        }
    ],
    "menuItems": [
        {
            "name": "Contact",
            "path": "/contact",
            "component": "Contact",
            "title": "Contact"
        },
        {
            "name": "About",
            "path": "/about",
            "component": "About"
        },
        {
            "name": "Sign Up",
            "path": "signup",
            "component": "SignUp"
        },
        {
            "name":"Sign In",
            "path": "signin",
            "component": "SignIn"
        }
    ],
    "tosUrl": "/term-of-use",
    "privacyPolicyUrl": "/privacy-policy",
    "hero": {
        "title": "Edificient stories, music, great quotes, videos and books, it all starts with Edifeeds.",
        "subtitle": "",
        "buttonText": ""
    },
    "apiClient": "axios",
    "api": {
      "Zeptomail": {
        "baseUrl": "https://api.zeptomail.com/v1.1",
        "config": {
          "header": {
            "Authorization": "Zoho-enczapikey wSsVR612qBX1CvoomjepILs7nQxXBVqkFE0ojlfyuCD0H/HD9sc/kkLMUQSjHfJMRWNsEjUS8u4hnhoIhjRchtR7mwpVDiiF9mqRe1U4J3x17qnvhDzNX2xVmhSKL4MNxgVommRnG8En+g=="
          },
          "baseParams": {
          }
        }
      },
      "Pexels": {

        "baseUrl": "https://api.pexels.com/v1",
        "attribution": {
          "href": "https://www.pexels.com",
          "src": "https://images.pexels.com/lib/api/pexels.png"
        },
        "config": {
          "header": {
            "Authorization": "563492ad6f91700001000001da2c276cc81440fd966c2ec19ba234c2"
          }
        }
      },
      "Unsplash": {
        "baseUrl": "https://api.unsplash.com",
        "config": {
          "baseParams": {
            "client_id": "h2QN0xKvn2yEbGzLAzt__xrgVQI_AVu2Gwn3WdZn0gE"
          }
        }
      },
        "auth0": {
            "name": "Edifeeds",
            "clientId": "Sz3hqM05IKi5dEIYVoACKvIAXjd4azW5",
            "domain": "dev-x-wx5tsn.auth0.com",
            "clientSecret": "tRctqxf33O6MrHUwNj-DqFkTGfdlrZqKai3oF134_CiK1-Ya31EPS2L_Uc3x3sVy"
    },

        "GoogleBooks": {
          "baseUrl": "https://books.googleapis.com/books/v1",
          "config": {
            "baseParams": {
              "apikey": "AIzaSyAlbER-HPdipvFgKJc-PWWZYhBIBSPxBNQ"
            }
          }
        },

        "PaperQuotes": {
          "baseUrl": "https://api.paperquotes.com/apiv1",
            "id": "",
            "key": ""
        },

        "SoundCloud": {
          "baseUrl" : "api.soundcloud.com",
          "baseParams": {
            "id": "",
            "key": ""}
        },

        "TheySaidSo": {
          "baseUrl": "http://quotes.rest",
            "id": "",
            "key": ""
        },

        "ZenQuotes": {
            "baseUrl": "https://zenquotes.io/api",
              "id": "",
              "key": "",
              "baseParams": {
                "headers": {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
              }
          },

        "Youtube": {
          "baseUrl": "https://googleapis.com/youtube/v3",
          "config": {
            "baseParams": {
              "id": "",
              "key": ""}
          }
        },

        "InternetArchive": {
          "baseUrl": "archive.org/services/search/v1/scrape",

            "id": "",
            "key": ""
        },

        "Gorse": [{
          "name": "",
          "id": "http://127.0.0.1:8088",
          "key": ""
        }],

        "Regommend": {
          "baseUrl": "http://localhost:2000/api"
        },

        "Algolia": {
            "id": "JFUHLV2WO0",
            "key": "f97b7d76b80539c4d02d0e4316220e87"
        },
        "Typesense": {
          "config": {
            "baseParams": {
              "host": "rpqa2i8vyu4z57wdp-1.a1.typesense.net",
              "apikey": "YUKVclEUeLRXKk9xPEQZ06xTAhuNsUpe"}
          }
        },

        "Auth": {
            "url": "http://localhost:8080/auth",
            "realm": "edifeeds",
            "clientId": "edifeeds-app",
            "onLoad": "login-required"
        },
        "Supabase" : {
            "url": "https://apqaaxxhxzihzszhpelk.supabase.co",
            "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwcWFheHhoeHppaHpzemhwZWxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ1NzUyNjQsImV4cCI6MTk2MDE1MTI2NH0.tAPoGJ3nWeh5PQH51nWf4Ekdr9c5G-dhkljTmdAHVYg",
            "options": {
              "db": {
                "schema": "public"
              },
              "auth": {
                "autoRefreshToken": true,
                "persistSession": true,
                "detectSessionInUrl": true
              }
            }},
        "zenserp" : {
            "baseUrl" : "https://app.zenserp.com/api/v2",
            "config": {
              "baseParams": {
                "apikey" : "83d52500-bbe4-11ec-97af-3769629ae33a"
              }
            }
        },
        "PouchDB": {
          "url": ""
        },
        "Supertokens": {
          "appName": "Edifeeds",
          "apiDomain": "http://localhost:2000/api"
        },
        "ListMonk": {
          "baseUrl": "http://localhost:8000/api",
          "config": {
            "baseParams": {
              "apikey": "AIzaSyAlbER-HPdipvFgKJc-PWWZYhBIBSPxBNQ"
            }
          }
        },
        "ZincSearch": {
          "baseUrl": "http://localhost:4080/api",
          "config": {
            "auth": {
              "username": "admin",
              "password": "Complexpass#123"
            }
          }
        },
        "Deezer": {
          "baseUrl": "https://api.deezer.com",
          "config": {
            "app_id": "573262",
            "output": "json"
          }
        },
        "Meilisearch": {
          "host": "https://ms-3c59deb7e96a-1832.sfo.meilisearch.io",
          "apiKey": "d449e47884967a7a8267ec683fce149df78e3f8e"
        },

        Urql: {
          config: {
            url: "",
            exchanges: [cacheExchange, fetchExchange]
          }
        }
    },
    "genres": {},
    "signInProps": {
        "signInSucessUrl": "index.html"
    }

}
