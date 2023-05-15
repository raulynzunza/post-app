import { useState } from "react"

export const useForm = ( initialForm = {} ) => {

    const [formState, setFormState] = useState( initialForm );    

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = target           
        setFormState({
            ...formState,
            [name]: value
        })
    }    

    return {
        ...formState,
        formState,
        onInputChange,             
    }

}