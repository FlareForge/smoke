import AbstractController from "./abstract";
import { binMapperStart, binMapperStop, binMapperLoadMapping } from "../../binaries";

export default class WindowsController extends AbstractController {

    async loadMapping(_mapping: any){
        binMapperLoadMapping(Object.keys(_mapping).map((key) => `${key} ${_mapping[key]}`).join("\n"));
    }

    async startMapping(){
        binMapperStart();
    }

    async stopMapping(){
        binMapperStop();
    }

    async clean() {
        super.clean();
        binMapperStop();
    }
}