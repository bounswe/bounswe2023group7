import React , {useEffect} from "react";
import CreateThreadForm from "../components/CreateThreadForm";

export default function CreateThreadPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <CreateThreadForm />
        </div>
    );

}