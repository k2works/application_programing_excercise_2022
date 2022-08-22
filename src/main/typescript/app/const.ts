let BASE_API_URL = "http://localhost:8080/api";
if (process.env.NODE_ENV === 'production') {
    BASE_API_URL = "https://ape2022-take15.herokuapp.com/api";
}

export namespace authConst {
    export const API_URL = `${BASE_API_URL}/auth`
}
