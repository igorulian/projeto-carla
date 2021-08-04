import { DisplayMirror } from "../socket/connection.js";

let isDisplaying = false



export async function Mirror(){
    isDisplaying = !isDisplaying
    DisplayMirror({play:isDisplaying})
}