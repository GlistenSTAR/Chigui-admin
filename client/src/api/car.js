import api from './index';

const getCars = (data) => {
    return new Promise((resolve, reject) => {
        api.post("/api/user/register", data)
            .then(res => resolve(res))
            .catch(err => reject(error));
    });
};

export { getCars };