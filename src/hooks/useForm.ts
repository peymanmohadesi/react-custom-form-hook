import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export function useForm(initialData: object = {}, onSubmit: (FormData: object) => void, onSubmitFailed: () => void) {

    const [data, setData] = useState(initialData); // State to store form data

    // onChange handler
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            let error = "";
            const input = e.target;

            // Validate form fields
            if (input.required && !input.value) {
                error = `${input.name} field is Required`
            } else if (input.type == "email" && !input.value.includes("@")) {
                error = `This field shoud be Email`
            } else if (input.min && input.value.length < parseInt(input.min)) {
                error = `The length of the field must be more than ${input.min} characters`
            } else if (input.max && input.value.length > parseInt(input.max)) {
                error = `The length of the field must be less than ${input.max} characters`
            }

            setData({ ...data, [input.name]: { value: input.value, type: input.type, required: input.required, error } })
        },
        [data],
    )

    // Submit handler
    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        let hasError = false;
        let isEmpty = true;

        for (let i in data) {
            if (data[i].error) {
                hasError = true;
            }
            if (data[i].value) {
                isEmpty = false;
            }
        }
        if (!hasError && !isEmpty)
            onSubmit?.(data);
        else
            onSubmitFailed()
    }

    return ([data, onChange, onSubmitHandler])
}