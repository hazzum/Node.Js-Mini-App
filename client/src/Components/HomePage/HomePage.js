import cls from './HomePage.module.css';
import { withRouter} from "react-router-dom";

function HomePage(props) {
    return (
        <div className={cls.devy}>
            <div className={cls.card}>
                <div className={cls.title}>Welcome to E7 Experiment</div>
                <div className={cls.holder}>
                    <div className={cls.button} onClick={() => props.history.push("/web/students/create")}>Add Student</div>
                    <div className={cls.button} onClick={() => props.history.push("/web/courses/create")}>Add Course</div>
                </div>
            </div>
        </div>
    );
}
export default withRouter(HomePage);