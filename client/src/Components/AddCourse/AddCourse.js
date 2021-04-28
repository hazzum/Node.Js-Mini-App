import cls from './AddCourse.module.css';
import { withRouter } from "react-router-dom";
import { useForm, set } from "react-cool-form";
import Joi from "joi";
import axios from "axios"
import "../HomePage/styles.scss";

// Reusable validation function for Joi
const validateWithJoi = (schema) => (values) => {
    let errors = {};
    const { error: joiError } = schema.validate(values, { abortEarly: false });
    if (joiError)
        joiError.details.forEach(({ path, message }) =>
            set(errors, path[0], message)
        );
    return errors;
};
const JoiSchema = Joi.object({
    name: Joi.string().min(5).required(),
    code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
    description: Joi.string().max(200),
});

const Field = ({ label, id, error, ...rest }) => (
    <div className={cls.form}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...rest} />
        {error && <p>{error}</p>}
    </div>
);

function AddCourse(props) {

    const postDataHandler = (data) => {
        console.log(data)
        axios.post('http://localhost:5000/api/courses/', data).then((res)=>{
            alert("Course "+res.data.name+" has been added successfully")
        })
    }

    const { form, mon } = useForm({
        defaultValues: { name: "", code: "", description: " " },
        validate: validateWithJoi(JoiSchema),
        onSubmit: (values) => postDataHandler(values),
        onError: (errors) => alert("Error: ", errors)
    });

    const errors = mon("errors", { errorWithTouched: true });

    return (
        <div className={cls.devy}>
            <div className={cls.card}>
                <button className={cls.button} onClick={() => props.history.push("/web/")}>Go Back...</button>
                <div className={cls.title}>Course</div>
                <div className={cls.holder}>
                    <form ref={form} noValidate>
                        <Field
                            label="Course Name"
                            id="name"
                            name="name"
                            // Support built-in validation
                            required
                            error={errors.name}
                        />
                        <Field
                            label="Course Code"
                            id="code"
                            name="code"
                            required
                            error={errors.code?'Course code must be 3 letters followed by 3 numbers':null}
                        />
                        <Field
                            label="Description"
                            id="description"
                            name="description"
                            required={false}
                            error={errors.description}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default withRouter(AddCourse);