import { inputsArray, buttonsArrayEdit } from "../../constants/arrayConstantInputButton";
import Form from "./classForms";

export default class EditMovieForm extends Form {
    constructor() {
        super({
            id: 'dialog__form',
            name: 'edit--movie-form',
            inputs: inputsArray,
            buttons: buttonsArrayEdit,
            attributes: { method: 'POST', action: '/submit' }
        });
    }
}
