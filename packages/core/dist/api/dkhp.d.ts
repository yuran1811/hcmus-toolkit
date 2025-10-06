import { default as FetchFactory } from './factory';
declare class DKHPModule extends FetchFactory {
    private readonly RESOURCE;
    private readonly HEADERS;
    private getResourceUrl;
    addSubject(program: 'apcs' | 'clc', subjectId: string | number): Promise<any>;
    removeSubject(program: 'apcs' | 'clc', subjectId: string | number): Promise<any>;
    getSubjectList(program: 'apcs' | 'clc', studentId: string | number): Promise<any>;
}
export default DKHPModule;
