const binaries = require('../app-bin/index.node');

export const binMapperStart: () => undefined = binaries.mapperStart;
export const binMapperStop: () => undefined = binaries.mapperStop;
export const binMapperLoadMapping: (mapping: string) => undefined = binaries.mapperLoadMapping;
export const binDetectInput: (callback: (input: string) => void) => undefined = binaries.detectInput;