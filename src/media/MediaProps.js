export class MediaProps {
    constructor() {
        this.id = '';
        this.title = '';
        this.timestamp = 0;
        this.status = '';
        this.privacy = '';
        this.tags = [];
        this.url = '';
        this.description = '';
        this.genre = '';
        this.thumbnail = '';
        this.author = '';
        this.license = '';
    }
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
