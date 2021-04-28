import cls from './AddStudent.module.css';
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
    name: Joi.string().regex(/^[A-Za-z\-']+$/).required(),
    code: Joi.string().min(7).max(7).regex(/^[0-9]+$/).required(),
});

const Field = ({ label, id, error, ...rest }) => (
    <div className={cls.form}>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...rest} />
        {error && <p>{error}</p>}
    </div>
);

function AddStudent(props) {

    const postDataHandler = (data) => {
        console.log(data)
        axios.post('http://localhost:5000/api/students/', data).then((res)=>{
            alert("Student "+res.data.name+" has been added successfully")
        })
    }

    const { form, mon } = useForm({
        defaultValues: { name: "", code: ""},
        validate: validateWithJoi(JoiSchema),
        onSubmit: (values) => postDataHandler(values),
        onError: (errors) => alert("Error: ", errors)
    });

    const errors = mon("errors", { errorWithTouched: true });

    return (
        <div className={cls.devy}>
            <div className={cls.card}>
                <button className={cls.button} onClick={() => props.history.push("/web/")}>Go Back...</button>
                <div className={cls.title}>Student</div>
                <div className={cls.holder}>
                <form ref={form} noValidate>
                        <Field
                            label="Student Name"
                            id="name"
                            name="name"
                            required
                            error={errors.name?'Only letters, - and \' are allowed':null}
                        />
                        <Field
                            label="Student Code"
                            id="code"
                            name="code"
                            required
                            error={errors.code?'Must be a 7 digit number':null}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default withRouter(AddStudent);