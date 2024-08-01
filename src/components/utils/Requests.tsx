import axios from "axios";

const URL = "https://wordle-api-seven.vercel.app/api/wordle";

export default class Requests {
    static async checkWord(value: string) {
        return await axios.post(URL, {
            guess: value
        },);
    }
}