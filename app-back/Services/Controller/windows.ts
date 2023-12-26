import AbstractController from "./abstract";
import { binMapperStart, binMapperStop, binMapperLoadMapping, binDetectInput } from "../../binaries";

export default class WindowsController extends AbstractController {


    isMapping = false;

    async loadMapping(_mapping: any){
        binMapperLoadMapping(Object.keys(_mapping).filter((key) => key && _mapping[key]).map((key) => `${key} ${_mapping[key]}`).join("\n"));
    }

    async startMapping(){
        if(this.isMapping) await this.stopMapping();
        this.isMapping = true;
        binMapperStart();
    }

    async stopMapping(){
        binMapperStop();
        this.isMapping = false;
    }

    async clean() {
        this.stopMapping();
        super.clean();
    }

    async detectInput(callback) {
        return binDetectInput(callback);
    }
}