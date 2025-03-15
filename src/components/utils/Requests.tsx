import axios from "axios";

const URL = "https://wordle-api-seven.vercel.app/api/wordle";

export class Requests {
    static async checkWord(value: string) {
        return await axios.post(URL, {
            guess: value
        },);
    }
}

export const isAndroid = () => {
    return /Android/i.test(navigator.userAgent);
};