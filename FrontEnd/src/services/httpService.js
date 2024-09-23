import axios from 'axios';
import Config from '../config'

const backEnd = Config.backEnd

const HttpService = {
    addNew: function (url) {
        return axios.post(`${backEnd}new?url=${url}`);
    },
    all : function () {
        return axios.get(`${backEnd}all`);
    },
    deleteSelected : function (arr) {
        return axios.put(`${backEnd}deleteSelected?srNosToDelete=${arr}`);
    },
}

export default HttpService;
