"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaProps = void 0;
class MediaProps {
    id = '';
    title = '';
    timestamp = 0;
    status = '';
    privacy = '';
    tags = [];
    url = '';
    description = '';
    genre = '';
    thumbnail = '';
    author = '';
    license = '';
    /**
     * mapProps takes two arguments:
     * response as in api response
     * media the media that possesses the properties
     * This function check if a property returned by api exists on the MediaProps object, and then use it to populate the media if it exists.
     * @param response
     * @param media
     */
    mapProps(response, media) {
        let obj;
        Object.keys(response).forEach(key => {
            if (this.hasOwnProperty(key) || media.hasOwnProperty(key)) {
                obj[key] = response[key];
            }
        });
        media = obj;
        //end of class MediaProps
    }
}
exports.MediaProps = MediaProps;
//# sourceMappingURL=MediaProps.js.map