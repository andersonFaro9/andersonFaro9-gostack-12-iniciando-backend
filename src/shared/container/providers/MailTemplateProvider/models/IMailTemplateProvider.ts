
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
    parse(template: IParseMailTemplateDTO): Promise<string>;
}
