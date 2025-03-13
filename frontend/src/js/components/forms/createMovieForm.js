import {
	inputsArray,
	buttonsArray,
} from "../../constants/arrayConstantInputButton";
import Form from "./classForms";

export default class CreateMovieForm extends Form {
	constructor() {
		super({
			id: "dialog__form",
			name: "create--movie-form",
			inputs: inputsArray,
			buttons: buttonsArray,
			className: "dialog__form",
		});
	}
}
