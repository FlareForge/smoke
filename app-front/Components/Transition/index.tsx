import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import useSettings from "../Settings";

export default function useTransition() {

    const navigate = useNavigate();
    const { settings } = useSettings();

    const transition = (path) => {
        if(settings.enableAnimations && document.startViewTransition){
            document.startViewTransition(() => {
                flushSync(() => {
                    navigate(path);
                });
            });
        }else{
            navigate(path);
        }
    }

    return transition;
}

export function useContentTransition() {

    const { settings } = useSettings();

    const transition = (f) => {
        if(settings.enableAnimations && document.startViewTransition){
            document.startViewTransition(() => {
                flushSync(f);
            });
        }else{
            f();
        }
    }

    return transition;
}
